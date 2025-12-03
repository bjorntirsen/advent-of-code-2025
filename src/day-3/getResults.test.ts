import { describe, expect, it } from 'vitest'
import { getResult } from './getResults'
import { exampleInput } from './day-three'
import input from './input.txt?raw'

describe('Day Three', () => {
  describe('Part One', () => {
    it('example', () => {
      expect(getResult(exampleInput)).toContain('joltage of all banks is 357.')
    })
    it('input', () => {
      expect(getResult(input)).toContain('joltage of all banks is 17100.')
    })
  })
  describe('Part Two', () => {
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
