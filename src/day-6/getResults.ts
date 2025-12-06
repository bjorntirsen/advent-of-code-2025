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
  const rangesMatching: number[][] = []
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

type Range = [number, number]

function mergeRanges(ranges: Range[]): Range[] {
  if (ranges.length === 0) return []

  // Sort ranges by their start value
  const sortedRanges = [...ranges].sort((a, b) => a[0] - b[0])

  const resultingRanges: Range[] = []
  let currentRange = sortedRanges[0]

  for (let i = 1; i < sortedRanges.length; i++) {
    const nextRange = sortedRanges[i]

    const currentStart = currentRange[0]
    const currentEnd = currentRange[1]
    const nextStart = nextRange[0]
    const nextEnd = nextRange[1]

    if (nextStart <= currentEnd + 1) {
      // Ranges overlap or are contiguous, merge them
      currentRange = [currentStart, Math.max(currentEnd, nextEnd)]
    } else {
      // No overlap, push the current range and move to the next
      resultingRanges.push(currentRange)
      currentRange = nextRange
    }
  }

  // Push the last range
  resultingRanges.push(currentRange)

  return resultingRanges
}

function parseMergedRangesIntoAStringThatListsAllNumbersSeparatedByCommasAndCountThem(
  mergedRanges: Range[],
) {
  // Calculate count directly from ranges
  let count = 0
  mergedRanges.forEach((range) => {
    const [start, end] = range
    count += end - start + 1
  })

  // Generate string representation of ranges instead of all individual numbers
  const stringifiedNumbers = mergedRanges
    .map((range) => `${range[0]}-${range[1]}`)
    .join(', ')

  return { stringifiedNumbers, count }
}

export function getResult(input: string, isPartTwo = false) {
  const { ranges, positions } = parseInput(input)

  let typedOutResult = `Result:\n\n`
  let freshCount = 0

  if (!isPartTwo) {
    positions.forEach((position) => {
      const { inRange, rangesMatching } = isPositionInWhatRanges(
        position,
        ranges,
      )
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
  } else {
    typedOutResult +=
      'The ingredient IDs that these ranges consider to be fresh are '
    const sortedAndMergedRanges = mergeRanges(ranges as Range[])
    const { stringifiedNumbers, count } =
      parseMergedRangesIntoAStringThatListsAllNumbersSeparatedByCommasAndCountThem(
        sortedAndMergedRanges,
      )
    typedOutResult += stringifiedNumbers
    freshCount = count
  }

  typedOutResult += isPartTwo
    ? ` So, the fresh ingredient ID ranges consider a total of ${freshCount} ingredient IDs to be fresh.`
    : `\nSo ${freshCount} of the available ingredient IDs are fresh.`

  return typedOutResult
}
