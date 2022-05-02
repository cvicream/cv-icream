import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    about: {
      name: 'Pei-Shan Yu',
      jobTitle: 'UI Designer',
    },
    summary: {
      isShow: true,
      hashtags: ['TeamPlayer', 'SelfMotivated', 'CanDoAttitude'],
      paragraph: 'As a 2yr experienced UI designer, I see myself as a self-motivated and passionate learner, who makes progress every single day. With a can-do attitude, I try my best to experience the whole process of user interface and experience design, from stakeholder and user interviews, UI mock-ups and specifications, to interactive prototypes. With my educational training from science background and visual storytelling, I believe I am a nice candidate with strong systemic thinking and enjoyable visual design ability, to be considered for your team.With getting inspired from talking to different people from diverse cultures and gathering designs from daily life, my strength is to be a good team player and be able to connect dots and build the connection from what I have learned and experienced from various fields.',
    },
    experience: {
      isShow: true,
      content: [],
    },
  }),
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
