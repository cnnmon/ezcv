import React from 'react';
import { SECTIONS, COLORS } from '../../constants';
import Button from '../Button';

const styles = {
  container: {
    display: 'flex',
    border: `1.5px solid ${COLORS.darkBrown}`,
    height: 90,
    overflowX: 'scroll',
    padding: 10,
    backgroundColor: COLORS.red,
    marginBottom: 10,
  },
  icon: {
    fontSize: 20,
  },
};

export default function List({ items, onClick = () => null, isSelected = () => false }) {
  const getContent = ({ name, getIcon }) => (
    <>
      <div style={styles.icon}>{getIcon()}</div>
      {name}
    </>
  );

  const getButtonStyle = (item) => {
    const selected = isSelected(item);
    return {
      margin: '7px 0px 7px 10px',
      width: 120,
      minWidth: 120,
      backgroundColor: 'color' in item ? item.color : COLORS.yellow,
      borderRadius: selected ? 20 : undefined,
      cursor: selected ? 'not-allowed' : 'pointer',
      opacity: selected ? 0.6 : 'inherit',
    }
  }

  return (
    <div style={styles.container}>
      {items.map((e, index) => (
        <Button
          content={getContent(e)}
          onClick={() => onClick(e)}
          isPrimary={e.name === SECTIONS.getEmptySection().name}
          style={getButtonStyle(e)}
          key={`${index + 1}`}
        />
      ))}
    </div>
  );
}
