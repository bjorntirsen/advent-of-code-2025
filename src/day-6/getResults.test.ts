import { describe, expect, it } from 'vitest'
import { getResult } from './getResults'
import { exampleInput } from './day-six'
import input from './input.txt?raw'

describe('Day Six', () => {
  describe('Part One', () => {
    it('example', () => {
      expect(getResult(exampleInput)).toContain('4277556')
    })
    it('input', () => {
      expect(getResult(input)).toContain('6209956042374')
    })
  })
})
