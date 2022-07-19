import React, { useMemo } from "react";
import styles, { getSectionHeader, getInlineItems, getSectionTitle, getDatedSection, getItems } from "./styles"

export function getEmptyFields(header) {
  return {
    style: "",
    title: "",
    subtitle: "",
    description: "",
    date: "",
    other: [],
  }
}

export default function Section({ header, body }) {
  const getBody = (section, key) => {
    const { title, subtitle, description, date, other, style } = section;
    const tokens = style.split(" ")

    const isFirst = key === 0
    const isCenter = tokens.includes("center")
    const isInline = tokens.includes("inline")
    const isBulleted = !tokens.includes("non-bulleted")
    const isTitleAsHeader = tokens.includes("title-as-header")
    const isLargeHeader = tokens.includes("large-header")

    const getSection = () => (
      <>
        {!isTitleAsHeader && getSectionTitle(title, subtitle, description)}
        {isInline ? getInlineItems(other) : getItems(other, isBulleted)}
      </>
    )

    return (
      <div style={isCenter ? styles.center : undefined}>
        {isFirst && header && getSectionHeader(isTitleAsHeader ? title : header, isLargeHeader)}
        {getDatedSection(date, getSection())}
      </div>
    )
  }

  return (
    <div style={styles.section}>
      {body.map((section, key) => getBody(section, key))}
    </div>
  );
}

export { getSections } from "./utils";
