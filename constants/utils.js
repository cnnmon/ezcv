
import { sectionsTrigger, fieldsTrigger } from "../constants";

function getDefaultFieldsString(fields) {
  const keys = Object.keys(fields);
  let defaultFields = "";

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (key === "other") {
      const other = fields[key];
      // Iterate through all "other" lines
      for (let j = 0; j < other.length; j += 1) {
        defaultFields += `${other[j]}${j < other.length - 1 ? "\n" : ""}`;
      }
    } else {
      /*
        Ensures autocomplete leaves you on the last generated line
        The library I'm using for the autocomplete textbox places an empty space after autocompleting
        This promotes good formatting given the empty space (encourages people to go to a blank line before a new section)
      */
      const isOtherEmpty = fields.other.length < 1;
      const isLastKey = i < keys.length - 2 || !isOtherEmpty;
      const value = fields[key];

      defaultFields += `${fieldsTrigger}${key} ${value}${
        isLastKey ? "\n" : ""
      }`;
    }
  }

  return defaultFields;
}

export function getMultiSectionDefaultFieldsString(fields) {
  let result = "";
  // Convert each object in fields to a string, separated by two line breaks
  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i];
    result += `${getDefaultFieldsString(field)}${
      i < fields.length - 1 ? "\n\n" : ""
    }`;
  }
  return result;
}

export function getSectionsFormat(key, fields, rest) {
  return ({
    name: key,
    char: `${sectionsTrigger}${key}\n${getMultiSectionDefaultFieldsString(fields)}`,
    ...rest,
  });
}

export function getFieldsFormat(key, rest, trigger = fieldsTrigger) {
  return ({
    name: key,
    char: `${trigger}${key} ${key}`,
    ...rest,
  });
}
