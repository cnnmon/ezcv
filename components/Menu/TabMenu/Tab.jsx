import React from 'react';
import { COLORS } from '../../../constants';

const styles = {
  tab: {
    cursor: 'pointer',
    border: `2px solid ${COLORS.darkBrown}`,
    borderBottom: 'none',
    backgroundColor: COLORS.yellow,
    fontWeight: 'bold',
    width: 160,
    minWidth: 160,
    padding: '8px 0',
  },
  active: {
    backgroundColor: COLORS.darkBrown,
    color: 'white',
  },
};

export default function Tab({ isActive, onClick, title }) {
  return (
    <button
      type="button"
      style={{ ...styles.tab, ...(isActive ? styles.active : {}) }}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
