import React from "react";

export function getHeader(text) {
  return <h1>{text}</h1>;
}

export function getDefaultFieldsString(fields) {
  const keys = Object.keys(fields);
  let defaultFields = "";

  // assumes last key will always be "other"
  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i];

    defaultFields += `>${key} ${fields[key]}`;
    if (i < keys.length - 2) {
      defaultFields += "\n";
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
