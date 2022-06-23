import { acceptHMRUpdate, defineStore } from 'pinia'
import { TEMPLATES } from '~/constants'

const initialState = {
  isEditing: false,
  template: 1,
  about: {
    isShow: true,
    isEditing: false,
    name: 'Name',
    jobTitle: '',
  },
  summary: {
    isShow: true,
    isEditing: false,
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
        isEditing: false,
        title: '',
        subtitle: '',
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
        isEditing: false,
        title: '',
        subtitle: '',
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
        isEditing: false,
        title: '',
        subtitle: '',
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
        isEditing: false,
        title: '',
        subtitle: '',
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
        isEditing: false,
        title: '',
        subtitle: '',
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
        isEditing: false,
        title: '',
        subtitle: '',
        subtitle1: '',
        subtitle2: '',
        paragraph: '',
      },
    ],
  },
}

export const useUserStore = defineStore('user', {
  state: () => {
    const template = TEMPLATES.find(item => item.template === initialState.template)
    const state = { ...initialState, ...template }
    state.isEditing = false
    return state
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
