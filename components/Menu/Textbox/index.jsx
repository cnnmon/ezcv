import React from 'react';
import { COLORS } from '../../../constants';

const styles = {
  textarea: {
    width: '100%',
    border: `2px solid ${COLORS.darkBrown}`,
    backgroundColor: COLORS.yellow,
    padding: 15,
    boxSizing: 'border-box',
    minHeight: 300,
    resize: 'none',
    outline: 'none',
    fontFamily: 'Inter',
    fontSize: 13,
    height: '100%',
  },
};

export default function Textbox({ text, setText, textbox, readOnly = false }) {
  return (
    <textarea
      value={text}
      ref={textbox}
      style={styles.textarea}
      readOnly={readOnly}
      onChange={(e) => setText(e.target.value)}
      placeholder="Click on the sections above to start building your resume!"
    />
  );
}
