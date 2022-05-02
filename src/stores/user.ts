import { acceptHMRUpdate, defineStore } from 'pinia'

interface About {
  name: string
  jobTitle: string
}
interface Summary {
  isShow: boolean
  hashtags: string[]
  paragraph: string
}
interface ContentItem {
  isShow: boolean
  title: string
  subtile?: string
  leftSubtitle?: string
  rightSubtitle?: string
  paragraph: string
}
// interface CV {
//   about: About
//   summary: Summary
//   experience: Array<ContentItem>
//   project: Array<ContentItem>
//   skill: Array<ContentItem>
//   education: Array<ContentItem>
//   certificate: Array<ContentItem>
//   contact: Array<ContentItem>
// }

export const useUserStore = defineStore('user', {
  state: () => ({
    about: {
      name: 'Pei-Shan Yu',
      jobTitle: 'UI Designer',
    },
    summary: {
      isShow: true,
      hashtags: ['#TeamPlayer', '#SelfMotivated', '#CanDoAttitude'],
      paragraph: 'As a 2yr experienced UI designer, I see myself as a self-motivated and passionate learner, who makes progress every single day. With a can-do attitude, I try my best to experience the whole process of user interface and experience design, from stakeholder and user interviews, UI mock-ups and specifications, to interactive prototypes. With my educational training from science background and visual storytelling, I believe I am a nice candidate with strong systemic thinking and enjoyable visual design ability, to be considered for your team.With getting inspired from talking to different people from diverse cultures and gathering designs from daily life, my strength is to be a good team player and be able to connect dots and build the connection from what I have learned and experienced from various fields.',
    },
    experience: {
      isShow: true,
      content: [],
    },
  }),
})

// export const useUserStore = defineStore('user', () => {
//   const about = ref<About>({
//     name: '',
//     jobTitle: '',
//   })
//   const summary = ref<Summary>({
//     hashtags: [],
//     paragraph: '',
//   })
//   const experience = ref<Array<ContentItem>>([])
//   const project = ref<Array<ContentItem>>([])
//   const skill = ref<Array<ContentItem>>([])
//   const education = ref<Array<ContentItem>>([])
//   const certificate = ref<Array<ContentItem>>([])
//   const contact = ref<Array<ContentItem>>([])

//   function setAbout(value: About) {
//     about.value = value
//   }

//   return {
//     about,
//     summary,
//     experience,
//     project,
//     skill,
//     education,
//     certificate,
//     contact,
//     setAbout,
//   }
// })

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
