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
    margin: 0,
  },
  inlineSymbol: {
    margin: '0 5px',
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
  const getItem = (e, index) => {
    if (e === '') {
      return;
    }

    const isBulleted = e[0] === '-';
    const element = isBulleted ? e.substring(1).trim() : e;

    return (
      <>
        <li key={index} style={styles.unbulleted}>
          {autolink(element)}
        </li>
        {index < list.length - 1 ? (
          <p style={styles.inlineSymbol}>&#x2022;</p>
        ) : null}
      </>
    );
  };

  return (
    <div
      style={both(styles.inline, isCenter ? { justifyContent: 'center' } : {})}
    >
      {list.map((e, index) => getItem(e, index))}
    </div>
  );
}

export function getItems(list) {
  const getItem = (e, index) => {
    const isBulleted = e[0] === '-';
    const element = isBulleted ? e.substring(1).trim() : e;
    return (
      <li key={index} style={isBulleted ? null : styles.unbulleted}>
        {autolink(element)}
      </li>
    );
  };

  return <>{list.map((e, index) => getItem(e, index))}</>;
}

export default styles;
