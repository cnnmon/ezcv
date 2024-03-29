import React, { useState } from 'react';
import { COLORS } from '../../constants';

const styles = {
  button: {
    cursor: 'pointer',
    border: `2px solid ${COLORS.darkBrown}`,
    backgroundColor: COLORS.yellow,
    transition: 'border-radius 0.2s ease-in-out',
    fontWeight: 'bold',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
  },
  primary: {
    backgroundColor: COLORS.background,
  },
  hover: {
    borderRadius: 20,
  },
};

export default function Button({
  content,
  onClick = undefined,
  isPrimary = false,
  style = {},
  hoverStyle = styles.hover,
}) {
  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={onClick}
      style={{
        ...styles.button,
        ...style,
        ...(isPrimary ? styles.primary : {}),
        ...(hover ? hoverStyle : {}),
      }}
    >
      {content}
    </button>
  );
}
