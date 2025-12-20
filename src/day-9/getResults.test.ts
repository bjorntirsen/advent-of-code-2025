import { describe, expect, it } from 'vitest'
import { getResult } from './getResults'
import exampleInput from './exampleInput.txt?raw'
import input from './input.txt?raw'
import { getResultForPartTwo } from './getResultsPartTwo'

describe('Day Eight', () => {
  describe('Part One', () => {
    it('example', () => {
      expect(getResult(exampleInput)).toContain('area 50')
    })
    it('input', () => {
      expect(getResult(input)).toContain('area 4758598740')
    })
  })
  describe('Part Two', () => {
    it('exampleInput', () => {
      expect(getResultForPartTwo(exampleInput)).toContain('has area 24.')
    })
    it('input', () => {
      expect(getResultForPartTwo(input)).toContain('has area 1474699155.')
    })
  })
})
