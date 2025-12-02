export function getResultDayOnePartOne(input: string) {
  const DIAL_STARTING_VALUE = 50

  function parseInput(input: string) {
    const inputArray = input.split('\n')
    return inputArray.map((line) => {
      const direction = line.charAt(0)
      const value = parseInt(line.slice(1), 10)
      return { direction, value }
    })
  }

  const parsedInputs = parseInput(input)

  function turnDial(
    parsedInput: { direction: string; value: number },
    currentDial: number,
  ) {
    if (parsedInput.direction === 'L') {
      const newDial = (currentDial - parsedInput.value) % 100
      if (newDial < 0) {
        return newDial + 100
      } else {
        return newDial
      }
    } else if (parsedInput.direction === 'R') {
      const newDial = (currentDial + parsedInput.value) % 100
      if (newDial >= 100) {
        return newDial - 100
      } else {
        return newDial
      }
    } else {
      throw new Error('Invalid direction')
    }
  }

  let amountOfZeros = 0
  let result = `- The dial starts at ${DIAL_STARTING_VALUE}.\n`
  let dial = DIAL_STARTING_VALUE
  parsedInputs.forEach((parsedInput) => {
    dial = turnDial(parsedInput, dial)
    if (dial === 0) {
      amountOfZeros += 1
    }
    result += `- The dial is rotated ${parsedInput.direction}${parsedInput.value} to point at ${dial}.\n`
  })

  return (result += `\n\nBecause the dial points at 0 a total of ${amountOfZeros} times during this process, the password in this example is ${amountOfZeros}.`)
}
