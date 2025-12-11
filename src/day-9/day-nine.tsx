import { useState } from 'react'
import { getResult, getResultForPartTwo } from './getResults'
import exampleInput from './exampleInput.txt?raw'
import input from './input.txt?raw'

export default function DayNine() {
  const [result, setResult] = useState('')
  return (
    <section>
      <h2>Day 9: Movie Theater</h2>
      <div className="section-body">
        <button onClick={() => (setResult(''), setResult(''))}>Reset</button>
        <button onClick={() => setResult(getResult(exampleInput))}>
          Run Example
        </button>
        <button onClick={() => setResult(getResult(input))}>Run Input</button>
        <button onClick={() => setResult(getResultForPartTwo(exampleInput))}>
          Run Example Part Two
        </button>
        <button onClick={() => setResult(getResultForPartTwo(input))}>
          Run Input Part Two
        </button>
      </div>
      {result && <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>}
    </section>
  )
}
