import React from 'react';
import AutoLinkText from '../AutoLinkText';

const styles = {
  /* Global */
  header: {
    margin: '10px 0 5px',
    padding: 0,
  },
  flex: {
    display: 'flex',
  },
  text: {
    margin: 0,
  },
  /* Lists */
  unbulleted: {
    listStyleType: 'none',
  },
};

export function autolink(text) {
  return <AutoLinkText text={text} linkProps={{ target: '_blank' }} />;
}

export function getLargeSectionHeader(text, isCenter) {
  return (
    <h1
      style={{
        textAlign: isCenter ? 'center' : undefined,
        margin: 0,
        padding: 0,
      }}
    >
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
      return null;
    }

    const isBulleted = e[0] === '-';
    const element = isBulleted ? e.substring(1).trim() : e;

    return (
      <>
        <li key={index} style={styles.unbulleted}>
          {autolink(element)}
        </li>
        {index < list.length - 1 ? (
          <p style={{ margin: '0 5px' }}>&#x2022;</p>
        ) : null}
      </>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isCenter ? 'center' : undefined,
      }}
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
