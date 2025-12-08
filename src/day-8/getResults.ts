type Vector3D = [number, number, number]

function parseInput(input: string): Vector3D[] {
  const parsed = input
    .split('\n')
    .map((line) => line.split(',').map(Number) as Vector3D)

  return parsed
}

function distance3D(a: Vector3D, b: Vector3D): number {
  return Math.sqrt(
    Math.pow(b[0] - a[0], 2) +
      Math.pow(b[1] - a[1], 2) +
      Math.pow(b[2] - a[2], 2),
  )
}

interface DistanceEntry {
  from: Vector3D
  to: Vector3D
  distance: number
}

function getAllUniqueDistances(vectors: Vector3D[]): DistanceEntry[] {
  const distances: DistanceEntry[] = []

  for (let i = 0; i < vectors.length; i++) {
    for (let j = i + 1; j < vectors.length; j++) {
      const d = distance3D(vectors[i], vectors[j])
      distances.push({ from: vectors[i], to: vectors[j], distance: d })
    }
  }

  return distances
}

function isDistanceAlreadyConnected(
  circuits: Vector3D[][],
  entry: DistanceEntry,
): 'nothing happens' | 'connected' {
  let fromIndex: number | null = null
  let toIndex: number | null = null

  for (let i = 0; i < circuits.length; i++) {
    const circuit = circuits[i]

    if (circuit.some((v) => v.join(',') === entry.from.join(','))) {
      fromIndex = i
    }

    if (circuit.some((v) => v.join(',') === entry.to.join(','))) {
      toIndex = i
    }
  }

  // Same circuit => do nothing
  if (fromIndex !== null && fromIndex === toIndex) {
    return 'nothing happens'
  }

  // Both found in different circuits => merge
  if (fromIndex !== null && toIndex !== null && fromIndex !== toIndex) {
    const circuitA = circuits[fromIndex]
    const circuitB = circuits[toIndex]

    const merged = [...circuitA, ...circuitB]

    // Remove both safely
    if (fromIndex > toIndex) {
      circuits.splice(fromIndex, 1)
      circuits.splice(toIndex, 1)
    } else {
      circuits.splice(toIndex, 1)
      circuits.splice(fromIndex, 1)
    }

    circuits.push(merged)

    return 'connected'
  }

  // Only from exists
  if (fromIndex !== null) {
    circuits[fromIndex].push(entry.to)
    return 'connected'
  }

  // Only to exists
  if (toIndex !== null) {
    circuits[toIndex].push(entry.from)
    return 'connected'
  }

  return 'nothing happens'
}

function connectJunctionBoxes(
  sortedDistances: DistanceEntry[],
  listOfVectors: Vector3D[],
  numberOfConnections: number,
) {
  const circuits: Vector3D[][] = listOfVectors.map((v) => [v])

  const amountsOfConnectionsToMake = sortedDistances.slice(
    0,
    numberOfConnections,
  )

  for (const entry of amountsOfConnectionsToMake) {
    isDistanceAlreadyConnected(circuits, entry)
  }

  return circuits
}

export function getResult(input: string, numberOfConnections: number) {
  const listOfVectors = parseInput(input)
  const distances = getAllUniqueDistances(listOfVectors)
  const sortedDistances = distances.sort((a, b) => a.distance - b.distance)

  const circuits = connectJunctionBoxes(
    sortedDistances,
    listOfVectors,
    numberOfConnections,
  )

  const sortedCircuits = circuits.sort((a, b) => b.length - a.length)
  const topThree = sortedCircuits.slice(0, 3)

  let typedOutRestult = ''
  const numbersToMultiply: number[] = []
  topThree.forEach((circuit, index) => {
    const length = circuit.length
    typedOutRestult += `- ${index + 1}: length: ${length} \n content${circuit.map((entry) => entry.join('+'))}\n`
    numbersToMultiply.push(Number(length))
  })
  const result = numbersToMultiply.reduce((acc, n) => acc * n, 1)

  return (typedOutRestult += `\n The thee largest multiplied becomes: ${result}`)
}
