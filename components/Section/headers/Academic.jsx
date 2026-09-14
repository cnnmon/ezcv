import React from 'react';
import styles, { autolink } from '../styles';

function getPipedItems(list) {
  const items = list.filter((e) => e);
  if (!items.length) {
    return null;
  }

  return (
    <p style={{ ...styles.text, marginTop: 2 }}>
      {items.map((e, index) => (
        <span key={`${index + 1}`}>
          {index > 0 ? ' | ' : ''}
          {autolink(e)}
        </span>
      ))}
    </p>
  );
}

function Body({ subsection }) {
  const { title, subtitle, description, date, other } = subsection;
  return getPipedItems([title, subtitle, description, date, ...other]);
}

export default function Academic({ header, subsections }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <h1 style={{ margin: 0, padding: 0, fontSize: '1.5em' }}>{header}</h1>
      {subsections.map((s, key) => (
        <Body subsection={s} key={`${key + 1}`} />
      ))}
    </div>
  );
}
