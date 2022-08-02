import { trigger } from './triggers';
import { getBasicFormat } from './utils';

/* FIELDS */
const FIELDS = [
  {
    name: 'section',
    body: 'New Section',
    title: 'Section', // displays in autocomplete
    description: 'Start a new section', // displays in autcoomplete
  },
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
    description,
  };
}

// used by autocomplete; default field names, descriptions, contents
const getFields = () => FIELDS.map((f, index) => getFieldsFormat(f, index));

export default getFields;
