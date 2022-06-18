import { describe, expect, it } from 'vitest'
import { getColor, getFontSizeClassName, hexToRgb, rgbToHex } from '~/utils'

describe('Utils', () => {
  it('hexToRgb', () => {
    expect(hexToRgb('#0a3678')).toEqual('10,54,120')
  })

  it('rgbToHex', () => {
    expect(rgbToHex(10, 54, 120)).toEqual('#0a3678')
  })

  it('getFontSizeClassName', () => {
    expect(getFontSizeClassName('default')).toEqual({
      title: 'title-default',
      subtitle: 'subtitle-default',
      paragraph: 'paragraph-default',
    })
  })

  it('getColor', () => {
    expect(getColor('default')).toEqual({
      primary: '#F18B6B',
      secondary: '#FEF4F1',
      shadow: '#FCE8E1',
    })
  })
})
