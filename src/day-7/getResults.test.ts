import { describe, expect, it } from 'vitest'
import { getResult } from './getResults'
import exampleInput from './exampleInput.txt?raw'
import input from './input.txt?raw'

describe('Day Six', () => {
  describe('Part One', () => {
    it('example', () => {
      expect(getResult(exampleInput)).toContain('0')
    })
    it('input', () => {
      expect(getResult(input)).toContain('0')
    })
  })
})
