export function getResultDayOnePartTwo(input: string, startingDial = 50) {
  function parseInput(input: string) {
    const inputArray = input.split("\n");
    return inputArray.map((line) => {
      const direction = line.charAt(0);
      const value = parseInt(line.slice(1), 10);
      return { direction, value };
    });
  }

  const parsedInputs = parseInput(input);

  function turnDial(
    parsedInput: { direction: string; value: number },
    currentDial: number
  ) {
    let fullRotations = Math.floor(parsedInput.value / 100);
    if (parsedInput.direction === "L") {
      const newDial = currentDial - (parsedInput.value % 100);
      if (newDial < 0 && currentDial !== 0) {
        fullRotations++;
      }
      if (newDial < 0) {
        return { newDial: newDial + 100, fullRotations };
      } else {
        return { newDial, fullRotations };
      }
    } else if (parsedInput.direction === "R") {
      const newDial = (currentDial + parsedInput.value) % 100;
      if (newDial < currentDial && newDial !== 0) fullRotations++;
      if (newDial >= 100) {
        fullRotations++;
        return { newDial: newDial - 100, fullRotations };
      } else {
        return { newDial, fullRotations };
      }
    } else {
      throw new Error("Invalid direction");
    }
  }

  let amountOfZeros = 0;
  let result = `- The dial starts at ${startingDial}.\n`;
  let dial = startingDial;
  parsedInputs.forEach((parsedInput) => {
    const { newDial, fullRotations } = turnDial(parsedInput, dial);
    dial = newDial;
    if (dial === 0) {
      amountOfZeros += 1;
    }
    amountOfZeros += fullRotations;
    const extraResult =
      fullRotations > 0
        ? `; during this rotation, it points at 0 ${fullRotations} times`
        : "";
    result += `- The dial is rotated ${parsedInput.direction}${
      parsedInput.value
    } to point at ${dial}${extraResult}.\n${
      amountOfZeros > 0 ? `  (Total times at 0 so far: ${amountOfZeros})\n` : ""
    }`;
  });

  return (result += `\n\nBecause the dial points at 0 a total of ${amountOfZeros} times during this process, the password in this example is ${amountOfZeros}.`);
}
