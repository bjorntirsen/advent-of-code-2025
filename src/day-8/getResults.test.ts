import { describe, expect, it } from 'vitest'
import { getResult } from './getResults'
import exampleInput from './exampleInput.txt?raw'
import input from './input.txt?raw'

describe('Day Eight', () => {
  describe('Part One', () => {
    it('example', () => {
      expect(getResult(exampleInput)).toContain('total of 21 times')
    })
    it('input', () => {
      expect(getResult(input)).toContain('total of 1587 times')
    })
  })
})
