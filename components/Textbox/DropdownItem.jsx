import React from 'react';
import { COLORS } from '../../constants';

const styles = {
  item: {
    padding: '10px 5px',
    margin: 5,
  },
  selected: {
    backgroundColor: 'black',
    color: COLORS.redOrange,
  },
};

export default function DropdownItem({
  selected,
  entity: { title, description },
}) {
  return (
    <div style={{ ...styles.item, ...(selected ? styles.selected : {}) }}>
      <p>
        <b>{title}</b>
      </p>
      <p>{description}</p>
    </div>
  );
}
