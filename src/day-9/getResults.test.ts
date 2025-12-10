import { describe, expect, it } from 'vitest'
import { getResult } from './getResults'
import exampleInput from './exampleInput.txt?raw'
import input from './input.txt?raw'

describe('Day Eight', () => {
  describe.skip('Part One', () => {
    it('example', () => {
      expect(getResult(exampleInput)).toContain('becomes: 40')
    })
    it('input', () => {
      expect(getResult(input)).toContain('becomes: 122430')
    })
  })
})
