import React from "react";
import styles, {
  getSectionHeader,
  getInlineItems,
  getSectionTitle,
  getDatedSection,
  getItems,
} from "./styles";

export function getEmptyFields() {
  return {
    style: "",
    title: "",
    subtitle: "",
    description: "",
    date: "",
    other: [],
  };
}

export default function Section({ header, body }) {
  const getBody = (section, key) => {
    const { title, subtitle, description, date, other, style } = section;
    const tokens = style.split(" ");

    const isFirst = key === 0;
    const isCenter = tokens.includes("center");
    const isInline = tokens.includes("inline");
    const isBulleted = !tokens.includes("non-bulleted");
    const isLargeHeader = tokens.includes("large-header");

    const getSection = () => (
      <>
        {getSectionTitle(title, subtitle, description)}
        {isInline ? getInlineItems(other) : getItems(other, isBulleted)}
      </>
    );

    return (
      <div style={isCenter ? styles.center : undefined} key={key}>
        {isFirst && getSectionHeader(header, isLargeHeader)}
        {getDatedSection(date, getSection())}
      </div>
    );
  };

  return (
    <div style={styles.section}>
      {body.map((section, key) => getBody(section, key))}
    </div>
  );
}

export {
  getSections,
  getFields,
  sectionsTrigger,
  fieldsTrigger,
  styleTrigger,
} from "./autocomplete";
export { getKeyValuePair } from "./utils";
