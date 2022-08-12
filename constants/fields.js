import { trigger } from './triggers';
import { getBasicFormat } from './utils';

const SECTION = [
  {
    name: 'section',
    body: 'New Section',
    title: 'Section', // displays in autocomplete
    description: 'Start a new section', // displays in autcoomplete
  },
];

/* FIELDS */
const FIELDS = [
  {
    name: 'title',
    body: 'New Title',
    title: 'Title',
    description: 'Title a new subsection inside the section',
  },
  {
    name: 'subtitle',
    body: 'Subtitle',
    title: 'Subtitle',
    description: 'Defines the subtitle (2nd piece of title) of the subsection',
  },
  {
    name: 'description',
    body: 'Any other relevant information',
    title: 'Description',
    description:
      'Define the description (3rd piece of title) of the subsection',
  },
  {
    name: 'date',
    body: 'Date #1 - Date #2',
    title: 'Date',
    description: 'Defines the time period of the subsection',
  },
];

function getFieldsFormat({ name, body, title, description }, index) {
  const char = `${trigger}${name} ${body}`;
  return {
    ...getBasicFormat(name, char, index),
    title,
    body,
    description,
  };
}

export const getFields = () =>
  FIELDS.map((f, index) => getFieldsFormat(f, index));

const getSection = () => SECTION.map((f, index) => getFieldsFormat(f, index));

// used by autocomplete; default field names, descriptions, contents
export const getAllFields = () => [...getFields(), getSection()];
