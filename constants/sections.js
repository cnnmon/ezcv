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

function getDefaultFieldsString(fields) {
  const keys = Object.keys(fields);
  let defaultFields = '';

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (key === 'style') {
      const style = fields[key];
      for (let j = 0; j < style.length; j += 1) {
        defaultFields += `${trigger}${key} ${style[j]}\n`;
      }
    } else if (key === 'other') {
      const other = fields[key];
      // Iterate through all "other" lines
      for (let j = 0; j < other.length; j += 1) {
        defaultFields += `${other[j]}${j < other.length - 1 ? '\n' : ''}`;
      }
    } else {
      /*
        Ensures autocomplete leaves you on the last generated line
        The library I'm using for the autocomplete textbox places an empty space after autocompleting
        This promotes good formatting given the empty space (encourages people to go to a blank line before a new section)
      */
      const isOtherEmpty = fields.other.length < 1;
      const isLastKey = i < keys.length - 2 || !isOtherEmpty;
      const value = fields[key];

      defaultFields += `${trigger}${key} ${value}${isLastKey ? '\n' : ''}`;
    }
  }

  return defaultFields;
}

function getMultiSectionDefaultFieldsString(fields) {
  let result = '';
  // Convert each object in fields to a string, separated by two line breaks
  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i];
    result += `${getDefaultFieldsString(field)}${
      i < fields.length - 1 ? '\n\n' : ''
    }`;
  }
  return result;
}

export const TYPES = {
  HEADER: 'header',
  SECTION: 'section',
  // two column format
  SECTION1: 'section1',
  SECTION2: 'section2',
};

/* SECTIONS */
const EXAMPLE_SECTION = {
  name: 'Example Section',
  placeholder: 'Custom',
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
      other: [
        "- Remove as much information as you'd like.",
        "- Add as much information as you'd like.",
      ],
    },
  ],
  type: TYPES.SECTION1,
};

