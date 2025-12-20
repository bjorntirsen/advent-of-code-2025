type Point = [number, number]

function parseInput(input: string) {
  const parsed = input
    .split('\n')
    .map((line) => line.split(',').map(Number) as Point)

  return parsed
}

interface PointWithState {
  point: Point
  state: 'red' | 'green'
}

function addGreenTiles(
  currentTile: PointWithState,
  nextTile: PointWithState,
  pointsWithState: PointWithState[],
) {
  const currentX = currentTile.point[0]
  const currentY = currentTile.point[1]
  const nextX = nextTile.point[0]
  const nextY = nextTile.point[1]
  if (currentX === nextX) {
    // point on same x axis
    if (currentY > nextY) {
      for (let i = nextY + 1; i < currentY; i++) {
        pointsWithState.push({ point: [currentX, i], state: 'green' })
      }
    } else {
      for (let i = currentY + 1; i < nextY; i++) {
        pointsWithState.push({ point: [currentX, i], state: 'green' })
      }
    }
  } else {
    // point on same y axis
    if (currentX > nextX) {
      for (let i = nextX + 1; i < currentX; i++) {
        pointsWithState.push({ point: [i, currentY], state: 'green' })
      }
    } else {
      for (let i = currentX + 1; i < nextX; i++) {
        pointsWithState.push({ point: [i, currentY], state: 'green' })
      }
    }
  }
}

function connectRedTilesWithGreen(pointsWithState: PointWithState[]) {
  const initialLength = pointsWithState.length
  for (let i = 0; i < initialLength; i++) {
    const currentTile = pointsWithState[i]
    let nextTile: PointWithState
    if (i === initialLength - 1) {
      // console.log('this should be the last one ill log some stuff')
      // console.log('i: ', i)
      // console.log('pointsWithState[0]: ', pointsWithState[0])
      nextTile = pointsWithState[0]
    } else {
      nextTile = pointsWithState[i + 1]
    }
    addGreenTiles(currentTile, nextTile, pointsWithState)
  }
}

function buildGrid(width: number, height: number): string[][] {
  return Array.from({ length: height }, () => Array(width).fill('.'))
}

function floodOutside(grid: string[][]): boolean[][] {
  const h = grid.length
  const w = grid[0].length

  const outside = Array.from({ length: h }, () => Array(w).fill(false))

  const queue: [number, number][] = [[0, 0]]

  while (queue.length) {
    const [y, x] = queue.pop()!

    if (
      y < 0 ||
      x < 0 ||
      y >= h ||
      x >= w ||
      outside[y][x] ||
      grid[y][x] === '#'
    )
      continue

    outside[y][x] = true

    queue.push([y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1])
  }

  return outside
}

interface RectangleResult {
  from: Point
  to: Point
  area: number
}

function buildOutsidePrefixSum(outside: boolean[][]): number[][] {
  const height = outside.length
  const width = outside[0].length

  const sum = Array.from({ length: height }, () => Array(width).fill(0))

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const isOutside = outside[y][x] ? 1 : 0
      sum[y][x] =
        isOutside +
        (sum[y - 1]?.[x] ?? 0) +
        (sum[y]?.[x - 1] ?? 0) -
        (sum[y - 1]?.[x - 1] ?? 0)
    }
  }

  return sum
}

function buildWallPrefixSum(grid: string[][]): number[][] {
  const h = grid.length
  const w = grid[0].length
  const sum = Array.from({ length: h }, () => Array(w).fill(0))

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const isWall = grid[y][x] === '#' ? 1 : 0
      sum[y][x] =
        isWall +
        (sum[y - 1]?.[x] ?? 0) +
        (sum[y]?.[x - 1] ?? 0) -
        (sum[y - 1]?.[x - 1] ?? 0)
    }
  }
  return sum
}

function rectCount(
  sum: number[][],
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  return (
    sum[y2][x2] -
    (sum[y1 - 1]?.[x2] ?? 0) -
    (sum[y2]?.[x1 - 1] ?? 0) +
    (sum[y1 - 1]?.[x1 - 1] ?? 0)
  )
}

