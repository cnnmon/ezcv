import { trigger } from './triggers';

export const EMPTY_SUBSECTION = {
  title: '',
  date: '',
  description: '',
  other: [],
};

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
  const char = `${trigger}${name.toUpperCase()} ${body}`;
  return {
    key: index,
    name,
    char,
    title,
    body,
    description,
  };
}

export const getFields = () =>
  FIELDS.map((f, index) => getFieldsFormat(f, index));
