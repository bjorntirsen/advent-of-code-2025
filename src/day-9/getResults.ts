type Vector2 = [number, number]

function parseInput(input: string) {
  const parsed = input
    .split('\n')
    .map((line) => line.split(',').map(Number) as Vector2)

  return parsed
}

function areaBetweenPoints(a: Vector2, b: Vector2): number {
  const width = Math.abs(b[0] - a[0]) + 1
  const height = Math.abs(b[1] - a[1]) + 1
  return width * height
}

interface AreaEntry {
  from: Vector2
  to: Vector2
  area: number
}

function getAllUniqueAreas(points: Vector2[]): AreaEntry[] {
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

// function getSizeOfCanvas(coordinates: number[][]) {
//   let maxX = 0
//   let maxY = 0
//   coordinates.forEach((location) => {
//     if (location[0] > maxX) maxX = location[0]
//     if (location[1] > maxY) maxY = location[1]
//   })
//   return [maxX, maxY]
// }

// function drawGrid(coordiantes: number[][], canvasSize: number[]) {
//   const paddingX = 2
//   const paddingY = 1
//   const height = canvasSize[1] + paddingY * 2
//   const width = canvasSize[0] + paddingX * 2
//   const grid = Array.from({ length: height }, () => Array(width).fill('.'))
//   coordiantes.forEach((location) => {
//     const x = location[0]
//     const y = location[1]
//     grid[y][x] = '#'
//   })
//   return grid.map((row) => row.join('')).join('\n')
// }

export function getResult(input: string) {
  const coordinates = parseInput(input)
  // console.log('coordinates: ', coordinates)
  // const canvasSize = getSizeOfCanvas(coordinates)
  // console.log('canvasSize: ', canvasSize)
  let resultText = 'Results for this input:\n'
  // resultText += drawGrid(coordinates, canvasSize)
  const areas = getAllUniqueAreas(coordinates)
  // console.log('areas: ', JSON.stringify(areas, null, 2))
  resultText += `\n\nThe largest rectangle you can make in this example has area ${areas[0].area}. One way to do this is between ${areas[0].from.join(',')} and ${areas[0].to.join(',')}.`
  return resultText
}
