import { describe, expect, it } from 'vitest'
import {
  numberToDigitsArray,
  possibleRepeatChunkSizes,
  getResult,
} from './day-two-utils'
import { exampleInput } from './day-two'
import input from './input.txt?raw'

describe('numberToDigitsArray', () => {
  it('converts number to array of digits', () => {
    expect(numberToDigitsArray(12345)).toEqual([1, 2, 3, 4, 5])
    expect(numberToDigitsArray(907)).toEqual([9, 0, 7])
    expect(numberToDigitsArray(0)).toEqual([0])
  })
})

describe('possibleRepeatChunkSizes', () => {
  it('returns an array of all the ways the number can be divided into equal length parts', () => {
    expect(possibleRepeatChunkSizes(1)).toEqual([])
    expect(possibleRepeatChunkSizes(12)).toEqual([])
    expect(possibleRepeatChunkSizes(123)).toEqual([])
    expect(possibleRepeatChunkSizes(1234)).toEqual([2])
    expect(possibleRepeatChunkSizes(12345)).toEqual([])
    expect(possibleRepeatChunkSizes(123456)).toEqual([2, 3])
  })
})

describe('Day Two Part Two', () => {
  it('example test', () => {
    expect(getResult(exampleInput, true)).toContain('4174379265')
  })
  it('input test', () => {
    expect(getResult(input, true)).toContain('11323661261')
  })
})
