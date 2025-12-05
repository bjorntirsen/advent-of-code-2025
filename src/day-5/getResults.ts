function parseInput(input: string) {
  const [rangesPart, positionsPart] = input.split('\n\n')
  const ranges = rangesPart
    .split('\n')
    .map((line) => line.split('-').map((num) => parseInt(num, 10)))
  const positions = positionsPart.split('\n').map((line) => parseInt(line, 10))
  return { ranges, positions }
}

function isPositionInWhatRanges(
  position: number,
  ranges: number[][],
): { inRange: boolean; rangesMatching: number[][] } {
  let rangesMatching: number[][] = []
  let inRange = false

  ranges.forEach((range) => {
    const [start, end] = range
    if (position >= start && position <= end) {
      rangesMatching.push(range)
      inRange = true
    }
  })

  return { inRange, rangesMatching }
}

export function getResult(input: string, isPartTwo = false) {
  console.log('isPartTwo: ', isPartTwo)

  const { ranges, positions } = parseInput(input)

  let typedOutResult = `Result:\n\n`
  let freshCount = 0

  positions.forEach((position) => {
    const { inRange, rangesMatching } = isPositionInWhatRanges(position, ranges)
    if (inRange) {
      const rangeDescriptions =
        rangesMatching.length > 1
          ? `ranges ${rangesMatching.map((range) => `${range[0]}-${range[1]}`).join(', ')}`
          : `range ${rangesMatching[0][0]}-${rangesMatching[0][1]}`
      typedOutResult += `Ingredient ID ${position} is fresh because it falls into ${rangeDescriptions}.\n`
      freshCount++
    } else {
      typedOutResult += `Ingredient ID ${position} is spoiled.\n`
    }
  })

  typedOutResult += `\nSo, in this example, ${freshCount} of the available ingredient IDs are fresh.`

  return typedOutResult
}
