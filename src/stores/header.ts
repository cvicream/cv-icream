import { defineStore } from 'pinia'

export const useHeaderAction = defineStore('headeraction', {
    state: () => ({
      dropdownMenu: {
        headeraction: false,
      },

      headeraction: [
        {
            name: 'save',
            label: 'Arial',
            isActive: false,
          },
          {
              name: 'import',
              label: 'Arial',
              isActive: false,
          },
          {
              name: 'download',
              label: 'Arial',
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