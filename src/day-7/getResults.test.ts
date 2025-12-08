import { describe, expect, it } from 'vitest'
import { getResult } from './getResults'
import exampleInput from './exampleInput.txt?raw'
import input from './input.txt?raw'

describe('Day Seven', () => {
  describe('Part One', () => {
    it('example', () => {
      expect(getResult(exampleInput)).toContain('total of 21 times')
    })
    it('input', () => {
      expect(getResult(input)).toContain('total of 1587 times')
    })
  })
  describe('Part Two', () => {
    it('example', () => {
      expect(getResult(exampleInput, true)).toContain('a total of 40 timelines')
    })
    it('input', () => {
      expect(getResult(input, true)).toContain(
        'a total of 5748679033029 timelines',
      )
    })
  })
})
