import COLORS from './colors';
import { stylingTrigger } from './triggers';

export const ALIGNMENT = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
};

export const STYLING = {
  themes: [
    {
      name: 'Classic',
      body: 'classic',
      image: 'style_theme_classic.png',
      description: 'Maximize information cleanly.',
    },
    {
      name: 'Modern',
      body: 'modern',
      image: 'style_theme_modern.png',
      description: 'Open and readable.',
    },
    {
      name: 'Minimalist',
      body: 'minimalist',
      image: 'style_theme_minimalist.png',
      description: 'Roomy and calm.',
    },
    {
      name: 'Simple',
      body: 'simple',
      image: 'style_theme_tall.png',
      description: 'Packed together and vertical.',
    },
  ],
  fonts: [
    {
      name: 'Roboto',
      body: 'roboto',
      image: 'style_font_roboto.png',
      description: `Simple and readable.`,
    },
    {
      name: 'Raleway',
      body: 'raleway',
      image: 'style_font_raleway.png',
      description: `A little lighter.`,
    },
    {
      name: 'Computer Modern',
      body: 'computermodern',
      image: 'style_font_computermodern.png',
      description: `For LaTeX enthusiasts.`,
    },
    {
      name: 'Inconsolata',
      body: 'inconsolata',
      image: 'style_font_inconsolata.png',
      description: `Unique and techy.`,
    },
    {
      name: 'Unna',
      body: 'unna',
      image: 'style_font_unna.png',
      description: `A classier Times New Roman.`,
    },
  ],
  columns: [
    {
      name: 'One Column',
      body: 'onecolumn',
      image: 'style_theme_one_column.png',
      description: `Reliable one column format.`,
      alignment: ALIGNMENT.CENTER,
      color: COLORS.redOrange,
    },
    {
      name: 'Right-Handed',
      body: 'righthanded',
      image: 'style_theme_right_handed.png',
      description: `Two column, where right side is bigger.`,
      alignment: ALIGNMENT.RIGHT,
      color: COLORS.purple,
    },
    {
      name: 'Left-Handed',
      body: 'lefthanded',
      image: 'style_theme_left_handed.png',
      description: `Two column, where left side is bigger.`,
      alignment: ALIGNMENT.LEFT,
      color: COLORS.blue,
    },
  ],
  mode: [
    {
      name: 'Light Mode',
      body: 'light',
      image: 'style_mode_light.png',
      description: `Lights on.`,
      alignment: ALIGNMENT.CENTER,
    },
    {
      name: 'Dark Mode',
      body: 'dark',
      image: 'style_mode_dark.png',
      description: `Lights out.`,
      alignment: ALIGNMENT.CENTER,
      color: COLORS.darkBrown,
    },
  ],
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
  const styling = { ...STYLING };
  const keys = Object.keys(styling);

  for (let i = 0; i < keys.length; i += 1) {
    const k = keys[i];
    const v = getStylingsFormat(k, styling[k]);
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
