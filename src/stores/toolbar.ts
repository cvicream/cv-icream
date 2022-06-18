import { defineStore } from 'pinia'

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
      fontSize: 'large',
    },
    fontFamily: [
      {
        name: 'font-arial',
        label: 'Arial',
        isActive: false,
      },
      {
        name: 'font-georgia',
        label: 'Georgia',
        isActive: false,
      },
      {
        name: 'font-gill-sans',
        label: 'Gill Sans',
        isActive: true,
      },
      {
        name: 'font-helvetica',
        label: 'Helvetica',
        isActive: false,
      },
      {
        name: 'font-times-new-roman',
        label: 'Times New Roman',
        isActive: false,
      },
      {
        name: 'font-lato',
        label: 'Lato',
        isActive: false,
      },
    ],
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
    changeFontFamily(index: number) {
      this.fontFamily.forEach((fontFamily, i) => {
        fontFamily.isActive = i === index
        if (fontFamily.isActive)
          this.currentState.fontFamily = fontFamily.name
      })
    },
    changeLayout(id: string) {
      this.currentState.layout = id
    },
  },
})
