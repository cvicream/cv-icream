import { defineStore } from 'pinia'
import type { Note } from '~/types'
import {
  DEFAULT_LEFT_PANEL_WIDTH,
  DEFAULT_RIGHT_PANEL_WIDTH,
  DEFAULT_TOP_PANEL_WIDTH,
  MOBILE_BREAKPOINT,
} from '~/constants'

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
    topPanelWidth: number[]
    leftPanelWidth: number[]
    rightPanelWidth: number[]
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
    currentState: { // will be exported in the draft file
      fontFamily: 'font-gill-sans',
      layout: 'layout-right',
      color: 'default',
      fontSize: 'default',
      topPanelWidth: DEFAULT_TOP_PANEL_WIDTH,
      leftPanelWidth: DEFAULT_LEFT_PANEL_WIDTH,
      rightPanelWidth: DEFAULT_RIGHT_PANEL_WIDTH,
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
        if (curr.value)
          return [...acc, curr]
        return acc
      }, [])
    },
    setIsMobileScreen(val: boolean) {
      this.isMobileScreen = val
    },
    setIsCVPreviewVisible(val: boolean) {
      this.isCVPreviewVisible = val
    },
    setTopPanelWidth(val: number[]) {
      this.currentState.topPanelWidth = val
    },
    setLeftPanelWidth(val: number[]) {
      this.currentState.leftPanelWidth = val
    },
    setRightPanelWidth(val: number[]) {
      this.currentState.rightPanelWidth = val
    },
  },
})
