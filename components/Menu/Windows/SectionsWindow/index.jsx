/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ModalButton from '../../../Buttons/ModalButton';
import { SECTIONS, COLORS } from '../../../../constants';
import { useAppContext } from '../../../../context/state';

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

export default function SectionsWindow({ onClick, content, openModal }) {
  const { sections } = useAppContext();
  const exampleSection = SECTIONS.getExampleSection();
  const items = [exampleSection, ...sections];

  const canFindInContent = (item) => {
    if (item.type === SECTIONS.TYPES.HEADER) {
      return content.find((object) => object.type === item.type);
    }

    return content.find((object) => object.header === item.name);
  };

  const getButtonContent = ({ placeholder, name, getIcon }) => (
    <>
      <div style={styles.icon}>{getIcon()}</div>
      {placeholder ?? name}
    </>
  );

  const getButtonStyle = (item, isSelected) => ({
    margin: '7px 0px 7px 10px',
    width: 120,
    minWidth: 120,
    height: '80%',
    backgroundColor: 'color' in item ? item.color : COLORS.yellow,
    borderRadius: isSelected ? 20 : undefined,
    cursor: isSelected ? 'not-allowed' : 'pointer',
    opacity: isSelected ? 0.5 : 'inherit',
  });

  const buttonProps = (item, isSelected = false) => ({
    item,
    content: getButtonContent(item),
    onClick: isSelected
      ? () => null
      : () => (isSelected ? null : onClick(item)),
    isPrimary: item.name === SECTIONS.getExampleSection().name,
    style: getButtonStyle(item, isSelected),
    openModal: isSelected ? () => null : () => openModal(item),
  });

  return (
    <div style={styles.container}>
      {items.map((item, index) => (
        <div key={`${index + 1}`}>
          <ModalButton {...buttonProps(item, canFindInContent(item))} />
        </div>
      ))}
    </div>
  );
}
