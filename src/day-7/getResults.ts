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

function countTimelines(grid: string[][]): number {
  const widthOfRow = grid[0].length

  // Array to hold counts of beams at each column
  let counts = Array(widthOfRow).fill(0)

  // Initial beams
  for (const column of getIndexesOfTychonBeams(grid[0])) {
    counts[column] = 1
  }

  for (let row = 0; row < grid.length - 1; row++) {
    const nextRow = grid[row + 1]
    const nextCounts = Array(widthOfRow).fill(0)

    for (let column = 0; column < widthOfRow; column++) {
      const beamCount = counts[column]
      if (beamCount === 0) continue

      if (nextRow[column] === '^') {
        // Beam is split
        if (column - 1 >= 0) nextCounts[column - 1] += beamCount
        if (column + 1 < widthOfRow) nextCounts[column + 1] += beamCount
      } else {
        // Beam continues straight
        nextCounts[column] += beamCount
      }
    }

    counts = nextCounts
  }

  return counts.reduce((sum, v) => sum + v, 0)
}

type Grid = string[][]

function stringifyGrid(grid: Grid) {
  let string = ''
  grid.forEach((row) => {
    string += row.join('')
    string += '\n'
  })
  return string
}

export function getResult(input: string, isPartTwo = false) {
  const grid = createGrid(input)
  let description = ''
  if (!isPartTwo) {
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
  const count = countTimelines(grid)
  description += `\n\nHere, the tachyon beam creates a total of ${count} timelines.`
  return description
}
