function createGrid(input: string) {
  // Parse the input into a 2D array of strings and preseve spaces in the grid
  return input.split('\n').map((line) => line.split(''))
}

interface State {
  grid: string[][]
  currentRowIndex: number
  numberOfSplits: number
}

function processTurnAndGetResults(state: State): State {
  let { grid, currentRowIndex, numberOfSplits } = state
  currentRowIndex++
  return { grid, currentRowIndex, numberOfSplits }
}

export function getResult(input: string, isPartTwo = false) {
  console.log('isPartTwo: ', isPartTwo)
  let description = ''
  const grid = createGrid(input)
  grid.reduce(
    (state) => {
      description += `${state.currentRowIndex}\n`
      return processTurnAndGetResults(state)
    },
    {
      grid,
      currentRowIndex: 0,
      numberOfSplits: 0,
    },
  )
  return description
}
