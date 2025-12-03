// helpers
function findTheLargestCombinationOfTwoNumbers(bank: string) {
  const arrayOfNumbers = bank.split('').map(Number)
  const arrayOfNumbersExceptLast = arrayOfNumbers.slice(0, -1)
  const largestFirstNumber = Math.max(...arrayOfNumbersExceptLast)
  const indexOfLargestFirstNumber = arrayOfNumbers.indexOf(largestFirstNumber)
  const arrayOfNumbersAfterLargestFirstNumber = arrayOfNumbers.slice(
    indexOfLargestFirstNumber + 1,
  )
  const largestSecondNumber = Math.max(...arrayOfNumbersAfterLargestFirstNumber)
  const indexOfLargestSecondNumber = arrayOfNumbers.indexOf(largestSecondNumber)
  return {
    firstNumber: largestFirstNumber,
    secondNumber: largestSecondNumber,
    firstNumberIndex: indexOfLargestFirstNumber,
    secondNumberIndex: indexOfLargestSecondNumber,
  }
}

export function getResult(input: string, isPartTwo = false) {
  console.log('isPartTwo: ', isPartTwo)

  function parseInput(input: string) {
    return input.split('\n')
  }

  const banks = parseInput(input)

  let result = `Results:\n`
  let totalOutputJoltage = 0

  function turnOnBatteries(banks: string[]) {
    banks.forEach((bank) => {
      const largestCombination = findTheLargestCombinationOfTwoNumbers(bank)
      const totalJoltage =
        largestCombination.firstNumber * 10 + largestCombination.secondNumber
      totalOutputJoltage += totalJoltage
      result += `- In ${bank}, you can make the largest joltage possible, ${totalJoltage}, by turning on the batteries at positions ${largestCombination.firstNumberIndex + 1} and ${largestCombination.secondNumberIndex + 1}.\n`
    })
  }
  turnOnBatteries(banks)
  result += `\nThe total output joltage of all banks is ${totalOutputJoltage}.\n`
  return result
}
