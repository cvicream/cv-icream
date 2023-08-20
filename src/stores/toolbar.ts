import { defineStore } from 'pinia'
import {
  DEFAULT_LEFT_PANEL_WIDTH,
  DEFAULT_RIGHT_PANEL_WIDTH,
  DEFAULT_TOP_PANEL_WIDTH,
  MOBILE_BREAKPOINT,
} from '~/constants'

export const useToolbarStore = defineStore('toolbar', {
  state: () => ({
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
