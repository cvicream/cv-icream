export const LOCAL_STORAGE_KEY = 'cvicream'
export const HIDDEN_INFORMATION = 'The session is currently hidden on CV. Click the toggle if you would like to show it on CV.'

export const LAYOUTS = [
  {
    id: 'layout-right',
    name: 'Layout Right',
    icon: 'i-custom:layout-right',
    image: 'layout-right.png',
  },
  {
    id: 'layout-left',
    name: 'Layout Left',
    icon: 'i-custom:layout-left',
    image: 'layout-left.png',
  },
  {
    id: 'layout-full',
    name: 'Layout Full',
    icon: 'i-custom:layout-full',
    image: 'layout-full.png',
  },
]

export const TEMPLATE_LIST_ITEM = {
  isShow: true,
  isCollapsed: false,
  isEditing: false,
  title: '',
  subtitle: '',
  subtitle1: '',
  subtitle2: '',
  paragraph: '',
}

export const TEMPLATES = [
  {
    template: 1,
    isEditing: true,
    about: {
      isShow: true,
      isEditing: false,
      name: 'Your Name',
      jobTitle: 'UI Designer',
    },
    summary: {
      isShow: true,
      isEditing: false,
      hashtags: [],
      paragraph: 'I care about the details and consider the UI/UX design of affordances to be crucial in creating effective, intuitive interfaces. I consider prototyping to be my weapon of choice in thinking through interaction models and new possibilities. I thrive on learning new things — I enjoy exploring new paths to familiar places. I really love snowboarding (I like both park and powder days). I also really enjoy exploring the amazing trails and landscapes around the bay area on my mountain bike. I’ve traveled a lot and enjoy seeing things from a fresh perspective :)',
    },
    experience: {
      isShow: true,
      name: 'EXPERIENCE',
      list: [
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: 'Product Designer',
          subtitle: '',
          subtitle1: 'Company Name',
          subtitle2: 'February 2015 - Present',
          paragraph: 'Creating functional prototype for an iPad Register product with Flinto alongside various web and client side components. Building a dashboard style guide to unify the design process across Square’s Dashboard. Launched a beta program for Online Store which involved the UX and Visuals for simplified onboarding experience, custom site editor, various templates, and order management.',
        },
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: 'Visual Designer',
          subtitle: '',
          subtitle1: 'Company Name',
          subtitle2: 'June 2011 - Present',
          paragraph: 'Redesigned websites, illustrated technical drawings for a fashion design firm. Produced logos, advertising materials both for print and digital marketing, promotional items, mockups and reports for local businesses.',
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
          subtitle: 'Tool',
          subtitle1: '',
          subtitle2: '',
          paragraph:
`Webflow 
Figma 
Sketch 
InVision 
Adobe Illustrator Photoshop 
HTML and CSS`,
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
          subtitle1: 'City, UK',
          subtitle2: 'example@email.co.uk',
          paragraph: '+4470 1234 5678',
        },
      ],
    },
  },
  {
    template: 2,
    isEditing: true,
    about: {
      isShow: true,
      isEditing: false,
      name: 'Your Name',
      jobTitle: 'UX Designer',
    },
    summary: {
      isShow: true,
      isEditing: false,
      hashtags: [],
      paragraph: 'Meticulous Project Manager with 10+ years of experience delivering on-time and on-budget in the IT and property industries. Proven track record of improving profitability of projects by at least 10% in both niches, by cost-reduction and process optimisation. Documented ability to oversee 20+ projects at a time, up to £3m monthly revenue total. Track record of managing a monthly spending budget of £1.2m. Seeking to apply proven skills and strong principles in a more challenging role.',
    },
    experience: {
      isShow: true,
      name: 'EXPERIENCE',
      list: [
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: 'IT Project Manager',
          subtitle: '',
          subtitle1: 'Company Name',
          subtitle2: 'June 2014 - Present',
          paragraph: `Independently managing 20+ projects at a time, bringing in up to £2.2m revenue monthly. 
          Successfully completed projects of a total value of £65m. -Experienced in managing teams up to 25 employees, including front and back-end developers, analysts, designers, and testers. 
          Implemented a new online shopping solution for a fashion retailer that saw them increase their revenue by 7% instantly.`,
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
          subtitle: 'Profession',
          subtitle1: '',
          subtitle2: '',
          paragraph:
`Agile Coaching 
Scrum 
Project Budgeting
Strategic Planning
Subcontractor
Management`,
        },
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: '',
          subtitle: 'Language',
          subtitle1: '',
          subtitle2: '',
          paragraph:
`English (fluent)
Mandarin (native)`,
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
          title: 'City, UK',
          subtitle: 'example@email.co.uk',
          subtitle1: '',
          subtitle2: '',
          paragraph: '+4470 1234 5678',
        },
      ],
    },
  },
  {
    template: 3,
    isEditing: true,
    about: {
      isShow: true,
      isEditing: false,
      name: 'Your Name',
      jobTitle: 'Software Developer',
    },
    summary: {
      isShow: true,
      isEditing: false,
      hashtags: [],
      paragraph: 'Well-rounded and creative software developer with 4+ years’ experience of participating in all phases of the project lifecycle in various Agile environments. Recently developed a Windows application in C# for tracking and reporting customer support calls, allowing in-house analysts to immediately identify major bottlenecks—then developed a new IVR menu system with DTMF/voice control in C# that reduced the menu bottleneck to 0%. Seeking opportunity to leverage programming, problem-solving and design skills to help bring iLoaster to the cutting edge.',
    },
    experience: {
      isShow: true,
      name: 'EXPERIENCE',
      list: [
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: 'Junior Software Developer',
          subtitle: '',
          subtitle1: 'Company Name',
          subtitle2: 'November 2016 - June 2018',
          paragraph:
`-Assisted in the collection and documentation of client requirements across 3 major accounts, achieved 93% acceptance rate of technical specifications. 
-Created 14 demos and promotional experiences, 11 of which were instrumental in landing client projects worth a combined total of almost £100,000. 
-Analysed and resolved technical problems associated with automated asset processing, leading to an immediate 23% drop in average processing times. 
-Part of a test team that achieved 98% code coverage using the Google test framework.`,
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
          subtitle: 'Language',
          subtitle1: '',
          subtitle2: '',
          paragraph: 'C, C++, Java, SQL, Python, JavaScript, Vue, React',
        },
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: '',
          subtitle: 'Tool',
          subtitle1: '',
          subtitle2: '',
          paragraph: 'Eclipse, Intellij, WebStorm, Node.js',
        },
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: '',
          subtitle: 'Cloud Platforms',
          subtitle1: '',
          subtitle2: '',
          paragraph: 'AWS, Azure and GCP',
        },
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: '',
          subtitle: 'Environments',
          subtitle1: '',
          subtitle2: '',
          paragraph: 'Linus, Windows, Cygwin, MinGW',
        },
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: '',
          subtitle: 'Methodologies',
          subtitle1: '',
          subtitle2: '',
          paragraph: 'Agile, Waterfall, Feature-Driven',
        },
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: '',
          subtitle: 'Other',
          subtitle1: '',
          subtitle2: '',
          paragraph: 'Machine Learning and Data Structures',
        },
      ],
    },
  },
  {
    template: 4,
    isEditing: true,
    about: {
      isShow: true,
      isEditing: false,
      name: 'Your Name',
      jobTitle: 'Product Manager',
    },
    summary: {
      isShow: true,
      isEditing: false,
      hashtags: [],
      paragraph: 'Meticulous Project Manager with 10+ years of experience delivering on-time and on-budget in the IT and property industries. Proven track record of improving profitability of projects by at least 10% in both niches, by cost-reduction and process optimization. Documented ability to oversee 20+ projects at a time, up to £3m monthly revenue total. Track record of managing a monthly spending budget of £1.2m. Seeking to apply proven skills and strong principles in a more challenging role.',
    },
    experience: {
      isShow: true,
      name: 'EXPERIENCE',
      list: [
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: 'IT Project Manager',
          subtitle: '',
          subtitle1: 'Company Name',
          subtitle2: 'London June 2014 - Present',
          paragraph:
`-Independently managing 20+ projects at a time, bringing in up to £2.2m revenue monthly. 
-Successfully completed projects of a total value of £65m. -Experienced in managing teams up to 25 employees, including front and back-end developers, analysts, designers, and testers. 
-Implemented a new online shopping solution for a fashion retailer that saw them increase their revenue by 7% instantly.`,
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
          subtitle: 'Profession',
          subtitle1: '',
          subtitle2: '',
          paragraph:
`Agile Coaching 
Scrum 
Project Budgeting
Strategic Planning
Subcontractor
Management`,
        },
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: '',
          subtitle: 'Language',
          subtitle1: '',
          subtitle2: '',
          paragraph:
`English (fluent)
Mandarin (native)`,
        },
      ],
    },
  },
  {
    template: 5,
    isEditing: true,
    about: {
      isShow: true,
      isEditing: false,
      name: 'Your Name',
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
      list: [TEMPLATE_LIST_ITEM],
    },
    skill: {
      isShow: true,
      name: 'SKILL',
      list: [TEMPLATE_LIST_ITEM],
    },
  },
]

