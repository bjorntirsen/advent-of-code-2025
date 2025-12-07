function parseInputAndTrimSpaces(input: string) {
  // Parse the input into a 2D array of strings, the input consistes of strings of numbers separated by an uneven amout of spaces on each line, and the lines are separated by new lines, the last line contains operators instead of numbers
  return input.split('\n').map((line) => line.trim().split(/\s+/))
}

function rotateGridClockwise(grid: string[][]) {
  // Rotate the grid 90 degrees clockwise
  return grid[0].map((_, index) => grid.map((row) => row[index]).reverse())
}

function parseInputAndPreserveSpaces(input: string) {
  // Parse the input into a 2D array of strings and preseve spaces in the grid
  return input.split('\n').map((line) => line.split(''))
}

function rotateGridCounterClockwise(grid: string[][]): string[][] {
  // Rotate the grid 90 degrees counter clockwise
  return grid[0].map((_, index) =>
    grid.map((row) => row[row.length - 1 - index]),
  )
}

function transformRotatedGridIntoGridOfProblems(
  rotatedGrid: string[][],
): string[][] {
  let problemIndex = 0
  const problems: string[][] = [[]]

  rotatedGrid.forEach((items) => {
    const transformedRow = items.join('').trim()

    if (transformedRow.endsWith('*') || transformedRow.endsWith('+')) {
      const operator = transformedRow.slice(-1)
      problems[problemIndex].unshift(operator)
      const number = transformedRow.slice(0, -1)
      problems[problemIndex].push(number)
    } else if (transformedRow !== '') {
      problems[problemIndex].push(transformedRow)
    } else {
      problemIndex++
      problems[problemIndex] = []
    }
  })

  return problems
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

function getResultsAsATypedOutDescription(problems: string[][]) {
  let description = 'Result:\n\n'
  let grandTotal = 0
  const results: number[] = []
  problems.forEach((items) => {
    const result = performCalculation(items)
    const operator = items[0]
    const numbers = items.slice(1)
    // Reverse the numbers array to match the order in the input
    numbers.reverse()
    description += `- ${numbers.join(` ${operator} `)} = ${result}\n`
    grandTotal += result || 0
    results.push(result || 0)
  })
  description += `\nIn this worksheet, the grand total is ${results.join(
    ' + ',
  )} = ${grandTotal}.`
  return description
}

export function getResult(input: string, isPartTwo = false) {
  if (!isPartTwo) {
    const grid = parseInputAndTrimSpaces(input)
    const problems = rotateGridClockwise(grid)
    return getResultsAsATypedOutDescription(problems)
  } else {
    const grid = parseInputAndPreserveSpaces(input)
    const rotatedGrid = rotateGridCounterClockwise(grid)
    const problems = transformRotatedGridIntoGridOfProblems(rotatedGrid)
    return getResultsAsATypedOutDescription(problems)
  }
}
