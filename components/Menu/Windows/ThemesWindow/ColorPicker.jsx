import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS, STYLING } from '../../../../constants';

const styles = {
  container: {
    margin: '20px 0',
  },
  title: {
    padding: '0 20px',
    paddingBottom: 10,
    borderBottom: `2px solid ${COLORS.darkBrown}`,
  },
  text: {
    margin: 0,
  },
};

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px 20px;
`;

const Picker = styled.input`
  width: 56px;
  height: 40px;
  padding: 2px;
  border: 2px solid ${COLORS.darkBrown};
  background: white;
  cursor: pointer;
`;

const Hex = styled.input`
  border: 2px solid ${COLORS.darkBrown};
  background: ${COLORS.yellow};
  padding: 8px 10px;
  outline: none;
  min-width: 110px;
`;

export default function ColorPicker({ title, description, value, onChange }) {
  const color = (value && value.color) || STYLING.DEFAULT_LINK_COLOR;
  const [hex, setHex] = useState(color);

  useEffect(() => {
    setHex(color);
  }, [color]);

  const commit = (next) => {
    const parsed = STYLING.normalizeHex(next);
    if (!parsed) {
      return;
    }
    onChange(STYLING.getLinkStyling(parsed));
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        <h4 style={styles.text}>{title}</h4>
        <p style={styles.text}>{description}</p>
      </div>
      <Row>
        <Picker
          type="color"
          value={color}
          onChange={(e) => commit(e.target.value)}
          aria-label="Link color"
        />
        <Hex
          type="text"
          value={hex}
          onChange={(e) => {
            setHex(e.target.value);
            commit(e.target.value);
          }}
          spellCheck={false}
        />
      </Row>
    </div>
  );
}
