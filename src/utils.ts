import { LOCAL_STORAGE_KEY } from '~/constants'

function hasStorage() {
  return !!getStorage()
}

function getStorage() {
  const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
  return storage ? JSON.parse(storage) : null
}

function setStorage(value) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value))
}

function isEditing() {
  if (hasStorage()) {
    const storage = getStorage()
    return storage.user ? storage.user.isEditing : false
  }
  return false
}

/**
 * Convert RGB to HEX
 *
 * @param  {number} r (10)
 * @param  {number} g (54)
 * @param  {number} b (120)
 * @returns string (#0a3678)
 *
 */
function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/**
 * Convert HEX to RGB
 *
 * @param  {string} hex (#0a3678)
 * @returns string ("10,54,120")
 *
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (result) {
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    return `${r},${g},${b}`
  }
  return null
}

export {
  hasStorage,
  getStorage,
  setStorage,
  isEditing,
  rgbToHex,
  hexToRgb,
}
