export const LOCAL_STORAGE_KEY = 'cvicream'
export const DRAFT_FILE_TYPE = 'cvicream'
export const HIDDEN_INFORMATION = 'The session is currently hidden on CV. Click the toggle if you would like to show it on CV.'
export const MAX_SIDEBAR_WIDTH = 834
export const MIN_SIDEBAR_WIDTH = 390
export const MOBILE_BREAKPOINT = 640
export const SCALES = [25, 50, 100, 200]
export const A4_WIDTH_PX = 794
export const A4_HEIGHT_PX = 1122.5
export const PAGE_BREAKPOINT = 1340

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

export const DEFAULT_TEMPLATE = {
  template: 0,
  splitIndex: 2,
  style: {
    fontFamily: 'font-gill-sans',
    layout: 'layout-right',
    color: 'default',
    fontSize: 'default',
  },
  about: {
    isShow: true,
    isEditing: false,
    name: 'Your Name',
    jobTitle: 'Job Title',
  },
  summary: {
    isShow: true,
    isEditing: false,
    hashtags: ['#YourFeature1', '#YourFeature2', '#YourFeature3'],
    paragraph: 'Describe more details about yourself...',
  },
  experience: {
    isShow: true,
    name: 'EXPERIENCE',
    list: [
      {
        isShow: true,
        isCollapsed: false,
        isEditing: false,
        title: 'E.g. Job Title',
        subtitle: '',
        subtitle1: 'E.g. Company Name',
        subtitle2: 'E.g. Timeline',
        paragraph: 'E.g. Describe more details for this experience...',
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
        title: 'E.g. Project Name',
        subtitle: '',
        subtitle1: 'E.g. Team Name',
        subtitle2: 'E.g. Timeline',
        paragraph: 'E.g. Describe more details for this project...',
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
        title: 'E.g. Skill Title',
        subtitle: 'E.g. Skill Type',
        subtitle1: '',
        subtitle2: '',
        paragraph: 'E.g. Skill 1, Skill 2, ...',
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
        title: 'E.g. Degree Title',
        subtitle: 'E.g. Institution',
        subtitle1: '',
        subtitle2: '',
        paragraph: 'E.g. Graduated, Time, City, Country',
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
        title: 'E.g. Certificate Title',
        subtitle: 'E.g. Institution',
        subtitle1: '',
        subtitle2: '',
        paragraph: 'Describe about what this certificate is for...',
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
        paragraph: 'E.g. Email, Phone number, and where you are currently based in...',
      },
    ],
  },
  social: {
    isShow: true,
    name: 'SOCIAL MEDIA',
    list: [
      {
        isShow: true,
        isCollapsed: false,
        isEditing: false,
        type: 'E.g. LinkedIn',
        link: 'http://',
      },
    ],
  },
}