export const COLORS = [
  {
    id: 'default',
    primary: '#F18B6B',
    secondary: '#FEF4F1',
    shadow: '#FCE8E1',
    border: '#FAD1C4',
  },
  {
    id: 'yellow',
    primary: '#FAAA1E',
    secondary: '#FFF7E8',
    shadow: '#FEEED2',
    border: '#FDDDA5',
  },
  {
    id: 'green',
    primary: '#507F39',
    secondary: '#EDF2EB',
    shadow: '#DCE5D7',
    border: '#B9CCB0',
  },
  {
    id: 'blue',
    primary: '#4BA1B4',
    secondary: '#EDF6F7',
    shadow: '#DBECF0',
    border: '#B7D9E1',
  },
  {
    id: 'indigo',
    primary: '#005B84',
    secondary: '#E5EFF3',
    shadow: '#CCDEE6',
    border: '#99BDCE',
  },
  {
    id: 'purple',
    primary: '#766E8E',
    secondary: '#F1F0F4',
    shadow: '#E4E2E8',
    border: '#C8C5D2',
  },
  {
    id: 'black',
    primary: '#222222',
    secondary: '#E9E9E9',
    shadow: '#D3D3D3',
    border: '#A7A7A7',
  },
]

export const FONT_SIZES = [
  {
    id: 'default',
    icon: 'i-custom:font-size w-6 h-6',
    scale: 1,
  },
  {
    id: 'large',
    icon: 'i-custom:font-size w-8 h-8',
    scale: 2,
  },
]

export const FONT_FAMILIES = [
  {
    id: 'font-arial',
    label: 'Arial',
  },
  {
    id: 'font-georgia',
    label: 'Georgia',
  },
  {
    id: 'font-gill-sans',
    label: 'Gill Sans',
  },
  {
    id: 'font-helvetica',
    label: 'Helvetica',
  },
  {
    id: 'font-times-new-roman',
    label: 'Times New Roman',
  },
  {
    id: 'font-lato',
    label: 'Lato',
  },
]
