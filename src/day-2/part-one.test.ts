import { describe, expect, it } from 'vitest'
import { getResult } from './day-two-utils'
import { exampleInput } from './day-two'
import input from './input.txt?raw'

describe('Day Two Part One', () => {
  it('example test', () => {
    expect(getResult(exampleInput)).toContain('1227775554')
  })
  it('input test', () => {
    expect(getResult(input)).toContain('9188031749')
  })
})
