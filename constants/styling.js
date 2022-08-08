import COLORS from './colors';
import { stylingTrigger } from './triggers';
import { getBasicFormat } from './utils';

/* THEMES */
const THEMES = [
  {
    name: 'Classic',
    body: 'classic',
  },
  {
    name: 'Modern',
    body: 'modern',
  },
];

/* HEADERS */
const HEADERS = [
  {
    name: 'Center',
    body: 'center',
  },
  {
    name: 'Side By Side',
    body: 'sidebyside',
  },
];

function getStylingFormat({
  tag,
  object: { name, body, icon = () => null },
  color,
}) {
  const char = `${stylingTrigger}${tag} ${body}`;
  return {
    ...getBasicFormat(name, char, body),
    getIcon: icon,
    color,
    type: tag,
  };
}

function getStylingsFormat(tag, objects, color) {
  return objects.map((o) =>
    getStylingFormat({
      tag,
      object: o,
      color,
    })
  );
}

// list of all resume theme names, contents, and properties
export const getStyling = () => ({
  theme: getStylingsFormat('theme', THEMES, COLORS.redOrange),
  headers: getStylingsFormat('headers', HEADERS, COLORS.orange),
});

// initial theme state
export const getDefaultStyling = () => {
  const styling = getStyling();
  return {
    theme: styling.theme[0],
    headers: styling.headers[0],
  };
};

// initial theme state in plaintext
export const getDefaultStylingText = () => {
  const { theme, headers } = getDefaultStyling();
  return `${theme.char}\n${headers.char}`;
};

export const isValidStyling = (key, value) => {
  const styling = getStyling();
  if (key in styling) {
    return styling[key].find((style) => style.key === value.toLowerCase());
  }
  return undefined;
};
