import React, { useEffect } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import { TRIGGERS, FIELDS, COLORS } from '../../../constants';
import { BsX } from 'react-icons/bs';

const styles = {
  form: {
    margin: '0px 20px',
  },
  body: {
    borderTop: `1.4px solid ${COLORS.darkBrown}`,
    borderLeft: `1.4px solid ${COLORS.darkBrown}`,
    borderRight: `1.4px solid ${COLORS.darkBrown}`,
    marginBottom: 30,
  },
};

const Submit = styled.input`
  position: sticky;
  width: 100%;
  bottom: 0;
  background: ${COLORS.yellow};
  border-top: 1.8px solid ${COLORS.darkBrown};
  border-right: none;
  border-bottom: none;
  border-left: none;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: ${COLORS.lightGreen};
  }

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    width: 100%;
  }
`;

const CloseButton = styled.div`
  cursor: pointer;
  padding: 0 4px;
  border-top: 1.4px solid ${COLORS.darkBrown};
  border-right: 1.4px solid ${COLORS.darkBrown};
  border-bottom: none;
  border-left: 1.4px solid ${COLORS.darkBrown};
  font-size: 25px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${COLORS.yellow};

  &:hover {
    background: ${COLORS.red};
  }
`;

export default function Form({ header, setHeader, body, setBody, onSubmit }) {
  const handleHeaderChange = (e) => {
    setHeader(e.target.value);
  };

  const handleBodyChange = (e, index, key) => {
    const b = [...body];
    b[index] = { ...b[index], [key]: e.target.value };
    setBody(b);
  };

  const handleOtherChange = (e, index) => {
    const b = [...body];
    b[index] = { ...b[index], other: e.target.value.split('\n') };
    setBody(b);
  };

  return (
    <form onSubmit={onSubmit}>
      <div style={styles.form}>
        <TextInput
          label="Section"
          defaultValue={header}
          onChange={handleHeaderChange}
          placeholder="New Section"
          isDefaultFocus
        />
        <br />
        <div>
          {/* TODO: remove if first */}
          <CloseButton>
            <BsX />
          </CloseButton>
          {body.map((b, index) => (
            <div style={styles.body} key={`${index + 1}`}>
              {FIELDS.getFields().map((field, i) => {
                const { title } = field;
                const key = title.toLowerCase();
                return (
                  <div key={`${i + 2}`}>
                    <TextInput
                      label={title}
                      defaultValue={b[key]}
                      onChange={(e) => handleBodyChange(e, index, key)}
                      placeholder={field.body}
                    />
                  </div>
                );
              })}
              <TextInput
                label="Content"
                defaultValue={b.other.join('\r\n')}
                onChange={(e) => handleOtherChange(e, index)}
                placeholder="Tell me more! Prepend new lines with - to bullet it."
                multiline
              />
            </div>
          ))}
        </div>
      </div>
      <Submit style={styles.submit} type="submit" value="Add this!" />
    </form>
  );
}
