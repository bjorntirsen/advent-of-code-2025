type Point = [number, number]

function parseInput(input: string) {
  const parsed = input
    .split('\n')
    .map((line) => line.split(',').map(Number) as Point)

  return parsed
}

function areaBetweenPoints(a: Point, b: Point): number {
  const width = Math.abs(b[0] - a[0]) + 1
  const height = Math.abs(b[1] - a[1]) + 1
  return width * height
}

interface AreaEntry {
  from: Point
  to: Point
  area: number
}

function getAllUniqueAreas(points: Point[]): AreaEntry[] {
  const results: AreaEntry[] = []

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i]
      const b = points[j]

      results.push({
        from: a,
        to: b,
        area: areaBetweenPoints(a, b),
      })
    }
  }

  // Sort largest area first
  return results.sort((x, y) => y.area - x.area)
}

export function getResult(input: string) {
  const coordinates = parseInput(input)
  let resultText = 'Results for this input:\n'
  const areas = getAllUniqueAreas(coordinates)
  resultText += `\n\nThe largest rectangle you can make in this example has area ${areas[0].area}. One way to do this is between ${areas[0].from.join(',')} and ${areas[0].to.join(',')}.`
  return resultText
}

// ---- PART TWO ----
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
    let currentTile = pointsWithState[i]
    let nextTile: PointWithState
    if (i === initialLength - 1) {
      console.log('this should be the last one ill log some stuff')
      console.log('i: ', i)
      console.log('pointsWithState[0]: ', pointsWithState[0])
      nextTile = pointsWithState[0]
    } else {
      nextTile = pointsWithState[i + 1]
    }
    addGreenTiles(currentTile, nextTile, pointsWithState)
  }
}

function getSizeOfCanvas(coordinates: number[][]) {
  let width = 0
  let height = 0
  coordinates.forEach((location) => {
    if (location[0] > width) width = location[0]
    if (location[1] > height) height = location[1]
  })
  return { width, height }
}

// function drawGrid(coordiantes: PointWithState[], canvasSize: number[]) {
//   const paddingX = 2
//   const paddingY = 1
//   const height = canvasSize[1] + paddingY * 2
//   const width = canvasSize[0] + paddingX * 2
//   const grid = Array.from({ length: height }, () => Array(width).fill('.'))
//   coordiantes.forEach((location) => {
//     const { point, state } = location
//     const x = point[0]
//     const y = point[1]
//     grid[y][x] = state === 'red' ? '#' : 'X'
//   })
//   return grid.map((row) => row.join('')).join('\n')
// }

// function fillShape(canvasSize: number[], pointsWithState: PointWithState[]) {
//   console.log('canvasSize: ', canvasSize)
//   pointsWithState.forEach(({ point, state }) => {
//     console.log('point: ', point)
//   })
//   for (let x = 0; x <= canvasSize[0]; x++) {
//     let inside = false
//     for (let y = 0; y <= canvasSize[1]; y++) {
//       const pointState = pointsWithState.find(
//         (p) => p.point[0] === x && p.point[1] === y,
//       )?.state
//       if (pointState === 'red') {
//         inside = !inside
//       } else if (inside) {
//         // If we're inside the shape, fill with green
//         if (!pointState) {
//           pointsWithState.push({ point: [x, y], state: 'green' })
//         }
//       }
//     }
//   }
// }

// interface RectangleResult {
//   from: Point
//   to: Point
//   area: number
// }

// function rectangleArea(a: Point, b: Point): number {
//   const width  = Math.abs(a[0] - b[0]) + 1
//   const height = Math.abs(a[1] - b[1]) + 1
//   return width * height
// } areaBetweenPoints

function buildGrid(width: number, height: number): string[][] {
  return Array.from({ length: height + 1 }, () => Array(width + 1).fill('.'))
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

function buildInsideGrid(grid: string[][], outside: boolean[][]): boolean[][] {
  const height = grid.length
  const width = grid[0].length

  const inside = Array.from({ length: height }, () => Array(width).fill(false))

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      inside[y][x] = !outside[y][x] && grid[y][x] !== '#'
    }
  }

  return inside
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

