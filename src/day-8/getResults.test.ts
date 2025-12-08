import { describe, expect, it } from 'vitest'
import { getResult } from './getResults'
import exampleInput from './exampleInput.txt?raw'
import input from './input.txt?raw'

describe('Day Eight', () => {
  describe('Part One', () => {
    it('example', () => {
      expect(getResult(exampleInput, 10)).toContain('becomes: 40')
    })
    it('input', () => {
      expect(getResult(input, 1000)).toContain('becomes: 122430')
    })
  })
})
