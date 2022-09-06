import COLORS from './colors';
import { stylingTrigger } from './triggers';

export const ALIGNMENT = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
};

const ONE_COLUMN_THEMES = [
  {
    name: 'Classic',
    body: 'classic',
    color: COLORS.green,
    image: 'style_theme_classic.png',
    description: 'Maximize information cleanly.',
  },
  {
    name: 'Modern',
    body: 'modern',
    color: COLORS.teal,
    image: 'style_theme_modern.png',
    description: 'Open and readable.',
  },
  /*
  {
    name: 'Minimalist',
    body: 'minimalist',
    color: COLORS.blue,
    image: 'style_theme_minimalist.png',
    description: 'Roomy and calm.',
  },
  {
    name: 'Elegant',
    body: 'elegant',
    color: COLORS.purple,
    image: 'style_theme_elegant.png',
    description: 'Pleasing to the eye.',
  },
  */
];

const TWO_COLUMN_THEMES = [
  {
    name: 'Right-Handed',
    body: 'righthanded',
    color: COLORS.redOrange,
    image: 'style_theme_right_handed.png',
    description: `Right-centric.`,
    alignment: ALIGNMENT.RIGHT,
  },
  {
    name: 'Left-Handed',
    body: 'lefthanded',
    color: COLORS.red,
    image: 'style_theme_left_handed.png',
    description: `Left-centric.`,
    alignment: ALIGNMENT.LEFT,
  },
];

export const ALL_STYLING = {
  theme: {
    title: 'Main Style',
    objects: [...ONE_COLUMN_THEMES, ...TWO_COLUMN_THEMES],
  },
};

function getStylingFormat({
  tag,
  object: { name, body, icon = () => null, ...other },
}) {
  const char = `${stylingTrigger}${tag} ${body}`;
  return {
    name,
    char,
    key: body,
    getIcon: icon,
    type: tag,
    ...other,
  };
}

function getStylingsFormat(tag, objects) {
  return objects.map((o, index) =>
    getStylingFormat({
      tag,
      object: o,
      key: `${index + 1}`,
    })
  );
}

// list of all resume theme names, contents, and properties
export const getStyling = () => {
  const styling = { ...ALL_STYLING };
  const keys = Object.keys(styling);

  for (let i = 0; i < keys.length; i += 1) {
    const k = keys[i];
    const { objects } = styling[k];
    const v = getStylingsFormat(k, objects);
    styling[k] = v;
  }

  return styling;
};

// initial theme state
export const getDefaultStyling = () => {
  const styling = getStyling();
  const keys = Object.keys(styling);

  for (let i = 0; i < keys.length; i += 1) {
    const k = keys[i];
    const v = styling[k][0];
    styling[k] = v;
  }

  return styling;
};

// initial theme state in plaintext
export const getDefaultStylingText = () => {
  const styling = getDefaultStyling();
  const chars = Object.keys(styling).flatMap((key) => styling[key].char);

  return chars.join('\n');
};

export const isValidStyling = (k, value) => {
  const styling = getStyling();
  if (k in styling) {
    return styling[k].find(({ key }) => key === value.toLowerCase());
  }
  return undefined;
};
