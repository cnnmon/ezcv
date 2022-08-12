/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { COLORS } from '../../constants';

const styles = {
  labelContainer: {
    margin: 0,
    display: 'flex',
    padding: 10,
    borderBottom: `1.3px solid ${COLORS.darkBrown}`,
  },
  label: {
    margin: '0 7px 0 0',
    fontSize: 11,
    paddingTop: 4,
    width: 60,
  },
  input: {
    flexGrow: 1,
    background: 'none',
    border: 'none',
    outline: 'none',
    fontSize: 14,
    fontWeight: 400,
    resize: 'none',
    color: COLORS.red,
  },
};

export default function TextInput({
  isDefaultFocus,
  label,
  placeholder,
  onChange = () => null,
  defaultValue = undefined,
  multiline = false,
}) {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef(null);
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e);
  };

  const inputProps = {
    type: 'text',
    placeholder,
    value,
    onChange: handleChange,
    name: 'name',
    ref: inputRef,
  };

  useEffect(() => {
    if (isDefaultFocus) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div style={styles.labelContainer}>
      <p style={styles.label}>{label}</p>
      {multiline ? (
        <TextareaAutosize {...inputProps} style={{ ...styles.input }} />
      ) : (
        <input {...inputProps} style={styles.input} />
      )}
    </div>
  );
}
