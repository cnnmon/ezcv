import { getEmptyFields } from "../Section";
import { getKeyValuePair } from "../Section/utils";

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
    const {title, subtitle, date, description, other} = f;
    return !title && !subtitle && !date && !description && other.length < 1
  }

  function pushSectionToState(key, value, text) {
    const currentSection = state[state.length - 1]
    const currentBody = currentSection.body;
    const currentFields = currentBody[currentBody.length - 1]
    if (key in getEmptyFields(currentSection.header)) {
      if (key === "title" && !isCurrentFieldsEmpty(currentFields)) {
        // If title & last fields is not empty
        const emptyFields = getEmptyFields(currentSection.header)
        emptyFields.title = value
        currentBody.push(emptyFields);
      } else {
        currentFields[key] = value;
      }
    } else {
      currentFields.other.push(text.trim())
    }
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    const trimmedLine = line.substring(1);
    switch (line[0]) {
      case ">":
        const { key, value } = getKeyValuePair(trimmedLine)
        pushSectionToState(key, value, trimmedLine)
        break;
      case "/":
        const currentSection = state[state.length - 1];
        const isCurrentSectionEmpty = currentSection.header !== "" && currentSection.body.length > 0
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
        break;
    }
  }
  return state;
}
