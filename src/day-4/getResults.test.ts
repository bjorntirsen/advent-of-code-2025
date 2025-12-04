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
  describe.skip('Part Two', () => {
    it('example', () => {
      expect(getResult(exampleInput, true)).toContain(
        'joltage of all banks is 3121910778619.',
      )
    })
    it('input', () => {
      expect(getResult(input, true)).toContain(
        'joltage of all banks is 170418192256861.',
      )
    })
  })
})
