import { defineStore } from 'pinia'

export const useToolbarStore = defineStore('toolbar', {
  state: () => ({
    dropdownMenu: {
      layout: false,
      colour: false,
      fontSize: false,
      fontFamily: false,
    },
    isCVPreviewVisible: false,
    currentState: {
      primaryColour: '#F18B6B',
      secondaryColour: '#FEF4F1',
      fontSizeScale: 1,
      fontFamily: 'font-gill-sans',
      layout: 1,
    },
    colours: [
      {
        name: 'default',
        primary: '#F18B6B',
        secondary: '#FEF4F1',
        isActive: true,
      },
      {
        name: 'yellow',
        primary: '#FAAA1E',
        secondary: '#FFF7E8',
        isActive: false,
      },
      {
        name: 'green',
        primary: '#507F39',
        secondary: '#EDF2EB',
        isActive: false,
      },
      {
        name: 'blue',
        primary: '#4BA1B4',
        secondary: '#EDF6F7',
        isActive: false,
      },
      {
        name: 'indigo',
        primary: '#005B84',
        secondary: '#E5EFF3',
        isActive: false,
      },
      {
        name: 'purple',
        primary: '#766E8E',
        secondary: '#F1F0F4',
        isActive: false,
      },
      {
        name: 'black',
        primary: '#222222',
        secondary: '#E9E9E9',
        isActive: false,
      },
    ],
    fontSize: [
      {
        name: 'default',
        isActive: true,
        scale: 1,
      },
      {
        name: 'large',
        isActive: false,
        scale: 2,
      },
    ],
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
    layout: [
      {
        name: 'main-right',
        isActive: true,
      },
      {
        name: 'main-left',
        isActive: false,
      },
      {
        name: 'main-full',
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
    changeColour(index: number) {
      this.colours.forEach((colour, i) => {
        colour.isActive = i === index
        if (colour.isActive) {
          this.currentState.primaryColour = colour.primary
          this.currentState.secondaryColour = colour.secondary
        }
      })
    },
    changeFontSize(sizeType: string) {
      this.fontSize.forEach((fontSize) => {
        fontSize.isActive = (fontSize.name === sizeType)
        if (fontSize.isActive)
          this.currentState.fontSizeScale = fontSize.scale
      })
    },
    changeFontFamily(index: number) {
      this.fontFamily.forEach((fontFamily, i) => {
        fontFamily.isActive = i === index
        if (fontFamily.isActive)
          this.currentState.fontFamily = fontFamily.name
      })
    },
    changeLayout(layoutType: number) {
      this.currentState.layout = layoutType
    },
  },
})
