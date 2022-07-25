import { getEmptyFields, sectionsTrigger, fieldsTrigger } from "../constants";

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

export function getTodaysDate() {
  const date = new Date();
  return `${date.toLocaleString("en-us", {
    month: "short",
    year: "numeric",
  })} - Present`;
}

export function getLastImportantSymbol(text, startingPoint) {
  return Math.max(
    text.lastIndexOf("/", text.lastIndexOf("/", startingPoint + 1) - 1),
    text.lastIndexOf(">", startingPoint)
  );
}

// Parses plaintext from Textbox into usable format for Resume
// Type: [{ header: "experience", body: [{key: "title", value: "professional clown"}, ...] }, ...]
export function parseIntoContent(text) {
  const lines = text.split(/\r?\n/);
  const state = [{ header: "", body: [getEmptyFields()] }];

  function isCurrentFieldsEmpty(f) {
    const { title, subtitle, date, description, other } = f;
    return !title && !subtitle && !date && !description && other.length < 1;
  }

  function pushSectionToState(t, key = null, value = null) {
    const currentSection = state[state.length - 1];
    const currentBody = currentSection.body;
    const currentFields = currentBody[currentBody.length - 1];
    if (key && value && key in getEmptyFields(currentSection.header)) {
      if (key === "title" && !isCurrentFieldsEmpty(currentFields)) {
        // If title & last fields is not empty
        const emptyFields = getEmptyFields(currentSection.header);
        emptyFields.title = value;
        currentBody.push(emptyFields);
      } else {
        currentFields[key] = value;
      }
    } else {
      currentFields.other.push(t.trim());
    }
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    const trimmedLine = line.substring(1);
    const { key, value } = getKeyValuePair(trimmedLine);
    const currentSection = state[state.length - 1];
    const isCurrentSectionEmpty =
      currentSection.header !== "" && currentSection.body.length > 0;
    // check to see symbol, if any
    switch (line[0]) {
      case fieldsTrigger:
        pushSectionToState(trimmedLine, key, value);
        break;
      case sectionsTrigger:
        if (isCurrentSectionEmpty) {
          state.push({
            header: trimmedLine,
            body: [getEmptyFields()],
          });
        } else {
          currentSection.header = trimmedLine;
        }
        break;
      default:
        if (line.length > 0) {
          pushSectionToState(line);
        }
        break;
    }
  }
  return state;
}
