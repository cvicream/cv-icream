import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    template: 1,
    about: {
      isShow: true,
      name: 'Name',
      jobTitle: '',
    },
    summary: {
      isShow: true,
      hashtags: [],
      paragraph: '',
    },
    experience: {
      isShow: true,
      name: 'EXPERIENCE',
      list: [
        {
          isShow: true,
          isCollapsed: false,
          title: '',
          subtitle1: '',
          subtitle2: '',
          paragraph: '',
        },
      ],
    },
    project: {
      isShow: true,
      name: 'PROJECT',
      list: [
        {
          isShow: true,
          isCollapsed: false,
          title: '',
          subtitle1: '',
          subtitle2: '',
          paragraph: '',
        },
      ],
    },
    skill: {
      isShow: true,
      name: 'SKILL',
      list: [
        {
          isShow: true,
          isCollapsed: false,
          title: '',
          subtitle1: '',
          subtitle2: '',
          paragraph: '',
        },
      ],
    },
    education: {
      isShow: true,
      name: 'EDUCATION',
      list: [
        {
          isShow: true,
          isCollapsed: false,
          title: '',
          subtitle1: '',
          subtitle2: '',
          paragraph: '',
        },
      ],
    },
    certificate: {
      isShow: true,
      name: 'CERTIFICATE',
      list: [
        {
          isShow: true,
          isCollapsed: false,
          title: '',
          subtitle1: '',
          subtitle2: '',
          paragraph: '',
        },
      ],
    },
    contact: {
      isShow: true,
      name: 'CONTACT',
      list: [
        {
          isShow: true,
          isCollapsed: false,
          title: '',
          subtitle1: '',
          subtitle2: '',
          paragraph: '',
        },
      ],
    },
  }),
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
