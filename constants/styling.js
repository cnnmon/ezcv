import COLORS from './colors';
import { stylingTrigger } from './triggers';

export const ALIGNMENT = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
};

export const STYLING = {
  columns: [
    {
      name: 'One Column',
      body: 'one',
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
      color: COLORS.redOrange,
    },
    {
      name: 'Left-Handed',
      body: 'lefthanded',
      image: 'style_theme_left_handed.png',
      description: `Two column, where left side is bigger.`,
      alignment: ALIGNMENT.LEFT,
      color: COLORS.redOrange,
    },
  ],
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
  headers: [
    {
      name: 'Center',
      body: 'center',
      image: 'style_header_center.png',
      description: `Centered in the middle with dots.`,
    },
    {
      name: 'Right-Handed',
      body: 'righthanded',
      image: 'style_header_right_handed.png',
      description: `Two column, where right side is bigger.`,
    },
    {
      name: 'Left-Handed',
      body: 'lefthanded',
      image: 'style_header_right_handed.png',
      description: `Two column, where left side is bigger.`,
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
      name: 'Open Sans',
      body: 'opensans',
      image: 'style_font_opensans.png',
      description: `A little lighter.`,
    },
    {
      name: 'Computer Modern',
      body: 'computermodern',
      image: 'style_font_computermodern.png',
      description: `For those who switched over from Latex.`,
    },
    {
      name: 'Space Mono',
      body: 'spacemono',
      image: 'style_font_spacemono.png',
      description: `Unique and tech-y.`,
    },
    {
      name: 'Times New Roman',
      body: 'timesnewroman',
      image: 'style_font_timesnewroman.png',
      description: `Elegant and classic.`,
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
