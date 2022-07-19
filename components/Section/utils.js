import React from "react";
import { getIntroduction } from "./introduction";
import { getEducation } from "./education";
import { getExperience } from "./experience";
import { getProjects } from "./projects";
import { getHonors } from "./honors";
import { getOrganizations } from "./organizations";
import { getSkills } from "./skills";

// Autocomplete uses name, char, display; Rendering (Resume) uses settings
export const getSections = () => {
  return (
    [
      getIntroduction(),
      getEducation(),
      getExperience(),
      getProjects(),
      getHonors(),
      getOrganizations(),
      getSkills(),
    ]
  )
};

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
  return {key, value}
}

// Converts single list of plaintext lines to lists in lists, representing different sections
export function useMultiSectionBody(body) {
    const state = [];
    const section = [];
    for (let i = 0; i < body.length; i += 1) {
        const text = body[i];
        const { key } = getKeyValuePair(body[i]);
        if (key === "title") {
            // Push all previous lines of text, reset section
            state.push(section.slice())
            section.splice(0, section.length)
            section.push(text)
        } else {
            // If "title" is not the first line in the body, return everything as a single section
            if (i === 0) {
                return [body];
            }
            section.push(text)
        }
    }
    state.push(section)
    return state;
}

function getDefaultFieldsString(fields) {
  const keys = Object.keys(fields);
  let defaultFields = "";

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (key === "other") {
      const other = fields[key];
      // Iterate through all "other" lines
      for (let j = 0; j < other.length; j += 1) {
        defaultFields += `> ${other[j]}${j < other.length - 1 ? "\n" : ""}`;
      }
    } else {
      /*
        Ensures autocomplete leaves you on the last generated line
        The library I'm using for the autocomplete textbox places an empty space after autocompleting
        This promotes good formatting given the empty space (encourages people to go to a blank line before a new section)
      */
      const isOtherEmpty = fields["other"].length < 1
      const isLastKey = i < keys.length - 2 || !isOtherEmpty
      const value = fields[key]

      defaultFields += `>${key} ${value}${
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
    const field = fields[i]
    result += `${getDefaultFieldsString(field)}${i < fields.length - 1 ? "\n\n" : ""}`;
  }
  return result;
}
