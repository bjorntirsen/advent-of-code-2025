import { useState } from 'react'
import { getResult } from './getResults'
import exampleInput from './exampleInput.txt?raw'
import input from './input.txt?raw'

export default function DayEight() {
  const [result, setResult] = useState('')
  return (
    <section>
      <h2>Day 8: Playground</h2>
      <div className="section-body">
        <button onClick={() => (setResult(''), setResult(''))}>Reset</button>
        <button onClick={() => setResult(getResult(exampleInput, 10))}>
          Run Example
        </button>
        <button onClick={() => setResult(getResult(input, 1000))}>
          Run Input Part One
        </button>
        {/* <button onClick={() => setResult(getResult(exampleInput, true))}>
          Run Example Part Two
        </button>
        <button onClick={() => setResult(getResult(input, true))}>
          Run Input Part Two
        </button> */}
      </div>
      {result && <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>}
    </section>
  )
}
