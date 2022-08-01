import { COLORS, stylingTrigger } from "./index";
import { getBasicFormat } from "./utils";

/* THEMES */
const THEMES = [
  {
    name: "Classic Theme",
    body: "classic",
  },
  {
    name: "Modern Theme",
    body: "modern",
  },
]

/* HEADERS */
const HEADERS = [
  {
    name: "Center Header",
    body: "center",
  },
  {
    name: "Side By Side Header",
    body: "sidebyside",
  },
]

/* STYLING */
const STYLING = {
  theme: THEMES,
  headers: HEADERS,
}

// initial theme state
export const getDefaultStyling = () => ({
  theme: THEMES[0].body,
  headers: HEADERS[0].body,
});

function getStylingFormat({ tag, object: { name, body, icon = () => null }, color, index }) {
  const char = `${stylingTrigger}${tag} ${body}`;

  return ({
    ...getBasicFormat(name, char, index),
    getIcon: icon,
    color: color,
    type: tag,
  });
}

function getStylingsFormat(tag, objects, color) {
  return objects.map((o, index) => getStylingFormat({
    tag: tag,
    object: o,
    color: color,
    index: index,
  }));
}

// list of all resume theme names, contents, and properties
export const getStyling = () => [
  ...getStylingsFormat("theme", THEMES, COLORS.redOrange),
  ...getStylingsFormat("headers", HEADERS, COLORS.orange),
];

export const isValidStyling = (key, value) => {
  if (key in STYLING) {
    return STYLING[key].find(({ body }) => body === value.toLowerCase());
  }
  return false;
}
