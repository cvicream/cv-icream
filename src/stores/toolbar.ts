import { defineStore } from 'pinia'
import { MOBILE_BREAKPOINT } from '~/constants'

export const useToolbarStore = defineStore('toolbar', {
  state: () => ({
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
  },
})
