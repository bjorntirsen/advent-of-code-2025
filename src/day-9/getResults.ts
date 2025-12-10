function parseInput(input: string) {
  const parsed = input.split('\n').map((line) => line.split(',').map(Number))

  return parsed
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

function drawGrid(coordiantes: number[][], canvasSize: number[]) {
  const paddingX = 2
  const paddingY = 1
  const height = canvasSize[1] + paddingY * 2
  const width = canvasSize[0] + paddingX * 2
  const grid = Array.from({ length: height }, () => Array(width).fill('.'))
  coordiantes.forEach((location, index) => {
    const x = location[0]
    const y = location[1]
    grid[y][x] = '#'
  })
  return grid.map((row) => row.join('')).join('\n')
}

export function getResult(input: string) {
  const coordinates = parseInput(input)
  console.log('coordinates: ', coordinates)
  const canvasSize = getSizeOfCanvas(coordinates)
  console.log('canvasSize: ', canvasSize)
  return drawGrid(coordinates, canvasSize)
}
