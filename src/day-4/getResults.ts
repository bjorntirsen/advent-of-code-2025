type GridPositionState = '.' | '@' | 'x' | 'O'

function createGrid(input: string): GridPositionState[][] {
  const rows = input.split('\n')
  return rows.map((row) => row.split('') as GridPositionState[])
}

function getAdjacentPositions(
  grid: GridPositionState[][],
  rowIndex: number,
  colIndex: number,
): GridPositionState[] {
  const adjacentPositions: GridPositionState[] = []

  const directions = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
    [-1, -1], // Up-Left
    [-1, 1], // Up-Right
    [1, -1], // Down-Left
    [1, 1], // Down-Right
  ]

  directions.forEach(([dRow, dCol]) => {
    const newRow = rowIndex + dRow
    const newCol = colIndex + dCol
    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length
    ) {
      adjacentPositions.push(grid[newRow][newCol])
    }
  })

  return adjacentPositions
}

function fewerThanFourRollsOfPaperAdjacent(
  adjacentPositions: GridPositionState[],
): boolean {
  const rollCount = adjacentPositions.filter((pos) => pos === '@').length
  return rollCount < 4
}

function checkGridAndCoundAmountOfAccessible(grid: GridPositionState[][]): {
  checkedGrid: GridPositionState[][]
  accessibleCount: number
} {
  let accessibleCount = 0
  const checkedGrid: GridPositionState[][] = grid.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      if (cell === '@') {
        const adjacentPositions = getAdjacentPositions(grid, rowIndex, colIndex)
        if (fewerThanFourRollsOfPaperAdjacent(adjacentPositions)) {
          accessibleCount++
          return 'x' // Mark as accessible
        }
      }
      return cell
    }),
  )
  return { checkedGrid, accessibleCount }
}

function stringifyCheckedGrid(grid: GridPositionState[][]): string {
  return grid.map((row) => row.join('')).join('\n')
}

function checkGridRecursively(
  grid: GridPositionState[][],
  totalRemoved: number,
  typedOutResult: string,
): string {
  let rollsToBeRemovedThisIteration = 0
  const checkedGrid: GridPositionState[][] = grid.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      if (cell === 'O') {
        return 'x'
      } // Previously marked as accessible
      if (cell === '@') {
        const adjacentPositions = getAdjacentPositions(grid, rowIndex, colIndex)
        if (fewerThanFourRollsOfPaperAdjacent(adjacentPositions)) {
          rollsToBeRemovedThisIteration++
          return 'O' // Mark as accessible
        }
      }
      return cell
    }),
  )
  if (rollsToBeRemovedThisIteration === 0)
    return `${typedOutResult}\nA total of ${totalRemoved} rolls of paper can be removed.`
  const newTypedOutResult =
    typedOutResult +
    stringifyCheckedGrid(checkedGrid) +
    '\n\n' +
    `Remove ${rollsToBeRemovedThisIteration} rolls of paper:\n`
  return checkGridRecursively(
    checkedGrid,
    totalRemoved + rollsToBeRemovedThisIteration,
    newTypedOutResult,
  )
}

export function getResult(input: string, isPartTwo = false) {
  console.log('isPartTwo: ', isPartTwo)

  const grid = createGrid(input)
  if (!isPartTwo) {
    const { checkedGrid, accessibleCount } =
      checkGridAndCoundAmountOfAccessible(grid)
    const stringifiedCheckedGrid = stringifyCheckedGrid(checkedGrid)

    return `In this example, there are ${accessibleCount} rolls of paper that can be accessed by a forklift (marked with x):\n\n${stringifiedCheckedGrid}`
  } else {
    let typesedOutResult = `Initial state:\n`
    return (typesedOutResult += checkGridRecursively(grid, 0, typesedOutResult))
  }
}
