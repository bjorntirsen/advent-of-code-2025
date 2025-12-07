import { describe, expect, it } from 'vitest'
import { getResult } from './getResults'
import exampleInput from './exampleInput.txt?raw'
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
  describe('Part Two', () => {
    it('example', () => {
      expect(getResult(exampleInput, true)).toContain('3263827')
    })
    it('input', () => {
      expect(getResult(input, true)).toContain('12608160008022')
    })
  })
})
