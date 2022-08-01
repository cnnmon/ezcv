import React from "react";
import styles, {
  getLargeSectionHeader,
  getInlineItems,
  getItems,
} from "../styles";

export default function Center({ header, subSection, subSectionIndex }) {
  const { title, subtitle, description, date, other } = subSection;
  const isFirstSubsection = subSectionIndex === 0;

  return (
    <div style={styles.centered}>
      {isFirstSubsection && getLargeSectionHeader(header, true)}
      {getInlineItems(other, true)}
    </div>
  );
}
