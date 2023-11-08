import { STYLING, SECTIONS, TRIGGERS } from '../constants';

function getFirst(text, symbol, defaultValue) {
  const index = text.indexOf(symbol);
  return index === -1 ? defaultValue : index;
}

function getFirstSpace(text) {
  return getFirst(text, ' ', -1);
}

export function getKeyValuePair(text) {
  const spaceIndex = getFirstSpace(text);
  const key = text.substring(0, spaceIndex);
  const value = text.substring(spaceIndex + 1);

  if (spaceIndex === -1) {
    return { key: value, value: key };
  }

  return { key, value };
}

// Parses plaintext from Textbox into usable format for Resume
// Type: [{ header: "experience", body: [{key: "title", value: "professional clown"}, ...] }, ...]
// Sets styling if it finds it
export function parseIntoContent(text, styling = {}, setStyling = () => null) {
  const lines = text.split(/\r?\n/);
  const state = [
    {
      header: '',
      body: [SECTIONS.getEmptySubsection()],
      type: SECTIONS.TYPES.SECTION,
    },
  ];

  const style = { ...styling };

  function isCurrentFieldsEmpty(f) {
    const { title, subtitle, date, description, other } = f;

    const isEmpty =
      !title && !subtitle && !date && !description && other.length < 1;

    return isEmpty;
  }

  function isCurrentSectionEmpty(s) {
    const { header, body } = s;
    const isEmpty =
      !header && body.length === 1 && isCurrentFieldsEmpty(body[0]);
    return isEmpty;
  }

  function pushSectionToState(t, key = null, value = null) {
    const currentSection = state[state.length - 1];
    const currentBody = currentSection.body;
    const currentFields = currentBody[currentBody.length - 1];
    const emptySubsection = SECTIONS.getEmptySubsection(currentSection.header);

    const k = key && key.toLowerCase();

    if (k && k in emptySubsection) {
      if (k === 'title' && !isCurrentFieldsEmpty(currentFields)) {
        // If title & last fields is not empty
        const emptyFields = emptySubsection;
        emptyFields.title = value;
        currentBody.push(emptyFields);
      } else if (k === 'style') {
        currentFields.style.push(value.trim());
      } else {
        currentFields[k] = value;
      }
    } else {
      console.log(currentBody);
      currentFields.other.push(t.trim());
    }
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    const trimmedLine = line.substring(1).trim();
    const { key, value } = getKeyValuePair(trimmedLine);
    const currentSection = state[state.length - 1];

    // check to see symbol, if any
    switch (line[0]) {
      case TRIGGERS.trigger:
        // if HEADER or SECTION
        if (Object.values(SECTIONS.TYPES).includes(key)) {
          if (key === SECTIONS.TYPES.PAGEBREAK) {
            state.push({
              header: '',
              body: [
                {
                  ...SECTIONS.getEmptySubsection(),
                  type: SECTIONS.TYPES.PAGEBREAK,
                },
              ],
              type: key,
            });
            break;
          }

          // sets key -> k to ensure "header" gets picked up
          if (!isCurrentSectionEmpty(currentSection)) {
            state.push({
              header: value,
              body: [SECTIONS.getEmptySubsection()],
              type: key,
            });
            break;
          }

          currentSection.header = value;
          currentSection.type = key;
          break;
        }
        pushSectionToState(trimmedLine, key, value);
        break;
      case TRIGGERS.stylingTrigger:
        // eslint-disable-next-line no-case-declarations
        const validStyle = STYLING.isValidStyling(key, value);
        if (validStyle !== undefined) {
          style[key] = validStyle;
        }
        break;
      case TRIGGERS.commentTrigger:
        break;
      default:
        if (line.length > 0) {
          pushSectionToState(line);
        }
        break;
    }
  }

  setStyling(style);
  return { lines, content: state };
}

export function partition(xs, pred) {
  const trues = [];
  const falses = [];
  xs.forEach((x) => {
    if (pred(x)) {
      trues.push(x);
    } else {
      falses.push(x);
    }
  });
  return [trues, falses];
}