function rectangleIsInside(
  outsideSum: number[][],
  wallSum: number[][],
  a: Point,
  b: Point,
  xIndex: Map<number, number>,
  yIndex: Map<number, number>,
): boolean {
  const minX = Math.min(a[0], b[0])
  const maxX = Math.max(a[0], b[0])
  const minY = Math.min(a[1], b[1])
  const maxY = Math.max(a[1], b[1])

  const cx1 = xIndex.get(minX)!
  const cx2 = xIndex.get(maxX)!
  const cy1 = yIndex.get(minY)!
  const cy2 = yIndex.get(maxY)!

  // interior only
  const ix1 = cx1 + 1
  const ix2 = cx2 - 1
  const iy1 = cy1 + 1
  const iy2 = cy2 - 1

  if (ix1 > ix2 || iy1 > iy2) return false

  if (rectCount(outsideSum, ix1, iy1, ix2, iy2) !== 0) return false
  if (rectCount(wallSum, ix1, iy1, ix2, iy2) !== 0) return false

  return true
}

function findLargestValidRectangle(
  points: Point[],
  outsideSum: number[][],
  wallSum: number[][],
  xIndex: Map<number, number>,
  yIndex: Map<number, number>,
): RectangleResult | null {
  let best: RectangleResult | null = null
  let bestArea = 0

  const n = points.length

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const a = points[i]
      const b = points[j]

      const width = Math.abs(a[0] - b[0]) + 1
      const height = Math.abs(a[1] - b[1]) + 1
      const area = width * height

      if (area <= bestArea) continue

      if (rectangleIsInside(outsideSum, wallSum, a, b, xIndex, yIndex)) {
        bestArea = area
        best = { from: a, to: b, area }
      }
    }
  }

  return best
}

function compressCoordinatesDense(points: Point[]) {
  let minX = Infinity,
    maxX = -Infinity
  let minY = Infinity,
    maxY = -Infinity

  for (const [x, y] of points) {
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
  }

  // Pad by 1 so flood fill can start “outside”
  minX -= 1
  maxX += 1
  minY -= 1
  maxY += 1

  const xs: number[] = []
  const ys: number[] = []

  for (let x = minX; x <= maxX; x++) xs.push(x)
  for (let y = minY; y <= maxY; y++) ys.push(y)

  const xIndex = new Map<number, number>()
  const yIndex = new Map<number, number>()

  xs.forEach((x, i) => xIndex.set(x, i))
  ys.forEach((y, i) => yIndex.set(y, i))

  return { xs, ys, xIndex, yIndex }
}

function drawBoundaryFromCells(
  grid: string[][],
  boundaryCells: Set<string>,
  xIndex: Map<number, number>,
  yIndex: Map<number, number>,
) {
  for (const key of boundaryCells) {
    const [x, y] = key.split(',').map(Number)
    const cx = xIndex.get(x)
    const cy = yIndex.get(y)
    if (cx === undefined || cy === undefined) continue
    grid[cy][cx] = '#'
  }
}

export function getResultForPartTwo(input: string) {
  const points = parseInput(input)
  // const redBoundary: Point[] = [...points]

  const pointsWithState: PointWithState[] = points.map((point) => ({
    point,
    state: 'red',
  }))

  connectRedTilesWithGreen(pointsWithState)
  const boundaryCells = new Set<string>()
  for (const { point } of pointsWithState)
    boundaryCells.add(`${point[0]},${point[1]}`)

  const allBoundaryPoints = pointsWithState.map((p) => p.point)

  const { xs, ys, xIndex, yIndex } = compressCoordinatesDense(allBoundaryPoints)

  const gridWidth = xs.length
  const gridHeight = ys.length
  const grid = buildGrid(gridWidth, gridHeight)

  const boundary = new Set<string>()

  for (const { point } of pointsWithState) {
    boundary.add(`${point[0]},${point[1]}`)
  }

  drawBoundaryFromCells(grid, boundaryCells, xIndex, yIndex)

  const outside = floodOutside(grid)
  // DEBUG: check flood result
  // let outsideCount = 0
  // let wallCount = 0
  // const h = grid.length
  // const w = grid[0].length

  // for (let y = 0; y < h; y++) {
  //   for (let x = 0; x < w; x++) {
  //     if (outside[y][x]) outsideCount++
  //     if (grid[y][x] === '#') wallCount++
  //   }
  // }

  // console.log({
  //   gridSize: h * w,
  //   outsideCount,
  //   wallCount,
  // })
  const outsideSum = buildOutsidePrefixSum(outside)

  const wallSum = buildWallPrefixSum(grid)

  const rectangleResult = findLargestValidRectangle(
    points,
    outsideSum,
    wallSum,
    xIndex,
    yIndex,
  )

  if (!rectangleResult) throw new Error('Search failed!')
  const { from, to, area } = rectangleResult
  const resultText = `The largest rectangle you can make in this example using only red and green tiles has area ${area}. One way to do this is between ${from.join(',')} and ${to.join(',')}.`
  return resultText
}
