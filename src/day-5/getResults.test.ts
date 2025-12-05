import { describe, expect, it } from 'vitest'
import { getResult } from './getResults'
import { exampleInput } from './day-five'
import input from './input.txt?raw'

describe('Day Four', () => {
  describe('Part One', () => {
    it('example', () => {
      expect(getResult(exampleInput)).toContain(
        '3 of the available ingredient IDs are fresh',
      )
    })
    it('input', () => {
      expect(getResult(input)).toContain(
        '733 of the available ingredient IDs are fresh',
      )
    })
  })
})
