import { describe, expect, it } from 'vitest'
import { getResult } from './getResults'
import exampleInput from './exampleInput.txt?raw'
import input from './input.txt?raw'

describe('Day Ten', () => {
  describe.skip('Part One', () => {
    it('example', () => {
      expect(getResult(exampleInput)).toContain('area 50')
    })
    it('input', () => {
      expect(getResult(input)).toContain('area 4758598740')
    })
  })
})
