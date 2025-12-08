import { useState } from 'react'
import { getResult } from './getResults'
import input from './input.txt?raw'

export const exampleInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

export default function DayFour() {
  const [result, setResult] = useState('')
  return (
    <section>
      <h2>Day 4: Printing Department</h2>
      <div className="section-body">
        <button onClick={() => setResult('')}>Reset</button>
        <button onClick={() => setResult(getResult(exampleInput))}>
          Run Example
        </button>
        <button onClick={() => setResult(getResult(input))}>
          Run Input Part One
        </button>
        <button onClick={() => setResult(getResult(exampleInput, true))}>
          Run Example Part Two
        </button>
        <button onClick={() => setResult(getResult(input, true))}>
          Run Input Part Two
        </button>
      </div>
      <pre>{result}</pre>
    </section>
  )
}
