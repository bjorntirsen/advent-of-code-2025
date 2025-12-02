export function getResult(input: string) {
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
      if (isInvalidID(i)) {
        sumOfInvalidIDs += i
        invalidIDs.push(i)
      }
    }
    const findingsString = buildFindingsString(invalidIDs)
    result += `- ${start}-${end} ${findingsString}\n`
  })

  return (result += `\n\nAdding up all the invalid IDs in this example produces ${sumOfInvalidIDs}.`)
}
