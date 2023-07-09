import { defineStore } from 'pinia'
import type { Note } from '~/types'

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
  },
})
