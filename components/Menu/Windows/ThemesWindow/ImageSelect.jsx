import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../../constants';
import ScrollContainer from 'react-indiana-drag-scroll';

const styles = {
  title: {
    padding: '30px 20px 0',
  },
  list: {
    display: 'flex',
    padding: '10px 20px 20px',
    boxSizing: 'border-box',
  },
  item: {
    paddingRight: 20,
    width: 250,
    minWidth: 250,
  },
  text: {
    margin: 0,
  },
  description: {
    textAlign: 'center',
  }
};

const Option = styled.img`
  cursor: pointer;
  border: 2px solid ${COLORS.darkBrown};
  box-sizing: border-box;
  transition: border-radius 0.2s ease-in-out, opacity 0.2s ease-in-out;
  width: 100%;

  &:hover {
    border-radius: 20px;
  }
`;

export default function ImageSelect({
  title,
  description,
  items,
  currentValue,
  onChange,
  color = COLORS.red,
}) {
  const PUBLIC_FILEPATH = '../../../../';

  const getOptionStyle = (color, isCurrent) => ({
    background: color,
    cursor: isCurrent ? 'not-allowed' : undefined,
    opacity: isCurrent ? '0.5' : undefined,
    borderRadius: isCurrent ? 20 : undefined,
  });

  return (
    <>
      <div style={styles.title}>
        <h4 style={styles.text}>{title}</h4>
        <p style={styles.text}>{description}</p>
      </div>
      <ScrollContainer style={styles.list}>
        {items.map((item) => (
          <div style={styles.item} key={item.name}>
            <Option
              src={`${PUBLIC_FILEPATH}${item.image}`}
              style={getOptionStyle(
                color,
                item.name === currentValue.name
              )}
              onClick={() => onChange(item)}
              alt=""
              key={item.name}
            />
            <div style={styles.description}>
              <h4 style={styles.text}>{item.name}</h4>
              <p style={styles.text}>{item.description}</p>
            </div>
          </div>
        ))}
      </ScrollContainer>
    </>
  );
}
