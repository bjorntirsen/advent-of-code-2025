import { describe, expect, test } from 'vitest'
import { getResultDayOnePartOne } from './day-one-utils-part-one'
import { inputExample } from './input-example'
import { getResultDayOnePartTwo } from './day-one-utils-part-two'
import { inputPartOne } from './input-part-one'

describe('day one', () => {
  test('example', () => {
    expect(getResultDayOnePartOne(inputExample)).toContain(
      'the password in this example is 3',
    )
  })
  test('part one', () => {
    expect(getResultDayOnePartOne(inputPartOne)).toContain(
      'the password in this example is 1064.',
    )
  })
  test('part two', () => {
    expect(getResultDayOnePartTwo(inputPartOne)).toContain(
      'the password in this example is 6122.',
    )
  })
})
