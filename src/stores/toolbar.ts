import { defineStore } from 'pinia'

export const useToolbarStore = defineStore('toolbar', {
  state: () => ({
    dropdownMenu: {
      layout: false,
      colour: false,
      fontSize: false,
      fontFamily: false,
    },
    colours: [
      {
        name: 'default',
        primary: '#F18B6BFF',
        secondary: '#F18B6B33',
        isActive: true,
      },
      {
        name: 'yellow',
        primary: '#FAAA1EFF',
        secondary: '#FAAA1E33',
        isActive: false,
      },
      {
        name: 'green',
        primary: '#507F39FF',
        secondary: '#507F3933',
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
      })
    },
  },
})
