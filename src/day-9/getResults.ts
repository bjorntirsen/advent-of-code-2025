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
  let maxX = 0
  let maxY = 0
  coordinates.forEach((location) => {
    if (location[0] > maxX) maxX = location[0]
    if (location[1] > maxY) maxY = location[1]
  })
  return [maxX, maxY]
}

function drawGrid(coordiantes: PointWithState[], canvasSize: number[]) {
  const paddingX = 2
  const paddingY = 1
  const height = canvasSize[1] + paddingY * 2
  const width = canvasSize[0] + paddingX * 2
  const grid = Array.from({ length: height }, () => Array(width).fill('.'))
  coordiantes.forEach((location) => {
    const { point, state } = location
    const x = point[0]
    const y = point[1]
    grid[y][x] = state === 'red' ? '#' : 'X'
  })
  return grid.map((row) => row.join('')).join('\n')
}

function fillShape(canvasSize: number[], pointsWithState: PointWithState[]) {
  console.log('canvasSize: ', canvasSize)
  pointsWithState.forEach(({ point, state }) => {
    console.log('point: ', point)
  })
  for (let x = 0; x <= canvasSize[0]; x++) {
    let inside = false
    for (let y = 0; y <= canvasSize[1]; y++) {
      const pointState = pointsWithState.find(
        (p) => p.point[0] === x && p.point[1] === y,
      )?.state
      if (pointState === 'red') {
        inside = !inside
      } else if (inside) {
        // If we're inside the shape, fill with green
        if (!pointState) {
          pointsWithState.push({ point: [x, y], state: 'green' })
        }
      }
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
  const canvasSize = getSizeOfCanvas(points)
  fillShape(canvasSize, pointsWithState)
  let resultText = 'Results for this input:\n'
  // resultText = drawGrid(pointsWithState, canvasSize)
  return resultText
}
