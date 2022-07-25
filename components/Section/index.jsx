import React from "react";
import styles, {
  getSectionHeader,
  getInlineItems,
  getSectionTitle,
  getDatedSection,
  getItems,
} from "./styles";

export default function Section({ header, body }) {
  const getBody = (section, index) => {
    const { title, subtitle, description, date, other, style } = section;
    const tokens = style.split(" ");

    const isFirst = index === 0;
    const isCenter = tokens.includes("center");
    const isInline = tokens.includes("inline");
    const isLargeHeader = tokens.includes("large-header");

    const getSection = () => (
      <>
        {getSectionTitle(title, subtitle, description)}
        {isInline ? getInlineItems(other) : getItems(other)}
      </>
    );

    return (
      <div style={isCenter ? styles.center : undefined} key={index}>
        {isFirst && getSectionHeader(header, isLargeHeader)}
        {getDatedSection(date, getSection())}
      </div>
    );
  };

  return (
    <div style={styles.section}>
      {body.map((section, index) => getBody(section, index))}
    </div>
  );
}
