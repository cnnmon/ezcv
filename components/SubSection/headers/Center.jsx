import React from 'react';
import styles, {
  getSectionTitle,
  getLargeSectionHeader,
  getInlineItems,
} from '../styles';

export default function Center({ header, subsection, subsectionIndex }) {
  const { title, subtitle, description, date, other } = subsection;
  const isFirstSubsection = subsectionIndex === 0;

  return (
    <div style={styles.centered}>
      {isFirstSubsection && getLargeSectionHeader(header, true)}
      {getSectionTitle(title, subtitle, description)}
      {date && <p style={styles.text}>{date}</p>}
      {getInlineItems(other, true)}
    </div>
  );
}
