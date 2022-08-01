import React from "react";
import styles, {
  both,
  autolink,
  getLargeSectionHeader,
  getSectionHeader,
  getInlineItems,
  getItems,
  getSectionTitle,
} from "../styles";

const STYLES = {
  left: {
    flex: 1,
    marginRight: 20,
  },
  right: {
    flex: 0.5,
    textAlign: "right",
  },
  line: {
    marginTop: 0,
    backgroundColor: "black",
  },
}

export default function Classic({ header, subSection, subSectionIndex }) {
  const { title, subtitle, description, date, other } = subSection;
  const isFirstSubsection = subSectionIndex === 0;

  const getLeft = () => (
    <div style={STYLES.left}>
        {getSectionTitle(title, subtitle, description)}
    </div>
  )

  const getRight = () => (
    <div style={STYLES.right}>
      {date}
    </div>
  )

  return (
    <>
      {isFirstSubsection && (
        <>
          {getSectionHeader(header)}
          {header && <hr style={STYLES.line} />}
        </>
      )}
      <div style={styles.flex}>
        {getLeft()}
        {getRight()}
      </div>
      {getItems(other)}
    </>
  );
}
