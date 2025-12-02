import { useState } from 'react'
import { getResult } from './day-two-utils'
import input from './input.txt?raw'

export const exampleInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`

export default function DayTwo() {
  const [result, setResult] = useState('')
  return (
    <section>
      <h2>Day Two</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => setResult('')}>Reset</button>
        <button onClick={() => setResult(getResult(exampleInput))}>
          Run Example
        </button>
        <button onClick={() => setResult(getResult(input))}>Run Input</button>
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
