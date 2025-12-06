function parseInput(input: string) {
  // Parse the input into a 2D array of strings, the input consistes of strings of numbers separated by an uneven amout of spaces on each line, and the lines are separated by new lines, the last line contains operators instead of numbers
  const grid = input.split('\n').map((line) => line.trim().split(/\s+/))
  // Rotate the grid 90 degrees clockwise
  return grid[0].map((_, index) => grid.map((row) => row[index]).reverse())
}

// Function that performs calculations on an array of strings where the first item is the opreator followed by numbers in the type of strings
function performCalculation(items: string[]) {
  const operator = items[0]
  const numbers = items.slice(1).map(Number)

  switch (operator) {
    case '+':
      return numbers.reduce((a, b) => a + b, 0)
    case '*':
      return numbers.reduce((a, b) => a * b, 1)
    default:
      console.error(`Unknown operator: ${operator}`)
  }
}

export function getResult(input: string, isPartTwo = false) {
  console.log('isPartTwo: ', isPartTwo)
  let typedOutResult = `Result:\n\n`
  let grandTotal = 0
  const results: number[] = []
  console.log('Parsing input...')
  const parsedInput = parseInput(input)
  console.log('Performing calculations...')
  parsedInput.forEach((items) => {
    const result = performCalculation(items)

    const operator = items[0]
    const numbers = items.slice(1)
    // Reverse the numbers array to match the order in the input
    numbers.reverse()
    typedOutResult += `- ${numbers.join(` ${operator} `)} = ${result}\n`
    grandTotal += result || 0
    results.push(result || 0)
  })

  typedOutResult += `\nIn this worksheet, the grand total is ${results.join(
    ' + ',
  )} = ${grandTotal}.`

  return typedOutResult
}
