import { defineStore } from 'pinia'
import type { Note } from '~/types'
import { MOBILE_BREAKPOINT } from '~/constants'

interface State {
  dropdownMenu: {
    layout: boolean
    color: boolean
    fontSize: boolean
    fontFamily: boolean
  }
  isCVPreviewVisible: boolean
  currentState: {
    fontFamily: string
    layout: string
    color: string
    fontSize: string
  }
  noteList: Note[]
  isMobileScreen: boolean
}

export const useToolbarStore = defineStore('toolbar', {
  state: (): State => ({
    dropdownMenu: {
      layout: false,
      color: false,
      fontSize: false,
      fontFamily: false,
    },
    isCVPreviewVisible: false,
    currentState: {
      fontFamily: 'font-gill-sans',
      layout: 'layout-right',
      color: 'default',
      fontSize: 'default',
    },
    noteList: [],
    isMobileScreen: window.innerWidth <= MOBILE_BREAKPOINT,
  }),
  actions: {
    toggle(value: string) {
      Object.keys(this.dropdownMenu).forEach((key) => {
        if (key === value)
          this.dropdownMenu[key as keyof typeof this.dropdownMenu] = !this.dropdownMenu[key as keyof typeof this.dropdownMenu]
        else
          this.dropdownMenu[key as keyof typeof this.dropdownMenu] = false
      })
    },
    changeColor(id: string) {
      this.currentState.color = id
    },
    changeFontSize(id: string) {
      this.currentState.fontSize = id
    },
    changeFontFamily(id: string) {
      this.currentState.fontFamily = id
    },
    changeLayout(id: string) {
      this.currentState.layout = id
    },
    addNote(note: Note) {
      if (this.noteList === undefined)
        this.noteList = []
      this.noteList.push(note)
    },
    modifyNote(note: Note) {
      this.noteList = this.noteList.map((el) => {
        if (el.id === note.id)
          return note
        return el
      })
    },
    removeNote(id: number) {
      this.noteList = this.noteList.filter(note => note.id !== id)
    },
    removeEmptyNotes() {
      this.noteList = this.noteList.reduce<Note[]>((acc, curr) => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(curr.value, 'text/html')
        if (doc?.body?.firstChild?.textContent)
          return [...acc, curr]
        return acc
      }, [])
    },
    setIsMobileScreen(val: boolean) {
      this.isMobileScreen = val
    },
  },
})
