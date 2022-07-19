const styles = {
  /* Global */
  section: {
    lineHeight: 0.4,
    margin: '15px 0 20px 0',
  },
  header: {
    margin: '0 0 10px',
  },
  center: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  inline: {
    display: 'flex',
  },
  inlineItem: {
    margin: '0 10px 10px 0',
  },
  /* Lists */
  list: {
    marginTop: -8,
    lineHeight: 1.1,
  },
  unbulleted: {
    listStyleType: 'none',
  },
  /* Columns */
  left: {
    flex: 0.3,
  },
  right: {
    flex: 1,
  },
};

export function getSectionHeader(text, isLarge) {
  if (isLarge) {
    return <h1>{text}</h1>;
  }

  return <h2 style={styles.header}>{text}</h2>;
}

export function getInlineItems(list) {
  return (
    <div style={styles.inline}>
      {list.map((e, key) => (
        <p style={styles.inlineItem}>{e}</p>
      ))}
    </div>
  )
}

export function getItems(list, isBulleted = true) {
  return (
    <div style={{...styles.list, ...(isBulleted ? {} : styles.unbulleted)}}>
      {list.map((e, key) => (
        <li key={key}>{e}</li>
      ))}
    </div>
  )
}

export function getSectionTitle(title, subtitle = null, description = null) {
  if (title === null) {
    return null
  }

  return (
    <p style={styles.title}>
      {title && <b>{title}{subtitle && ", "}</b>}
      {subtitle}
      {description && ` — ${description}`}
    </p>
  )
}

export function getDatedSection(date, body) {
  return (
    <div style={styles.inline}>
      {date && (
        <div style={styles.left}>
          <p>{date}</p>
        </div>
      )}
      <div style={styles.right}>
        {body}
      </div>
    </div>
  )
}

export default styles;
