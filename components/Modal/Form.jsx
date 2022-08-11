import React, { useRef, useEffect } from 'react';
import { COLORS } from '../../constants';
import styled from 'styled-components';

const styles = {
  form: {
    padding: '5px 20px',
  },
  labelContainer: {
    margin: 0,
    display: 'flex',
  },
  label: {
    margin: '-1px 7px 0 0',
  },
}

/*
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid ${COLORS.darkBrown};

  &:placeholder-shown {
    opacity: 0.4;
  }
*/

const Input = styled.input`
  flex-grow: 1;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${COLORS.red};

  &:placeholder-shown {
    opacity: 0.6;
  }
`;

export default function Form({title}) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form style={styles.form}>
      <h2>{title}</h2>

      <label style={styles.labelContainer}>
        <p style={styles.label}>Section is called </p><Input type="text" placeholder="Experience" name="name" ref={inputRef} />
      </label>

      <br />
      <input type="submit" value="Submit" />
    </form>
  )
}
