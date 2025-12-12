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
