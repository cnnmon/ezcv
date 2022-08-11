import React from 'react';
import Button from '../Buttons/Button';
import SectionButton from '../Buttons/SectionButton';
import { SECTIONS, COLORS } from '../../constants';

const styles = {
  hide: {
    display: 'none',
  },
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

export default function Container({ tab, isActive }) {
  const { items, onClick, isSection, isSelected } = tab;

  const getButtonContent = ({ name, getIcon }) => (
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
    };
  };

  return (
    <div style={isActive ? undefined : styles.hide}>
      <div style={styles.container}>
        {items.map((e, index) => (
          <div key={`${index + 1}`}>
            {isSection ?
              <SectionButton
                item={e}
                content={getButtonContent(e)}
                isPrimary={e.name === SECTIONS.getExampleSection().name}
                style={getButtonStyle(e)}
              />
            :
              <Button
                item={e}
                content={getButtonContent(e)}
                onClick={() => onClick(e)}
                style={getButtonStyle(e)}
              />
            }
          </div>
        ))}
      </div>
    </div>
  );
}
