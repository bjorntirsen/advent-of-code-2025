import { describe, expect, it } from 'vitest'
import { getResult } from './getResults'
import { exampleInput } from './day-five'
import input from './input.txt?raw'

describe('Day Five', () => {
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
  describe('Part Two', () => {
    it('example', () => {
      expect(getResult(exampleInput, true)).toContain(
        'the fresh ingredient ID ranges consider a total of 14 ingredient IDs to be fresh',
      )
    })
    it('input', () => {
      expect(getResult(input, true)).toContain(
        'the fresh ingredient ID ranges consider a total of 345821388687084 ingredient IDs to be fresh',
      )
    })
  })
})