const SECTIONS = [
  {
    name: 'John Doe',
    placeholder: 'Header',
    body: [
      {
        other: [
          'mailto:firstlast@gmail.com',
          'yourwebsite.com',
          '(111) 222-3333',
        ],
      },
    ],
    icon: RiStarSmileFill,
    color: COLORS.redOrange,
    type: TYPES.HEADER,
  },
  {
    name: 'Summary',
    body: [
      {
        other: [
          `I am a [descriptor] and [descriptor] [position title] looking for an opportunity to [whatever you're looking for].`,
        ],
      },
    ],
    icon: RiToolsFill,
    color: COLORS.orange,
    type: TYPES.SECTION1,
  },
  {
    name: 'Education',
    body: [
      {
        title: 'Degree & Major(s)',
        subtitle: 'Your University',
        date: 'Date #1 - Date #2',
        other: [
          'GPA: [your gpa]/4.0',
          `Relevant Coursework: [briefly list relevant courses to the positions you're applying to; don't have to write full/accurate course names].`,
        ],
      },
    ],
    icon: RiMoonClearFill,
    color: COLORS.yellowGreen,
    type: TYPES.SECTION2,
  },
  {
    name: 'Experience',
    body: [
      {
        title: 'Position Title',
        subtitle: 'Company',
        description: 'Location',
        date: 'Date #1 - Date #2',
        other: [
          '- [what did you do at the company? include as many numbers and metrics as you can]',
          '- [what did you learn? what tools did you use and gain proficiency at?]',
          '- [what initiatives did you take?]',
        ],
      },
      {
        title: 'Position Title',
        subtitle: 'Company',
        description: 'Location',
        date: 'Date #1 - Date #2',
        other: [
          '- [what did you do at the company? include as many numbers and metrics as you can]',
          '- [what did you learn? what tools did you use and gain proficiency at?]',
          '- [what initiatives did you take?]',
        ],
      },
    ],
    icon: RiBriefcase2Fill,
    color: COLORS.green,
    type: TYPES.SECTION1,
  },
  {
    name: 'Projects',
    body: [
      {
        title: 'Project Name',
        description: '[link the project]',
        date: 'Date #1 - Date #2',
        other: [
          '[what was the project, what did you do for it, and why was it significant?]',
        ],
      },
      {
        title: 'Project Name',
        description: '[link the project]',
        date: 'Date #1 - Date #2',
        other: [
          '[what was the project, what did you do for it, and why was it significant?]',
        ],
      },
    ],
    icon: RiRainbowFill,
    color: COLORS.teal,
    type: TYPES.SECTION1,
  },
  {
    name: 'Activities',
    body: [
      {
        title: 'Organization Name',
        subtitle: '[your role in the organization]',
        description: '[any extra affiliation, ex. university]',
        date: 'Date #1 - Date #2',
        other: [
          '[what was the organization, what did you do for it, and why was it significant?]',
        ],
      },
      {
        title: 'Organization Name',
        subtitle: '[your role in the organization]',
        description: '[any extra affiliation, ex. university]',
        date: 'Date #1 - Date #2',
        other: [
          '[what was the organization, what did you do for it, and why was it significant?]',
        ],
      },
    ],
    icon: RiGroupFill,
    color: COLORS.blue,
    type: TYPES.SECTION1,
  },
  {
    name: 'Honors',
    body: [
      {
        title: 'Award Name',
        subtitle: '[who gave you this award?]',
        date: 'Date Awarded',
        other: [],
      },
      {
        title: 'Award Name',
        subtitle: '[who gave you this award?]',
        date: 'Date Awarded',
        other: [],
      },
    ],
    icon: RiAwardFill,
    color: COLORS.lavender,
    type: TYPES.SECTION2,
  },
  {
    name: 'Skills',
    body: [
      {
        other: [
          'Code: [what programming languages/frameworks do you know? ex. JavaScript, Python, Java]',
          'Design: [what design tools do you know?]',
          '[what miscellaneous tools relevant to your position do you know? list them as well.]',
        ],
      },
    ],
    icon: RiToolsFill,
    color: COLORS.purple,
    type: TYPES.SECTION2,
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

export function formatIntoSection({
  name,
  body,
  placeholder,
  index,
  type = TYPES.SECTION1,
  icon = () => null,
  color = undefined,
}) {
  const char = `${trigger}${type} ${name}\n\n${getMultiSectionDefaultFieldsString(
    body
  )}`;
  return {
    key: index,
    name,
    body,
    char,
    placeholder,
    getIcon: icon,
    color,
    type,
  };
}

// empty section contents
export const getExampleSection = () => formatIntoSection(EXAMPLE_SECTION);

export const getDefaultSections = () =>
  SECTIONS.map((section, index) => formatIntoSection({ ...section, index }));

// default states
export const getDefaultText = () =>
  // const text = `${getDefaultStylingText()}\n\n${sections[0].char}\n\n`;
  '';

export const formatSubmittedResume = (data) =>
  SECTIONS.map((section, index) => {
    if (data && data !== {}) {
      const { name, placeholder, body, ...rest } = section;
      const key = (placeholder || name).toLowerCase();

      if (section.type === TYPES.HEADER) {
        const contact = [];

        if (data.header) {
          contact.concat(data.header.split('\n'));
        }

        if (data.email) {
          contact.push(data.email);
        }

        if (data.phone) {
          contact.push(data.phone);
        }

        return formatIntoSection({
          name: data.name,
          body: [
            {
              ...section.body[0],
              ...(contact ? { other: contact } : null),
            },
          ],
          placeholder,
          index,
          ...rest,
        });
      }

      if (data[key]) {
        return formatIntoSection({
          name,
          body: [
            {
              ...section.body[0],
              other: data[key].split('\n'),
            },
          ],
          placeholder,
          index,
          ...rest,
        });
      }
    }

    return formatIntoSection({ ...section, index });
  });

export const getSection = (i, sections) => sections[i];
