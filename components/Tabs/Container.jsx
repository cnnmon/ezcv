import React from 'react';
import Content from './Content';

const styles = {
  hide: {
    display: 'none',
  },
};

export default function Container({ tab, isActive }) {
  const { items, onClick, isSelected } = tab;

  return (
    <div style={isActive ? undefined : styles.hide}>
      <Content items={items} onClick={onClick} isSelected={isSelected} />
    </div>
  );
}
