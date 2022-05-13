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
      name: 'EXPERIENCE',
      list: [
        {
          isShow: true,
          isCollapsed: false,
          title: 'UI Designer',
          subtitle1: 'New Socks Media',
          subtitle2: 'Feb 2021 - Current',
          paragraph: `To work closely with CEO, UX designer, solution architect, and developer to build digital products, including website and mobile applications.
            2+ year experience of user-centric design
            Translated business requirements and customer insights into wireframes, UI mock-ups and specifications, and interactive prototypes
            Conducted User experience research through stack holder and user interviews
            Familiar with developing brand guidelines and component libraries
            Built SaaS products and got involved from the very early stage
          `,
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
