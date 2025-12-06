import { useState } from 'react'
import { getResult } from './getResults'
import input from './input.txt?raw'

export const exampleInput = `987654321111111
811111111111119
234234234234278
818181911112111`

export default function DayThree() {
  const [result, setResult] = useState('')
  return (
    <section>
      <h2>Day Three</h2>
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
