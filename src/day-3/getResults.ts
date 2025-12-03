// helpers
function findTheLargestCombinationOfTwoNumbers(bank: string): {
  totalJoltage: number
  positions: number[]
} {
  const arrayOfNumbers = bank.split('').map(Number)
  const arrayOfNumbersExceptLast = arrayOfNumbers.slice(0, -1)
  const largestFirstNumber = Math.max(...arrayOfNumbersExceptLast)
  const indexOfLargestFirstNumber = arrayOfNumbers.indexOf(largestFirstNumber)
  const arrayOfNumbersAfterLargestFirstNumber = arrayOfNumbers.slice(
    indexOfLargestFirstNumber + 1,
  )
  const largestSecondNumber = Math.max(...arrayOfNumbersAfterLargestFirstNumber)
  const indexOfLargestSecondNumber = arrayOfNumbers.indexOf(largestSecondNumber)
  const totalJoltage = largestFirstNumber * 10 + largestSecondNumber
  const positions = [indexOfLargestFirstNumber, indexOfLargestSecondNumber]
  return {
    totalJoltage,
    positions,
  }
}

function findTheLargestCombinationOfTwelveNumbers(bank: string): {
  totalJoltage: number
  positions: number[]
} {
  const arrayOfNumbers = bank.split('').map(Number)
  const totalToPick = 12
  const picks = new Array(totalToPick).fill(null)
  interface State {
    start: number
    result: number[]
    positions: number[]
  }
  const initialState: State = {
    start: 0,
    result: [],
    positions: [],
  }
  const resultingPicks: State = picks.reduce((state, _, pickIndex: number) => {
    const { start } = state
    const remaining = totalToPick - pickIndex
    const end = arrayOfNumbers.length - remaining

    const whereTheMaximumCanBeFound = arrayOfNumbers.slice(start, end + 1)

    const largestNumber = Math.max(...whereTheMaximumCanBeFound)

    const largestNumberIndex = arrayOfNumbers.indexOf(largestNumber, start)

    return {
      start: largestNumberIndex + 1,
      result: [...state.result, largestNumber],
      positions: [...state.positions, largestNumberIndex],
    }
  }, initialState)

  const totalJoltage = Number(resultingPicks.result.join(''))
  const positions = resultingPicks.positions

  return {
    totalJoltage,
    positions,
  }
}

export function getResult(input: string, isPartTwo = false) {
  function parseInput(input: string) {
    return input.split('\n')
  }

  const banks = parseInput(input)

  let typedOutResult = `Results:\n`
  let totalOutputJoltage = 0

  function turnOnBatteries(banks: string[]) {
    banks.forEach((bank) => {
      const { totalJoltage, positions } = isPartTwo
        ? findTheLargestCombinationOfTwelveNumbers(bank)
        : findTheLargestCombinationOfTwoNumbers(bank)

      typedOutResult += `- In ${bank}, you can make the largest joltage possible, ${totalJoltage}, by turning on the batteries at positions  ${positions.map((pos: number) => pos + 1).join(', ')}.\n`

      totalOutputJoltage += totalJoltage
    })
  }

  turnOnBatteries(banks)
  typedOutResult += `\nThe total output joltage of all banks is ${totalOutputJoltage}.\n`
  return typedOutResult
}
