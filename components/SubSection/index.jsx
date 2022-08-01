import React from "react";
import { defaultTheme, THEME_STATES, getDefaultStyling } from "../../constants";
import { Classic, Modern } from "./themes";
import { Center, SideBySide } from "./headers";

const HEADERS = {
  center: Center,
  sidebyside: SideBySide,
}

const THEMES = {
  classic: Classic,
  modern: Modern,
}

export default function SubSection({ styling, type, ...props }) {
  const { headers, theme } = styling;

  if (!styling) {
    return null;
  }

  // enlarge/format top section (typically Name)
  if (type === "header") {
    return HEADERS[headers](props);
  }

  return THEMES[theme](props);
}
