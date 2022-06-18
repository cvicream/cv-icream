import { describe, expect, it } from 'vitest'
import { hexToRgb, rgbToHex } from '~/utils'

describe('Utils', () => {
  it('hexToRgb', () => {
    expect(hexToRgb('#0a3678')).toEqual('10,54,120')
  })
  it('rgbToHex', () => {
    expect(rgbToHex(10, 54, 120)).toEqual('#0a3678')
  })
})
