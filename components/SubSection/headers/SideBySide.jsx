import React from "react";
import styles, {
  getSectionTitle,
  getLargeSectionHeader,
  getInlineItems,
  getItems,
} from "../styles";

const STYLES = {
  inline: {
    display: "flex",
  },
  left: {
    flex: 1,
    marginRight: 20,
  },
  right: {
    flex: 0.8,
    textAlign: "right",
  },
}

export default function Center({ header, subSection, subSectionIndex }) {
  const { title, subtitle, description, date, other } = subSection;
  const isFirstSubsection = subSectionIndex === 0;

  const getLeft = () => (
    <div style={STYLES.left}>
      {isFirstSubsection && getLargeSectionHeader(header)}
      {date && <p style={styles.text}>{date}</p>}
    </div>
  )

  const getRight = () => (
    <div style={STYLES.right}>
      {getSectionTitle(title, subtitle, description)}
      {getItems(other, true)}
    </div>
  )

  return (
    <div style={STYLES.inline}>
      {getLeft()}
      {getRight()}
    </div>
  );
}
