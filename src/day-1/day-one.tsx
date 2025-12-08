import { useState } from 'react'
import { getResultDayOnePartOne } from './day-one-utils-part-one'
import { inputPartOne } from './input-part-one'
import { inputExample } from './input-example'
import { getResultDayOnePartTwo } from './day-one-utils-part-two'
import { debugInput } from './debug-input'

export default function DayOne() {
  const [result, setResult] = useState('')
  return (
    <section>
      <h2>Day 1: Secret Entrance</h2>
      <div className="section-body">
        <button onClick={() => setResult('')}>Reset</button>
        <button
          onClick={() => setResult(getResultDayOnePartTwo(debugInput, 0))}
        >
          Debug
        </button>
        <button onClick={() => setResult(getResultDayOnePartOne(inputExample))}>
          Show Example Part One Results
        </button>
        <button onClick={() => setResult(getResultDayOnePartOne(inputPartOne))}>
          Show Part One Results
        </button>
        <button onClick={() => setResult(getResultDayOnePartTwo(inputExample))}>
          Show Example Part Two Results
        </button>
        <button onClick={() => setResult(getResultDayOnePartTwo('R1000'))}>
          Show Warning Part Two Results
        </button>
        <button onClick={() => setResult(getResultDayOnePartTwo(inputPartOne))}>
          Show Part Two Results
        </button>
      </div>
      <pre>{result}</pre>
    </section>
  )
}
