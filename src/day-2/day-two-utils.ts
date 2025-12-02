export function numberToDigitsArray(num: number): number[] {
  return num
    .toString()
    .split('')
    .map((digit) => parseInt(digit, 10))
}

export function possibleRepeatChunkSizes(num: number): number[] {
  const s = num.toString()
  const len = s.length

  const result: number[] = []

  // chunk sizes must divide the length
  for (let size = 2; size <= Math.floor(len / 2); size++) {
    if (len % size !== 0) continue
    result.push(size)
  }

  return result
}

function repeatsForChunkSize(num: number, size: number): boolean {
  const s = num.toString()
  const first = s.slice(0, size)

  for (let i = size; i < s.length; i += size) {
    if (s.slice(i, i + size) !== first) {
      return false
    }
  }

  return true
}

export function getResult(input: string, isPartTwo = false) {
  function parseInput(input: string) {
    const inputArray = input.split(',')
    return inputArray.map((entry) => {
      const [startString, endString] = entry.split('-')
      const start = Number(startString)
      const end = Number(endString)
      return { start, end }
    })
  }

  const parsedInputs = parseInput(input)

  let result = `Results:\n`

  function buildFindingsString(invalidIDs: number[]) {
    const listingOfInvalidIDs = invalidIDs.join(' and ')
    if (invalidIDs.length === 0) {
      return 'contains no invalid IDs.'
    } else if (invalidIDs.length === 1) {
      return `has one invalid ID, ${listingOfInvalidIDs}.`
    } else {
      return `has ${invalidIDs.length} invalid IDs, ${listingOfInvalidIDs}.`
    }
  }

  function isInvalidIDPartTwo(id: number) {
    const idArray = numberToDigitsArray(id)
    // If all digits are the same, it's invalid
    if (idArray.every((digit) => digit === idArray[0])) {
      return true
    }
    const sizes = possibleRepeatChunkSizes(id)
    for (const size of sizes) {
      if (repeatsForChunkSize(id, size)) {
        return true
      }
    }
    return false
  }

  function isInvalidID(id: number): boolean {
    const idString = id.toString()
    if (idString.length % 2 !== 0) return false
    const halfLength = idString.length / 2
    const firstHalf = idString.slice(0, halfLength)
    const secondHalf = idString.slice(halfLength)
    return firstHalf === secondHalf
  }

  let sumOfInvalidIDs = 0
  parsedInputs.forEach((parsedInput) => {
    const { start, end } = parsedInput
    const invalidIDs: number[] = []
    for (let i = start; i <= end; i++) {
      if (isPartTwo ? isInvalidIDPartTwo(i) : isInvalidID(i)) {
        sumOfInvalidIDs += i
        invalidIDs.push(i)
      }
    }
    const findingsString = buildFindingsString(invalidIDs)
    result += `- ${start}-${end} ${findingsString}\n`
  })

  return (result += `\n\nAdding up all the invalid IDs in this example produces ${sumOfInvalidIDs}.`)
}
