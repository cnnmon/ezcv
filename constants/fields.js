import { trigger } from './triggers';

/* FIELDS */
const FIELDS = [
  {
    name: 'title',
    body: 'New Title',
    title: 'Title',
    description: 'Start a new subsection (ex. company stint).',
  },
  {
    name: 'subtitle',
    body: 'Subtitle',
    title: 'Subtitle',
    description: 'Defines the subtitle (ex. job title) of the subsection.',
  },
  {
    name: 'description',
    body: 'Any other relevant information',
    title: 'Description',
    description:
      'Define the description (ex. location, affiliations) of the subsection.',
  },
  {
    name: 'date',
    body: 'Date #1 - Date #2',
    title: 'Date',
    description: 'Defines the time period of the subsection.',
  },
];

function getFieldsFormat(content, index) {
  const { name, body } = content;
  const char = `${trigger}${name} ${body}`;
  return {
    key: index,
    char,
    ...content,
  };
}

// eslint-disable-next-line import/prefer-default-export
export const getFields = () =>
  FIELDS.map((f, index) => getFieldsFormat(f, index));
