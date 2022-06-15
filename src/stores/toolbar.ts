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
      fontScale: 1,
      primaryColour: '#F18B6B',
      secondaryColour: '#FEF4F1',
      fontFamily: 'font-gill-sans',
      layout: 1,
      titleScale: 'title-default',
      subtitleScale: 'subtitle-default',
      paragraphScale: 'paragraph-default',
    },
    colours: [
      {
        name: 'default',
        primary: '#F18B6B',
        secondary: '#FEF4F1',
        shadow: '#FCE8E1',
        isActive: true,
      },
      {
        name: 'yellow',
        primary: '#FAAA1E',
        secondary: '#FFF7E8',
        shadow: '#FAAA1E33',
        isActive: false,
      },
      {
        name: 'green',
        primary: '#507F39',
        secondary: '#EDF2EB',
        shadow: '#507F3933',
        isActive: false,
      },
      {
        name: 'blue',
        primary: '#4BA1B4',
        secondary: '#EDF6F7',
        shadow: '#4BA1B433',
        isActive: false,
      },
      {
        name: 'indigo',
        primary: '#005B84',
        secondary: '#E5EFF3',
        shadow: '#005B8433',
        isActive: false,
      },
      {
        name: 'purple',
        primary: '#766E8E',
        secondary: '#F1F0F4',
        shadow: '#766E8E33',
        isActive: false,
      },
      {
        name: 'black',
        primary: '#222222',
        secondary: '#E9E9E9',
        shadow: '#22222233',
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
        name: 'i-custom:template-right',
        isActive: true,
      },
      {
        name: 'i-custom:template-left',
        isActive: false,
      },
      {
        name: 'i-custom:template-full',
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
          document.documentElement.style.setProperty('--primary-color', colour.primary)
          document.documentElement.style.setProperty('--secondary-color', colour.secondary)
          document.documentElement.style.setProperty('--shadow-color', colour.shadow)
        }
      })
    },
    changeFontSize(sizeType: string) {
      this.fontSize.forEach((fontSize) => {
        fontSize.isActive = (fontSize.name === sizeType)
        if (fontSize.isActive) {
          this.currentState.titleScale = `title-${fontSize.name}`
          this.currentState.subtitleScale = `subtitle-${fontSize.name}`
          this.currentState.paragraphScale = `paragraph-${fontSize.name}`
        }
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
      this.layout.forEach((layout, i) => {
        layout.isActive = i === layoutType
      })
    },
  },
})