export const TEMPLATES = [
  JSON.parse(JSON.stringify(DEFAULT_TEMPLATE)), // deep copy
  {
    template: 1,
    splitIndex: 2,
    style: {
      fontFamily: 'font-gill-sans',
      layout: 'layout-right',
      color: 'default',
      fontSize: 'default',
    },
    about: {
      isShow: true,
      isEditing: false,
      name: 'Your Name',
      jobTitle: 'UI Designer',
    },
    summary: {
      isShow: true,
      isEditing: false,
      hashtags: ['#TeamPlayer', '#SelfMotivated', '#CanDoAttitude'],
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
          subtitle2: 'June 2011 - November 2014',
          paragraph: 'Redesigned websites, illustrated technical drawings for a fashion design firm. Produced logos, advertising materials both for print and digital marketing, promotional items, mockups and reports for local businesses.',
        },
      ],
    },
    project: {
      isShow: false,
      name: 'PROJECT',
      list: [
        {
          isShow: false,
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
          subtitle: 'Tool',
          subtitle1: '',
          subtitle2: '',
          paragraph:
'<p>Webflow</p><p>Figma</p><p>Sketch</p><p>InVision</p><p>Adobe Illustrator</p><p>Photoshop</p><p>HTML and CSS</p>',
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
    certificate: {
      isShow: false,
      name: 'CERTIFICATE',
      list: [
        {
          isShow: false,
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
          title: 'Degree Title',
          subtitle: 'Institution',
          subtitle1: '',
          subtitle2: '',
          paragraph: '<p>Graduated / Time</p><p>City, Country</p>',
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
          paragraph: '<p>+4470 1234 5678</p><p>example@email.co.uk</p><p>City, UK</p>',
        },
      ],
    },
    social: {
      isShow: true,
      name: 'SOCIAL MEDIA',
      list: [
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          type: 'LinkedIn',
          link: 'https://www.linkedin.com/',
        },
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          type: 'Behance',
          link: 'https://www.behance.net/',
        },
      ],
    },
  },
  {
    template: 2,
    splitIndex: 2,
    style: {
      fontFamily: 'font-georgia',
      layout: 'layout-right',
      color: 'yellow',
      fontSize: 'default',
    },
    about: {
      isShow: true,
      isEditing: false,
      name: 'Your Name',
      jobTitle: 'User Experience Designer',
    },
    summary: {
      isShow: true,
      isEditing: false,
      hashtags: ['#TeamPlayer', '#SelfMotivated', '#CanDoAttitude'],
      paragraph: 'A UX Designer and Researcher with 2+ years of experience in studying human behaviour in fundamental and applied research settings. Communication, problem solving, user research and writing are core competencies. Currently working towards a UX Design Certificate due to commitment of lifelong learning.',
    },
    experience: {
      isShow: true,
      name: 'EXPERIENCE',
      list: [
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: 'Project Coordinator',
          subtitle: '',
          subtitle1: 'Company Name',
          subtitle2: 'August 2015 - April 2017',
          paragraph: 'Worked with 26 Professors to research and write a grant proposal for an interdisciplinary collaborative research centre, as well as coordinated a Ph.D program in the Psychology Department. Organised workshops and professional development classes, provided ongoing support to Ph.D. students, controlled all project finances, as well as provided ongoing website maintenance support with SO improvements and content updates.',
        },
      ],
    },
    project: {
      isShow: false,
      name: 'PROJECT',
      list: [
        {
          isShow: false,
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
          subtitle: 'Profession',
          subtitle1: '',
          subtitle2: '',
          paragraph: '<p>Research</p><p>User Surveys</p><p>User Interviews</p><p>Statistics & Data Analysis</p><p>Competitive Analysis</p><p>User Personas</p><p>Information Architecture</p><p>Paper Prototyping</p><p>Wireframing</p><p>Usability Testing</p><p>Visual Design</p><p>A/B Testing & Analytics</p><p>Sketch</p><p>InVision</p><p>Microsoft Office</p><p>R & SPSS Statistics Software</p><p>Basic HTML</p>',
        },
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: '',
          subtitle: 'Language',
          subtitle1: '',
          subtitle2: '',
          paragraph: '<p>English (fluent)</p><p>Mandarin (native)</p>',
        },
      ],
    },
    certificate: {
      isShow: false,
      name: 'CERTIFICATE',
      list: [
        {
          isShow: false,
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
          title: 'Degree Title',
          subtitle: 'Institution',
          subtitle1: '',
          subtitle2: '',
          paragraph: '<p>Graduated / Time</p><p>City, Country</p>',
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
          paragraph: '<p>+4470 1234 5678</p><p>example@email.co.uk</p><p>City, UK</p>',
        },
      ],
    },
    social: {
      isShow: true,
      name: 'SOCIAL MEDIA',
      list: [
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          type: 'LinkedIn',
          link: 'https://www.linkedin.com/',
        },
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          type: 'Behance',
          link: 'https://www.behance.net/',
        },
      ],
    },
  },
  {
    template: 3,
    splitIndex: 2,
    style: {
      fontFamily: 'font-arial',
      layout: 'layout-left',
      color: 'blue',
      fontSize: 'default',
    },
    about: {
      isShow: true,
      isEditing: false,
      name: 'Your Name',
      jobTitle: 'Software Developer',
    },
    summary: {
      isShow: true,
      isEditing: false,
      hashtags: ['#TeamPlayer', '#SelfMotivated', '#CanDoAttitude'],
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
          paragraph: '<ul><li>Assisted in the collection and documentation of client requirements across 3 major accounts, achieved 93% acceptance rate of technical specifications.</li><li>Created 14 demos and promotional experiences, 11 of which were instrumental in landing client projects worth a combined total of almost £100,000.</li><li>Analysed and resolved technical problems associated with automated asset processing, leading to an immediate 23% drop in average processing times.</li><li>Part of a test team that achieved 98% code coverage using the Google test framework.</li></ul>',
        },
      ],
    },
    project: {
      isShow: false,
      name: 'PROJECT',
      list: [
        {
          isShow: false,
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
    certificate: {
      isShow: false,
      name: 'CERTIFICATE',
      list: [
        {
          isShow: false,
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
          title: 'Degree Title',
          subtitle: 'Institution',
          subtitle1: '',
          subtitle2: '',
          paragraph: '<p>Graduated / Time</p><p>City, Country</p>',
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
          paragraph: '<p>+4470 1234 5678</p><p>example@email.co.uk</p><p>City, UK</p>',
        },
      ],
    },
    social: {
      isShow: true,
      name: 'SOCIAL MEDIA',
      list: [
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          type: 'LinkedIn',
          link: 'https://www.linkedin.com/',
        },
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          type: 'Github',
          link: 'https://github.com/',
        },
      ],
    },
  },
  {
    template: 4,
    splitIndex: 2,
    style: {
      fontFamily: 'font-times-new-roman',
      layout: 'layout-full',
      color: 'black',
      fontSize: 'default',
    },
    about: {
      isShow: true,
      isEditing: false,
      name: 'Your Name',
      jobTitle: 'Product Manager',
    },
    summary: {
      isShow: true,
      isEditing: false,
      hashtags: ['#TeamPlayer', '#SelfMotivated', '#CanDoAttitude'],
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
          title: 'Product Manager',
          subtitle: '',
          subtitle1: 'Company Name',
          subtitle2: 'July 2012 - September 2013',
          paragraph: '<ul><li>Successfully developed the latest platform of the internet sensation, "Friends of Friends".</li><li>Developed relationships with partners and users to drive content and opportunity for the new platform.</li><li>Established and monitored timelines in association with product launch.</li><li>Assessed user feedback and lead initiatives for product adjustments to grow user base and overall user satisfaction.</li><li>Led teams of designers, marketers, and developers in reaching product goals.</li></ul>',

        },
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: 'IT Project Manager',
          subtitle: '',
          subtitle1: 'Company Name',
          subtitle2: 'April 2008 - April 2012',
          paragraph: '<ul><li>Independently managing 20+ projects at a time, bringing in up to £2.2m revenue monthly.</li><li>Successfully completed projects of a total value of £65m. -Experienced in managing teams up to 25 employees, including front and back-end developers, analysts, designers, and testers.</li><li>Implemented a new online shopping solution for a fashion retailer that saw them increase their revenue by 7% instantly.</li></ul>',
        },
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: 'Product Manager',
          subtitle: '',
          subtitle1: 'Company Name',
          subtitle2: 'June 2014 - Present',
          paragraph: '<ul><li>Worked to improve existing products based on customer evaluations and needs. </li><li>Led collaboration meetings to develop key processes for creation of new products. </li><li>Successfully prioritized product requirements and set realistic expectations inr <li>regards to development and timeline. </li><li>Tested product usability with UX research team. </li><li>Identified failures and successes of a product, using them as a springboard for future development goals. </li></ul>',
        },
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          title: 'Assistant Product Manager',
          subtitle: '',
          subtitle1: 'Company Name',
          subtitle2: 'June 2014 - Present',
          paragraph: '<ul><li>Assisted Senior Product Manager with all tasks related to the successful launching of products. </li><li>Collected and analyzed user feedback and provided superiors with detailed reports. </li><li>Researched market for unmet needs. </li></ul>',
        },
      ],
    },
    project: {
      isShow: false,
      name: 'PROJECT',
      list: [
        {
          isShow: false,
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
          paragraph: '<p>Tool | Agile Coaching, Scrum, Project Budgeting, Strategic Planning, Subcontractor, Management</p><p>Language | English (fluent), Mandarin (native)</p><p>Personal Interest | Music, Travel, Reading</p>',
        },
      ],
    },
    certificate: {
      isShow: false,
      name: 'CERTIFICATE',
      list: [
        {
          isShow: false,
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
          title: 'Degree Title',
          subtitle: 'Institution',
          subtitle1: '',
          subtitle2: '',
          paragraph: '<p>Graduated / Time</p><p>City, Country</p>',
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
          paragraph: '<p>+4470 1234 5678</p><p>example@email.co.uk</p><p>City, UK</p>',
        },
      ],
    },
    social: {
      isShow: true,
      name: 'SOCIAL MEDIA',
      list: [
        {
          isShow: true,
          isCollapsed: false,
          isEditing: false,
          type: 'LinkedIn',
          link: 'https://www.linkedin.com/',
        },
      ],
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
