import _ from 'lodash'
import { COLORS, DRAFT_FILE_TYPE, LOCAL_STORAGE_KEY } from '~/constants'

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

function getStatus() {
  const status = localStorage.getItem(`${LOCAL_STORAGE_KEY}-status`)
  return status
}

function setStatus(value) {
  const statusStr = localStorage.getItem(`${LOCAL_STORAGE_KEY}-status`)
  if (statusStr) {
    const status = JSON.parse(statusStr)
    const newStatus = {
      ...status,
      ...value,
    }
    localStorage.setItem(`${LOCAL_STORAGE_KEY}-status`, JSON.stringify(newStatus))
  }
  else {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}-status`, JSON.stringify(value))
  }
}

function getUndo() {
  const statusStr = getStatus()
  if (statusStr) {
    const status = JSON.parse(statusStr)
    return status.undo && status.undo.length ? status.undo : []
  }
  return []
}

function setUndo(state) {
  const ignoreFields = [
    'toolbar.dropdownMenu',
    'toolbar.isCVPreviewVisible',
    'user.about.isEditing',
    'user.summary.isEditing',
    'user.experience.isEditing',
    'user.timestamp',
    'user.action',
    'isEditing',
  ]

  const undo = getUndo()
  if (undo.length) {
    let lastState = undo[undo.length - 1]
    lastState = _.omit(lastState, ignoreFields)
    omitArray(lastState, ignoreFields)
    const newState = _.omit(state, ignoreFields)
    omitArray(newState, ignoreFields)
    if (_.isEqual(lastState, newState))
      return
  }

  undo.push(state)
  setStatus({ undo })
}

function popUndo() {
  const undo = getUndo()
  const last = undo.pop()
  setStatus({ undo })
  return last
}

function isUndoEmpty() {
  const undo = getUndo()
  return undo.length <= 1
}

function omitArray(obj, ignoreFields) {
  for (const property in obj) {
    const value = obj[property]
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        obj[property] = value.map((x) => {
          return (typeof x === 'object' && x !== null) ? _.omit(x, ignoreFields) : x
        })
      }
      else {
        omitArray(value, ignoreFields)
      }
    }
  }
}

function getRedo() {
  const statusStr = getStatus()
  if (statusStr) {
    const status = JSON.parse(statusStr)
    return status.redo && status.redo.length ? status.redo : []
  }
  return []
}

function setRedo(state) {
  const redo = getRedo()
  redo.push(state)
  setStatus({ redo })
}

function popRedo() {
  const redo = getRedo()
  const last = redo.pop()
  setStatus({ redo })
  return last
}

function isRedoEmpty() {
  const redo = getRedo()
  return redo.length <= 1
}

function isEditing() {
  const statusStr = getStatus()
  if (statusStr) {
    const status = JSON.parse(statusStr)
    return status.isEditing
  }
  return false
}

function getPreviousUrl() {
  const statusStr = getStatus()
  if (statusStr) {
    const status = JSON.parse(statusStr)
    return status.previousUrl
  }
  return ''
}

function getJsonUpload() {
  return new Promise((resolve, reject) => {
    const inputFileElement = document.createElement('input')
    inputFileElement.setAttribute('type', 'file')
    inputFileElement.setAttribute('multiple', 'false')
    inputFileElement.setAttribute('accept', `.${DRAFT_FILE_TYPE}`)

    inputFileElement.addEventListener('change', (event) => {
      const { files } = event.target as HTMLInputElement
      if (!files) return
      const fileName = files[0].name
      const fileType = fileName.slice(-DRAFT_FILE_TYPE.length)
      if (fileType === DRAFT_FILE_TYPE)
        resolve(files[0].text())
      else
        reject(files[0])
    }, false)
    inputFileElement.click()
  })
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

/**
 * Set CSS variable
 *
 * @param  {string} key
 * @param  {string} value
 *
 */
function setCssVariable(key: string, value: string) {
  document.documentElement.style.setProperty(key, value)
}

/**
 * Get font size class name
 *
 * @param  {string} id
 *
 */
function getFontSizeClassName(id: string) {
  return {
    title: `title-${id}`,
    subtitle: `subtitle-${id}`,
    paragraph: `paragraph-${id}`,
  }
}

/**
 * Get color styles
 *
 * @param  {string} id
 *
 */
function getColor(id: string) {
  const color = COLORS.find(item => item.id === id)
  return color
    ? {
      primary: color.primary,
      secondary: color.secondary,
      shadow: color.shadow,
      border: color.border,
    }
    : {
      primary: '#F18B6B',
      secondary: '#FEF4F1',
      shadow: '#FCE8E1',
      border: '#FAD1C4',
    }
}

/**
 * Check if editor value is empty
 *
 * @param  {string} value
 *
 */
function isEditorEmpty(value: string) {
  return (value === '<p><br></p>' || value === '')
}

/**
 * Get text from a HTML string
 *
 * @param {string} html
 */
function stripHtml(html: string) {
  const tempDivElement = document.createElement('div')
  tempDivElement.innerHTML = html
  return tempDivElement.textContent || tempDivElement.innerText || ''
}

function validateEmail(email) {
  const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return pattern.test(email)
}

function isMobileDevice() {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)
}

export {
  hasStorage,
  getStorage,
  setStorage,
  getStatus,
  setStatus,
  getUndo,
  setUndo,
  popUndo,
  isUndoEmpty,
  getRedo,
  setRedo,
  popRedo,
  isRedoEmpty,
  omitArray,
  isEditing,
  getPreviousUrl,
  getJsonUpload,
  rgbToHex,
  hexToRgb,
  setCssVariable,
  getFontSizeClassName,
  getColor,
  isEditorEmpty,
  stripHtml,
  validateEmail,
  isMobileDevice,
}
