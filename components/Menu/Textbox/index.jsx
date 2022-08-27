import React from 'react';
import { COLORS } from '../../../constants';

const styles = {
  textarea: {
    border: `1.5px solid ${COLORS.darkBrown}`,
    backgroundColor: COLORS.yellow,
    padding: 15,
    boxSizing: 'border-box',
    width: '100%',
    minHeight: 300,
    resize: 'none',
    outline: 'none',
    fontFamily: 'Inter',
    fontSize: 13,
    flexGrow: 1,
  },
};

export default function Textbox({ text, setText, textbox }) {
  return (
    <textarea
      value={text}
      ref={textbox}
      style={styles.textarea}
      onChange={(e) => setText(e.target.value)}
      placeholder="Click on the sections above to start building your resume!"
    />
  );
}
