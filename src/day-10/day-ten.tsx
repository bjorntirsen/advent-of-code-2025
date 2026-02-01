import { useState } from 'react'
import { getResult } from './getResults'
import exampleInput from './exampleInput.txt?raw'
import input from './input.txt?raw'

export default function DayTen() {
  const [result, setResult] = useState('')
  return (
    <section>
      <h2>Day 10: Factory</h2>
      <div className="section-body">
        <button onClick={() => (setResult(''), setResult(''))}>Reset</button>
        <button onClick={() => setResult(getResult(exampleInput))}>
          Run Example
        </button>
        <button onClick={() => setResult(getResult(input))}>Run Input</button>
      </div>
      {result && <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>}
    </section>
  )
}
