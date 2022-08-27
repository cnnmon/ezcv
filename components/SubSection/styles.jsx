import React from 'react';
// import AutoLinkText from 'react-autolink-text2';

const styles = {
  /* Global */
  header: {
    margin: '4px 0 4px',
  },
  flex: {
    display: 'flex',
  },
  inline: {
    display: 'flex',
  },
  inlineItem: {
    margin: '0 10px 10px 0',
  },
  text: {
    margin: 0,
  },
  centered: {
    textAlign: 'center',
  },
  /* Lists */
  unbulleted: {
    listStyleType: 'none',
  },
};

// combine dictionary styles easily
function both(style1, style2) {
  return { ...style1, ...style2 };
}

export function autolink(text) {
  return text;
  // <AutoLinkText text={text} linkProps={{ target: '_blank' }} />;
}

export function getLargeSectionHeader(text, isCenter) {
  return (
    <h1 style={both(styles.header, isCenter ? { textAlign: 'center' } : {})}>
      {text}
    </h1>
  );
}

export function getSectionTitle(title, subtitle = null, description = null) {
  return (
    <p style={styles.text}>
      <b>
        {autolink(title)}
        {subtitle && ', '}
      </b>
      {autolink(subtitle)}
      {description && ' — '}
      {autolink(description)}
    </p>
  );
}

export function getInlineItems(list, isCenter) {
  return (
    <div
      style={both(styles.inline, isCenter ? { justifyContent: 'center' } : {})}
    >
      {list.map((e, index) => (
        <p style={styles.inlineItem} key={`${index + 1}`}>
          {autolink(e)}
        </p>
      ))}
    </div>
  );
}

export function getItems(list) {
  const getItem = (e, index) => {
    const isBulleted = e[0] === '-';
    const element = isBulleted ? e.substring(1).trim() : e;
    return (
      <li key={index} style={isBulleted ? undefined : styles.unbulleted}>
        {autolink(element)}
      </li>
    );
  };

  return <>{list.map((e, index) => getItem(e, index))}</>;
}

export default styles;