function rectangleIsInside(
  outsideSum: number[][],
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

  const outsideCount =
    outsideSum[cy2][cx2] -
    (outsideSum[cy1 - 1]?.[cx2] ?? 0) -
    (outsideSum[cy2]?.[cx1 - 1] ?? 0) +
    (outsideSum[cy1 - 1]?.[cx1 - 1] ?? 0)

  return outsideCount === 0
}

function findLargestValidRectangle(
  points: Point[],
  outsideSum: number[][],
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

      if (rectangleIsInside(outsideSum, a, b, xIndex, yIndex)) {
        bestArea = area
        best = { from: a, to: b, area }
      }
    }
  }

  return best
}

function compressCoordinates(points: Point[]) {
  const xsSet = new Set<number>()
  const ysSet = new Set<number>()

  for (const [x, y] of points) {
    xsSet.add(x)
    xsSet.add(x - 1)
    xsSet.add(x + 1)

    ysSet.add(y)
    ysSet.add(y - 1)
    ysSet.add(y + 1)
  }

  const xs = Array.from(xsSet).sort((a, b) => a - b)
  const ys = Array.from(ysSet).sort((a, b) => a - b)

  const xIndex = new Map<number, number>()
  const yIndex = new Map<number, number>()

  xs.forEach((x, i) => xIndex.set(x, i))
  ys.forEach((y, i) => yIndex.set(y, i))

  return { xs, ys, xIndex, yIndex }
}

function drawBoundary(
  grid: string[][],
  boundary: Point[],
  xIndex: Map<number, number>,
  yIndex: Map<number, number>,
) {
  const n = boundary.length

  for (let i = 0; i < n; i++) {
    const [x1, y1] = boundary[i]
    const [x2, y2] = boundary[(i + 1) % n]

    const cx1 = xIndex.get(x1)!
    const cy1 = yIndex.get(y1)!
    const cx2 = xIndex.get(x2)!
    const cy2 = yIndex.get(y2)!

    const dx = Math.sign(cx2 - cx1)
    const dy = Math.sign(cy2 - cy1)

    let x = cx1
    let y = cy1

    grid[y + 1][x + 1] = '#'

    while (x !== cx2 || y !== cy2) {
      x += dx
      y += dy
      grid[y + 1][x + 1] = '#'
    }
  }
}

export function getResultForPartTwo(input: string) {
  const points = parseInput(input)
  const pointsWithState: PointWithState[] = points.map((point) => ({
    point,
    state: 'red',
  }))
  connectRedTilesWithGreen(pointsWithState)
  const boundaryPoints = pointsWithState.map((p) => p.point)
  // const { width, height } = getSizeOfCanvas(points)
  const { xs, ys, xIndex, yIndex } = compressCoordinates(boundaryPoints)

  const gridWidth = xs.length
  const gridHeight = ys.length
  const grid = buildGrid(gridWidth + 1, gridHeight + 1)

  const boundary = new Set<string>()

  for (const { point } of pointsWithState) {
    boundary.add(`${point[0]},${point[1]}`)
  }

  drawBoundary(grid, boundaryPoints, xIndex, yIndex)

  const outside = floodOutside(grid)
  // const inside = buildInsideGrid(grid, outside)
  const outsideSum = buildOutsidePrefixSum(outside)
  const rectangleResult = findLargestValidRectangle(
    points,
    outsideSum,
    xIndex,
    yIndex,
  )

  if (!rectangleResult) throw new Error('Search failed!')
  const { from, to, area } = rectangleResult
  let resultText = `The largest rectangle you can make in this example using only red and green tiles has area ${area}. One way to do this is between ${from.join(',')} and ${to.join(',')}.`
  return resultText
}
