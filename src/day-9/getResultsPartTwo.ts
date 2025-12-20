type Point = [number, number]

interface Rectangle {
  topLeft: Point
  bottomRight: Point
  area: number
}

interface CompressedGrid {
  xCoordinates: number[]
  yCoordinates: number[]
  xIndexMap: Map<number, number>
  yIndexMap: Map<number, number>
}

// Using Uint8Array to save memory. 8x smaller than number[]
interface Grid {
  data: Uint8Array
  width: number
  height: number
}

/**
 * Parse input string into array of coordinate points.
 * Expected format: "x,y\nx,y\nx,y"
 */
function parseInput(input: string): Point[] {
  return input.split('\n').map((line) => line.split(',').map(Number) as Point)
}

/**
 * Compress coordinates to reduce grid size.
 * For each point, we also include adjacent coordinates (±1)
 * to ensure we can properly detect edges and boundaries.
 */
function compressCoordinates(points: Point[]): CompressedGrid {
  const xSet = new Set<number>()
  const ySet = new Set<number>()

  // Collect all x and y coordinates, plus their neighbors
  for (const [x, y] of points) {
    xSet.add(x - 1)
    xSet.add(x)
    xSet.add(x + 1)

    ySet.add(y - 1)
    ySet.add(y)
    ySet.add(y + 1)
  }

  // Sort coordinates for consistent indexing
  const xCoordinates = Array.from(xSet).sort((a, b) => a - b)
  const yCoordinates = Array.from(ySet).sort((a, b) => a - b)

  // Create maps from actual coordinate to grid index
  const xIndexMap = new Map<number, number>()
  const yIndexMap = new Map<number, number>()

  xCoordinates.forEach((x, index) => xIndexMap.set(x, index))
  yCoordinates.forEach((y, index) => yIndexMap.set(y, index))

  return { xCoordinates, yCoordinates, xIndexMap, yIndexMap }
}

/**
 * Create an empty grid with given dimensions.
 * Values: 0 = empty, 1 = occupied (wall)
 */
function createEmptyGrid(width: number, height: number): Grid {
  return {
    data: new Uint8Array(width * height),
    width,
    height,
  }
}

/**
 * Convert 2D coordinates to 1D array index.
 */
function getIndex(x: number, y: number, width: number): number {
  return y * width + x
}

/**
 * Draw the polygon boundary on the grid by connecting consecutive vertices.
 */
function drawPolygonBoundary(
  grid: Grid,
  vertices: Point[],
  compressed: CompressedGrid,
): void {
  const { xIndexMap, yIndexMap } = compressed
  const { data, width } = grid

  for (let i = 0; i < vertices.length; i++) {
    const [x1, y1] = vertices[i]
    const [x2, y2] = vertices[(i + 1) % vertices.length] // Wrap to first vertex

    // Convert to compressed grid coordinates
    const compressedX1 = xIndexMap.get(x1)!
    const compressedY1 = yIndexMap.get(y1)!
    const compressedX2 = xIndexMap.get(x2)!
    const compressedY2 = yIndexMap.get(y2)!

    // Draw line from point 1 to point 2
    const deltaX = Math.sign(compressedX2 - compressedX1)
    const deltaY = Math.sign(compressedY2 - compressedY1)

    let currentX = compressedX1
    let currentY = compressedY1

    // Mark starting point
    data[getIndex(currentX, currentY, width)] = 1

    // Draw line step by step
    while (currentX !== compressedX2 || currentY !== compressedY2) {
      currentX += deltaX
      currentY += deltaY
      data[getIndex(currentX, currentY, width)] = 1
    }
  }
}

/**
 * Flood fill algorithm to mark all cells outside the polygon.
 * Starts from top-left corner (0,0) and spreads to all reachable cells.
 */
function markOutsideCells(wallGrid: Grid): Grid {
  const { width, height, data: wallData } = wallGrid
  const outsideGrid = createEmptyGrid(width, height)
  const stack: number[] = [0] // Start at index 0 (top-left corner)

  while (stack.length > 0) {
    const currentIndex = stack.pop()!

    // Skip if already marked or is a wall
    if (outsideGrid.data[currentIndex] === 1) continue
    if (wallData[currentIndex] === 1) continue

    // Mark as outside
    outsideGrid.data[currentIndex] = 1

    // Calculate 2D coordinates
    const x = currentIndex % width
    const y = Math.floor(currentIndex / width)

    // Add neighbors to stack (up, down, left, right)
    if (y > 0) stack.push(currentIndex - width) // Up
    if (y < height - 1) stack.push(currentIndex + width) // Down
    if (x > 0) stack.push(currentIndex - 1) // Left
    if (x < width - 1) stack.push(currentIndex + 1) // Right
  }

  return outsideGrid
}

/**
 * Build a 2D prefix sum array for fast rectangle queries.
 * This allows O(1) counting of marked cells in any rectangle.
 */
function buildPrefixSumTable(grid: Grid): Uint32Array {
  const { data, width, height } = grid
  const prefixSum = new Uint32Array(width * height)

  for (let y = 0; y < height; y++) {
    let rowSum = 0

    for (let x = 0; x < width; x++) {
      rowSum += data[getIndex(x, y, width)]
      const valueAbove = y > 0 ? prefixSum[getIndex(x, y - 1, width)] : 0
      prefixSum[getIndex(x, y, width)] = rowSum + valueAbove
    }
  }

  return prefixSum
}

