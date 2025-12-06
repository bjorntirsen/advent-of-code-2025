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

export default function DaySix() {
  const [result, setResult] = useState('')
  const [resultWithLineBreaks, setResultWithLineBreaks] = useState('')
  return (
    <section>
      <h2>Day Six</h2>
      <div className="section-body">
        <button onClick={() => (setResult(''), setResultWithLineBreaks(''))}>
          Reset
        </button>
        <button onClick={() => setResult(getResult(exampleInput))}>
          Run Example
        </button>
        <button onClick={() => setResult(getResult(input))}>
          Run Input Part One
        </button>
        <button
          onClick={() => setResultWithLineBreaks(getResult(exampleInput, true))}
        >
          Run Example Part Two
        </button>
        <button onClick={() => setResultWithLineBreaks(getResult(input, true))}>
          Run Input Part Two
        </button>
      </div>
      {resultWithLineBreaks && (
        <pre style={{ whiteSpace: 'pre-wrap' }}>{resultWithLineBreaks}</pre>
      )}
      {result && <pre>{result}</pre>}
    </section>
  )
}
