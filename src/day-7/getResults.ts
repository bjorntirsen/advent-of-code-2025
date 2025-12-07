function createGrid(input: string) {
  // Parse the input into a 2D array of strings and preseve spaces in the grid
  return input.split('\n').map((line) => line.split(''))
}

function getIndexesOfTychonBeams(row: string[]) {
  const indexOrMinusOne = row.map((item, index) =>
    item === 'S' || item === '|' ? index : -1,
  )
  return indexOrMinusOne.filter((index) => index !== -1)
}

function renderNextRow(currentRow: string[], nextRow: string[] | undefined) {
  if (!nextRow) return 0
  const indexesOfTychonBeams = getIndexesOfTychonBeams(currentRow)
  let numberOfSplitsThisTurn = 0
  indexesOfTychonBeams.forEach((index) => {
    if (nextRow[index] === '^') {
      nextRow[index - 1] = '|'
      nextRow[index + 1] = '|'
      numberOfSplitsThisTurn++
    } else {
      nextRow[index] = '|'
    }
  })
  return numberOfSplitsThisTurn
}

function stringifyGrid(grid: string[][]) {
  let string = ''
  grid.forEach((row) => {
    string += row.join('')
    string += '\n'
  })
  return string
}

export function getResult(input: string, isPartTwo = false) {
  console.log('isPartTwo: ', isPartTwo)
  const grid = createGrid(input)
  let description = ''
  let numberOfSplits = 0
  grid.reduce(
    (state) => {
      const { grid, currentRowIndex } = state
      description += `${stringifyGrid(state.grid)}\n\n`
      // if ()
      numberOfSplits += renderNextRow(
        grid[currentRowIndex],
        grid[currentRowIndex + 1] || undefined,
      )
      return { grid, currentRowIndex: currentRowIndex + 1, numberOfSplits }
    },
    {
      grid,
      currentRowIndex: 0,
      numberOfSplits: 0,
    },
  )
  description += `\n\nHere, the tachyon beam is split a total of ${numberOfSplits} times.`
  return description
}
