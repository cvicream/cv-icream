import { describe, expect, it } from 'vitest'
import { getColor, getFontSizeClassName, hexToRgb, isEditorEmpty, rgbToHex, stripHtml, validateEmail } from '~/utils'

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
      id: 'default',
      primary: '#F18B6B',
      primary70: '#F6AF98',
      primary40: '#FAD1C4',
      primary20: '#FCE8E1',
      primary10: '#FEF4F1',
      secondary: '#FEF4F1',
      shadow: '#FCE8E1',
      border: '#FAD1C4',
    })
  })

  it('isEditorEmpty', () => {
    expect(isEditorEmpty('<p></p>')).toEqual(false)
    expect(isEditorEmpty('<p><br></p>')).toEqual(true)
  })

  it('stripHtml', () => {
    expect(stripHtml('<p><br></p>')).toEqual('')
    expect(stripHtml('<p>Your Name</p>')).toEqual('Your Name')
  })

  it('validateEmail', () => {
    expect(validateEmail('admin@example.com')).toBeTruthy()
    expect(validateEmail('admin')).toBeFalsy()
  })
})
