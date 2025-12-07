import { useState } from 'react'
import { getResult } from './getResults'
import exampleInput from './exampleInput.txt?raw'
import input from './input.txt?raw'

export default function DaySix() {
  const [result, setResult] = useState('')
  return (
    <section>
      <h2>Day 6: Trash Compactor</h2>
      <div className="section-body">
        <button onClick={() => (setResult(''), setResult(''))}>Reset</button>
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
      {result && <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>}
    </section>
  )
}
