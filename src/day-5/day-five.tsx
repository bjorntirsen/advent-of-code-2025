import { useState } from 'react'
import { getResult } from './getResults'
import input from './input.txt?raw'

export const exampleInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`

export default function DayFive() {
  const [result, setResult] = useState('')
  return (
    <section>
      <h2>Day Five</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => setResult('')}>Reset</button>
        <button onClick={() => setResult(getResult(exampleInput))}>
          Run Example
        </button>
        <button onClick={() => setResult(getResult(input))}>
          Run Input Part One
        </button>
        {/* <button onClick={() => setResult(getResult(exampleInput, true))}>
          Run Example Part Two
        </button>
        <button onClick={() => setResult(getResult(input, true))}>
          Run Input Part Two
        </button> */}
      </div>
      <pre>{result}</pre>
    </section>
  )
}
