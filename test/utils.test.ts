import { describe, expect, it } from 'vitest'
import { addSuffixToParagraph, getColor, getFontSizeClassName, hexToRgb, isEditorEmpty, isSameMonth, isValidDate, isValidHttpUrl, rgbToHex, stripHtml, validateEmail } from '~/utils'

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

  it('addSuffixToParagraph', () => {
    expect(addSuffixToParagraph('<p>Job title</p>', '(Copy)')).toEqual('<p>Job title (Copy)</p>')
    expect(addSuffixToParagraph('<p>Job title</p>', '')).toEqual('<p>Job title</p>')
    expect(addSuffixToParagraph('<p></p>', '(Copy)')).toEqual('<p>(Copy)</p>')
    expect(addSuffixToParagraph('<p></p>', '')).toEqual('<p></p>')
  })
})

describe('isSameMonth', () => {
  // Returns true when both dates are in the same month and year
  it('should return true when both dates are in the same month and year', () => {
    const date1 = new Date(2022, 0, 15)
    const date2 = new Date(2022, 0, 25)
    const result = isSameMonth(date1, date2)
    expect(result).toBe(true)
  })

  // Returns true when both dates are the same
  it('should return true when both dates are the same', () => {
    const date1 = new Date(2022, 0, 15)
    const date2 = new Date(2022, 0, 15)
    const result = isSameMonth(date1, date2)
    expect(result).toBe(true)
  })
})

describe('isValidHttpUrl', () => {
  it('should return false when given a invalid http URL', () => {
    const invalidUrl = 'text'
    expect(isValidHttpUrl(invalidUrl)).toBe(false)
  })
  it('should return true when given a valid http URL', () => {
    const validUrl = 'http://example.com'
    expect(isValidHttpUrl(validUrl)).toBe(true)
  })
  it('should return false when given a URL without protocol', () => {
    const invalidUrl = 'www.example.com'
    expect(isValidHttpUrl(invalidUrl)).toBe(false)
  })
})

describe('isValidDate', () => {
  it('should return false when given an invalid date', () => {
    const invalidDate = 'invalid-date'
    expect(isValidDate(invalidDate)).toBe(false)
  })
  it('should return true when given a valid date', () => {
    const validDate = '2024-07-07'
    expect(isValidDate(validDate)).toBe(true)
  })
})
