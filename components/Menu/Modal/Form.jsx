import React from 'react';
import styled from 'styled-components';
import { BsX } from 'react-icons/bs';
import TextInput from './TextInput';
import { FIELDS, SECTIONS, COLORS, TRIGGERS } from '../../../constants';

const styles = {
  container: {
    height: '100%',
  },
  form: {
    margin: 20,
    height: '100%',
  },
  body: {
    borderTop: `1.4px solid ${COLORS.darkBrown}`,
    borderLeft: `1.4px solid ${COLORS.darkBrown}`,
    borderRight: `1.4px solid ${COLORS.darkBrown}`,
    marginBottom: 30,
  },
  center: {
    textAlign: 'center',
  },
  select: {
    margin: '0 5px',
    height: 30,
    border: `1.4px solid ${COLORS.darkBrown}`,
    background: 'none',
    outline: 'none',
  },
};

const SubmitButton = styled.input`
  width: calc(50% - 15px);
  margin: 7px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  background: ${COLORS.redOrange};
  border: 1.8px solid ${COLORS.darkBrown};
  font-weight: 600;
  outline: 3px solid ${COLORS.background};
  padding: 10px;
  transition: border-radius 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    border-radius: 15px;
  }

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    width: calc(100% - 15px);
  }
`;

const CloseButton = styled.div`
  cursor: pointer;
  padding: 0 4px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1.4px solid ${COLORS.darkBrown};
  font-size: 25px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${COLORS.yellow};

  &:hover {
    background: ${COLORS.red};
  }
`;

const AddLink = styled.a`
  color: ${COLORS.red};
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    color: ${COLORS.darkBrown};
  }
`;

const AlignmentText = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;

  p {
    margin: 0;
  }
`;

export default function Form({ state, setState, onSubmit }) {
  const isHeader = state.type === SECTIONS.TYPES.HEADER;

  const handleHeaderChange = (e) => {
    setState({ ...state, name: e.target.value });
  };

  const handleBodyChange = (e, index, key) => {
    const b = [...state.body];
    b[index] = { ...b[index], [key]: e.target.value };
    setState({ ...state, body: b });
  };

  const handleOtherChange = (e, index) => {
    const b = [...state.body];
    b[index] = { ...b[index], other: e.target.value.split('\n') };
    setState({ ...state, body: b });
  };

  const handleAddSubsection = () => {
    const b = [...state.body, FIELDS.EMPTY_SUBSECTION];
    setState({ ...state, body: b });
  };

  const handleDeleteSubsection = (index) => {
    const b = [...state.body];
    b.splice(index, 1);
    setState({ ...state, body: b });
  };

  const handleTypeChange = (e) => {
    setState({ ...state, type: e.target.value });
  };

  return (
    <form onSubmit={onSubmit} style={styles.container}>
      <div style={styles.form}>
        <TextInput
          label="Section Title"
          defaultValue={state.name}
          onChange={handleHeaderChange}
          placeholder="New Section"
          isDefaultFocus
        />
        {!isHeader && (
          <AlignmentText>
            <p>
              If I chose a two column theme, I&apos;d want this section in the
              <select
                value={state.type}
                style={styles.select}
                onChange={handleTypeChange}
              >
                <option value={SECTIONS.TYPES.SECTION1}>main</option>
                <option value={SECTIONS.TYPES.SECTION2}>side</option>
              </select>
              column.
            </p>
          </AlignmentText>
        )}
        <br />
        <div>
          {state.body.map((b, index) => (
            <div style={styles.body} key={`${index + 1}`}>
              {index > 0 ? (
                <CloseButton onClick={() => handleDeleteSubsection(index)}>
                  <BsX />
                </CloseButton>
              ) : null}
              {!isHeader
                ? FIELDS.getFields().map((field, i) => {
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
                  })
                : null}
              <TextInput
                label="Content"
                defaultValue={b.other.join('\r\n')}
                onChange={(e) => handleOtherChange(e, index)}
                placeholder="Tell me more! Prepend new lines with - to create bulleted points."
                multiline
              />
            </div>
          ))}
          <div style={styles.center}>
            <AddLink onClick={handleAddSubsection}>
              Add another subsection +
            </AddLink>
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
      <SubmitButton
        style={styles.submit}
        type="submit"
        value="I'm all done! Add this to my resume."
      />
    </form>
  );
}
