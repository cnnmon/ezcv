import {
  RiMoonClearFill,
  RiBriefcase2Fill,
  RiRainbowFill,
  RiGroupFill,
  RiStarSmileFill,
  RiAwardFill,
  RiToolsFill,
} from 'react-icons/ri';
import COLORS from './colors';
import { getDefaultStylingText } from './styling';
import { trigger } from './triggers';
import { getMultiSectionDefaultFieldsString, getBasicFormat } from './utils';

/* SECTIONS */
const EMPTY_SECTION = {
  name: 'Empty Section',
  body: [
    {
      title: 'This is your subsection!',
      subtitle: 'subtitle',
      date: 'Date #1 - Date #2',
      description: 'description',
      other: ['Write something here.', '- Maybe use bullet points!'],
    },
    {
      title: 'Another Subsection',
      date: 'Date #3',
      other: ["Remove or add as much information as you'd like."],
    },
  ],
};

const SECTIONS = [
  {
    name: 'Name',
    body: [
      {
        other: [
          'mailto:firstlast@gmail.com',
          'yourwebsite.com',
          '(111)-222-3333',
        ],
      },
    ],
    icon: RiStarSmileFill,
    color: COLORS.redOrange,
    type: 'header',
  },
  {
    name: 'Education',
    body: [
      {
        title: 'B.A. Celtic Studies',
        subtitle: 'University of California, Berkeley',
        date: 'Aug 2016 - Expected May 2020',
        other: [
          'GPA: 0.0/4.0',
          'Relevant Coursework: Irish Literature, Celtic Mythology, Comparative and Historical Linguistics, Scandinavian Folklore',
        ],
      },
    ],
    icon: RiMoonClearFill,
    color: COLORS.orange,
  },
  {
    name: 'Experience',
    body: [
      {
        title: 'Clown Tools Residency',
        subtitle: 'The Circus of America',
        date: 'May 2022 - Present',
        description: 'Washington D.C.',
        other: [
          '- Clown Infra Team',
          '- Optimized happiness efficiency by 99%',
        ],
      },
      {
        title: 'Clown Apprentice',
        subtitle: 'The Circus of Canada',
        date: 'May 2020 - Aug 2020',
        description: 'Toronto',
        other: [
          '- Designed delightful experiences for children',
          '- Lead a team organizing balloons into animals',
        ],
      },
    ],
    icon: RiBriefcase2Fill,
    color: COLORS.yellowGreen,
  },
  {
    name: 'Projects',
    body: [
      {
        title: 'Facebook',
        description: 'www.facebook.com',
        date: 'Feb 2004 - Present',
        other: ['Small social media app for college students.'],
      },
      {
        title: 'Google',
        description: 'www.google.com',
        date: 'Sep 1998 - Present',
        other: ['Small web-searching website.'],
      },
    ],
    icon: RiRainbowFill,
    color: COLORS.lightGreen,
  },
  {
    name: 'Honors',
    body: [
      {
        title: 'National Honor Society',
        subtitle: 'National Society of High Schools',
        date: 'May 2020',
        other: [],
      },
      {
        title: 'Birth Date',
        subtitle: 'Parents',
        date: 'July 2002',
        other: [],
      },
    ],
    icon: RiAwardFill,
    color: COLORS.green,
  },
  {
    name: 'Organizations',
    body: [
      {
        title: 'Cal Hacks',
        subtitle: 'University of California, Berkeley',
        date: 'Aug 2020 - Present',
        other: ['Creating hackathons. Look out for 9.0!'],
      },
      {
        title: 'Blueprint',
        subtitle: 'University of California, Berkeley',
        date: 'July 2021 - Present',
        other: ['Building for nonprofits.'],
      },
    ],
    icon: RiGroupFill,
    color: COLORS.blue,
  },
  {
    name: 'Skills',
    body: [
      {
        other: [
          'Code: JavaScript, Python, Java, C#, C',
          'Frameworks/Tools: React, NodeJS, Unity, Git',
          'Design: Figma, Photoshop, InDesign',
        ],
      },
    ],
    icon: RiToolsFill,
    color: COLORS.purple,
  },
];

// empty subsection contents
// for text parsing
export const getEmptySubsection = () => ({
  section: '',
  title: '',
  subtitle: '',
  description: '',
  date: '',
  other: [],
});

function getSectionsFormat(
  { name, body, type = 'section', icon = () => null, color = undefined },
  index
) {
  const char = `${trigger}${type} ${name}\n\n${getMultiSectionDefaultFieldsString(
    body
  )}`;
  return {
    ...getBasicFormat(name, char, index),
    getIcon: icon,
    color,
    type,
  };
}

// empty section contents
export const getEmptySection = () => getSectionsFormat(EMPTY_SECTION);

// list of default section names, contents, and properties
export const getSections = () =>
  SECTIONS.map((s, index) => getSectionsFormat(s, index));

// default states
export const getDefaultText = () =>
  `${getDefaultStylingText()}\n\n${getSections()[0].char}\n`;
