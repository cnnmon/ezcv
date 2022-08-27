import React from 'react';
import styles, {
  getSectionTitle,
  getLargeSectionHeader,
  getItems,
} from '../styles';

const STYLES = {
  inline: {
    display: 'flex',
  },
  left: {
    width: '40%',
    marginRight: 20,
  },
};

export default function SideBySide({ header, subsection, subsectionIndex }) {
  const { title, subtitle, description, date, other } = subsection;
  const isFirstSubsection = subsectionIndex === 0;

  const getLeft = () => (
    <div style={STYLES.left}>
      {isFirstSubsection && getLargeSectionHeader(header)}
      {getSectionTitle(title, subtitle, description)}
      {date && <p style={styles.text}>{date}</p>}
    </div>
  );

  const getRight = () => <div>{getItems(other, true)}</div>;

  return (
    <div style={STYLES.inline}>
      {getLeft()}
      {getRight()}
    </div>
  );
}
