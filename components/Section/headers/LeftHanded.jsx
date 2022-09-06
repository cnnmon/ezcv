import React from 'react';
import { getLargeSectionHeader, getItems } from '../styles';

const STYLES = {
  inline: {
    display: 'flex',
    width: '100%',
  },
  left: {
    width: '72%',
  },
};

function Body({ subsection }) {
  const { title, subtitle, description, date, other } = subsection;
  return getItems([title, subtitle, description, date, ...other], true);
}

export default function LeftHanded({ header, subsections }) {
  return (
    <div style={STYLES.inline}>
      <div style={STYLES.left}>{getLargeSectionHeader(header)}</div>
      <div>
        {subsections.map((s, key) => (
          <Body subsection={s} key={`${key + 1}`} />
        ))}
      </div>
    </div>
  );
}
