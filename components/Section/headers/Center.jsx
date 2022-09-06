import React from 'react';
import styles, { getLargeSectionHeader, getInlineItems } from '../styles';

function Body({ subsection }) {
  const { title, subtitle, description, date, other } = subsection;
  return getInlineItems([title, subtitle, description, date, ...other], true);
}

export default function Center({ header, subsections }) {
  return (
    <div style={styles.centered}>
      {getLargeSectionHeader(header, true)}
      {subsections.map((s, key) => (
        <Body subsection={s} key={`${key + 1}`} />
      ))}
    </div>
  );
}
