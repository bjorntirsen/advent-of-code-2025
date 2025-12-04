import { describe, expect, it } from 'vitest'
import { getResult } from './getResults'
import { exampleInput } from './day-four'
import input from './input.txt?raw'

describe('Day Four', () => {
  describe('Part One', () => {
    it('example', () => {
      expect(getResult(exampleInput)).toContain(
        'there are 13 rolls of paper that can be accessed',
      )
    })
    it('input', () => {
      expect(getResult(input)).toContain(
        'there are 1474 rolls of paper that can be accessed',
      )
    })
  })
  describe('Part Two', () => {
    it('example', () => {
      expect(getResult(exampleInput, true)).toContain(
        'A total of 43 rolls of paper can be removed.',
      )
    })
    it('input', () => {
      expect(getResult(input, true)).toContain(
        'A total of 8910 rolls of paper can be removed.',
      )
    })
  })
})
