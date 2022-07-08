import React from "react";

export function getHeader(text) {
  return <h1>{text}</h1>;
}

export function getDefaultFieldsString(fields) {
  const keys = Object.keys(fields);
  let defaultFields = "";

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (key === 'other') {
      const other = fields[key]
      for (let j = 0; j < other.length; j += 1) {
        defaultFields += `>${other[j]}${j < other.length - 1 ? "\n" : ""}`;
      }
    } else {
      defaultFields += `>${key} ${fields[key]}${i < keys.length - 1 ? "\n" : ""}`;
    }
  }

  return defaultFields;
}

function getFirst(text, symbol, defaultValue) {
  const index = text.indexOf(symbol);
  return index === -1 ? defaultValue : index;
}

export function getFirstSpace(text) {
  return getFirst(text, " ", text.length);
}

export function getFirstImportantSymbol(text) {
  const firstGreaterThan = getFirst(text, ">", text.length);
  const firstSlash = getFirst(text, "/", text.length);

  if (firstGreaterThan - firstSlash === 0) {
    return -1;
  }

  return Math.min(firstGreaterThan, firstSlash);
}

export function getLastImportantSymbol(text, startingPoint) {
  return Math.max(
    text.lastIndexOf("/", text.lastIndexOf("/", startingPoint + 1) - 1),
    text.lastIndexOf(">", startingPoint)
  );
}
