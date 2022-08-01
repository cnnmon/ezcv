import { isValidStyling, getDefaultStyling, getEmptySubsection, mobileBreakpoint, stylingTrigger, trigger } from "../constants";
import { useMediaQuery } from 'react-responsive';

function getFirst(text, symbol, defaultValue) {
  const index = text.indexOf(symbol);
  return index === -1 ? defaultValue : index;
}

function getFirstSpace(text) {
  return getFirst(text, " ", 1);
}

export function getKeyValuePair(text) {
  const spaceIndex = getFirstSpace(text);
  const key = text.substring(0, spaceIndex);
  const value = text.substring(spaceIndex + 1);
  return { key, value };
}

export function getLastImportantSymbol(text, startingPoint) {
  return Math.max(
    text.lastIndexOf("/", text.lastIndexOf("/", startingPoint + 1) - 1),
    text.lastIndexOf(">", startingPoint)
  );
}

export function useIsMobile() { // TODO: Fix to accurately check on start
  const isMobile = useMediaQuery({ query: `(max-width: ${mobileBreakpoint})` });
  return isMobile;
}

// Parses plaintext from Textbox into usable format for Resume
// Type: [{ header: "experience", body: [{key: "title", value: "professional clown"}, ...] }, ...]
// Sets styling if it finds it
export function parseIntoContent(text, styling, setStyling) {
  const lines = text.split(/\r?\n/);
  const state = [{ header: "", body: [getEmptySubsection()], type: "section" }];

  function isCurrentSectionEmpty(s) {
    const { header, body } = s;
    const isEmpty = !header && body.length === 1 && isCurrentFieldsEmpty(body[0]);
    return isEmpty;
  }

  function isCurrentFieldsEmpty(f) {
    const { title, subtitle, date, description, other } = f;
    const isEmpty = !title && !subtitle && !date && !description && other.length < 1;
    return isEmpty;
  }

  function pushSectionToState(t, key = null, value = null) {
    const currentSection = state[state.length - 1];
    const currentBody = currentSection.body;
    const currentFields = currentBody[currentBody.length - 1];
    if (key && value && key.toLowerCase() in getEmptySubsection(currentSection.header)) {
      if (key === "title" && !isCurrentFieldsEmpty(currentFields)) {
        // If title & last fields is not empty
        const emptyFields = getEmptySubsection(currentSection.header);
        emptyFields.title = value;
        currentBody.push(emptyFields);
      } else if (key === "style") {
        currentFields.style.push(value.trim());
      } else {
        currentFields[key] = value;
      }
    } else {
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
      case trigger:
        if (key === "section" || key === "header") {
          // sets key -> k to ensure "header" gets picked up
          if (!isCurrentSectionEmpty(currentSection)) {
            state.push({
              header: value,
              body: [getEmptySubsection()],
              type: key,
            });
          } else {
            currentSection.header = value;
            currentSection.type = key;
          }
        } else {
          pushSectionToState(trimmedLine, key, value);
        }
        break;
      case stylingTrigger:
        if (isValidStyling(key, value)) {
          styling[key] = value;
          setStyling(styling);
        }
        break;
      default:
        if (line.length > 0) {
          pushSectionToState(line);
        }
        break;
    }
  }

  return { lines, content: state };
}