/**
 * Count marked cells in a rectangle using prefix sum table.
 * Uses inclusion-exclusion principle: A - B - C + D
 */
function countCellsInRectangle(
  prefixSum: Uint32Array,
  width: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  const bottomRight = prefixSum[getIndex(x2, y2, width)]
  const topRight = y1 > 0 ? prefixSum[getIndex(x2, y1 - 1, width)] : 0
  const bottomLeft = x1 > 0 ? prefixSum[getIndex(x1 - 1, y2, width)] : 0
  const topLeft =
    x1 > 0 && y1 > 0 ? prefixSum[getIndex(x1 - 1, y1 - 1, width)] : 0

  return bottomRight - topRight - bottomLeft + topLeft
}

/**
 * Check if a rectangle fits inside the polygon (no walls or outside cells).
 * We check the interior only (excluding the rectangle's own edges).
 */
function isRectangleValid(
  outsidePrefixSum: Uint32Array,
  wallPrefixSum: Uint32Array,
  gridWidth: number,
  corner1: Point,
  corner2: Point,
  compressed: CompressedGrid,
): boolean {
  const { xIndexMap, yIndexMap } = compressed

  // Get rectangle bounds in original coordinates
  const minX = Math.min(corner1[0], corner2[0])
  const maxX = Math.max(corner1[0], corner2[0])
  const minY = Math.min(corner1[1], corner2[1])
  const maxY = Math.max(corner1[1], corner2[1])

  // Convert to compressed grid coordinates
  const compressedMinX = xIndexMap.get(minX)!
  const compressedMaxX = xIndexMap.get(maxX)!
  const compressedMinY = yIndexMap.get(minY)!
  const compressedMaxY = yIndexMap.get(maxY)!

  // Get interior bounds (excluding edges)
  const interiorMinX = compressedMinX + 1
  const interiorMaxX = compressedMaxX - 1
  const interiorMinY = compressedMinY + 1
  const interiorMaxY = compressedMaxY - 1

  // If no interior exists, rectangle is invalid
  if (interiorMinX > interiorMaxX || interiorMinY > interiorMaxY) {
    return false
  }

  // Check if interior contains any outside cells or walls
  const outsideCount = countCellsInRectangle(
    outsidePrefixSum,
    gridWidth,
    interiorMinX,
    interiorMinY,
    interiorMaxX,
    interiorMaxY,
  )

  const wallCount = countCellsInRectangle(
    wallPrefixSum,
    gridWidth,
    interiorMinX,
    interiorMinY,
    interiorMaxX,
    interiorMaxY,
  )

  // Valid if no outside cells or walls in interior
  return outsideCount === 0 && wallCount === 0
}

/**
 * Find the largest rectangle that fits inside the polygon.
 * Tests all pairs of vertices as potential opposite corners.
 */
function findLargestRectangle(
  vertices: Point[],
  outsidePrefixSum: Uint32Array,
  wallPrefixSum: Uint32Array,
  gridWidth: number,
  compressed: CompressedGrid,
): Rectangle | null {
  let bestRectangle: Rectangle | null = null
  let bestArea = 0

  // Try all pairs of vertices as opposite corners
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      const corner1 = vertices[i]
      const corner2 = vertices[j]

      // Calculate rectangle dimensions and area
      const width = Math.abs(corner1[0] - corner2[0]) + 1
      const height = Math.abs(corner1[1] - corner2[1]) + 1
      const area = width * height

      // Skip if smaller than current best
      if (area <= bestArea) continue

      // Check if this rectangle is valid (fits inside polygon)
      if (
        isRectangleValid(
          outsidePrefixSum,
          wallPrefixSum,
          gridWidth,
          corner1,
          corner2,
          compressed,
        )
      ) {
        bestArea = area
        bestRectangle = {
          topLeft: corner1,
          bottomRight: corner2,
          area,
        }
      }
    }
  }

  return bestRectangle
}

// MAIN FUNCTION
// Find the largest rectangle that fits inside a polygon.
export function getResultForPartTwo(input: string): string {
  // Parse the input vertices
  const vertices = parseInput(input)

  // Compress coordinates to reduce grid size
  const compressed = compressCoordinates(vertices)

  const gridWidth = compressed.xCoordinates.length
  const gridHeight = compressed.yCoordinates.length

  // Create grid and draw polygon boundary
  const wallGrid = createEmptyGrid(gridWidth, gridHeight)
  drawPolygonBoundary(wallGrid, vertices, compressed)

  // Mark all cells outside the polygon
  const outsideGrid = markOutsideCells(wallGrid)

  // Build prefix sum tables for fast queries
  const outsidePrefixSum = buildPrefixSumTable(outsideGrid)
  const wallPrefixSum = buildPrefixSumTable(wallGrid)

  // Find the largest valid rectangle
  const result = findLargestRectangle(
    vertices,
    outsidePrefixSum,
    wallPrefixSum,
    gridWidth,
    compressed,
  )

  if (!result) {
    throw new Error('No valid rectangle found!')
  }

  return `The largest rectangle you can make in this example using only red and green tiles has area ${result.area}. One way to do this is between ${result.topLeft.join(',')} and ${result.bottomRight.join(',')}.`
}
