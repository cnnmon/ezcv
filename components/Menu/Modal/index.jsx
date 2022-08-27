/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { BsX } from 'react-icons/bs';
import styled from 'styled-components';
import Subsection from '../../Subsection';
import { SECTIONS, COLORS, TRIGGERS } from '../../../constants';
import Form from './Form';

const styles = {
  fixedContainer: {
    position: 'fixed',
    zIndex: 1,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    height: '90%',
    width: '80%',
    maxWidth: 1200,
  },
  bar: {
    top: 0,
    height: 50,
    borderBottom: `1.8px solid ${COLORS.darkBrown}`,
    backgroundColor: COLORS.redOrange,
  },
  overlay: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.3)',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  modal: {
    background: COLORS.background,
    border: `1.8px solid ${COLORS.darkBrown}`,
    borderRadius: 0,
    padding: 0,
    height: '100%',
    width: '100%',
  },
  body: {
    display: 'flex',
    height: 'calc(100% - 52px)',
  },
  tooltip: {
    position: 'absolute',
    background: COLORS.orange,
    fontSize: 13,
    left: 60,
    top: 8,
    border: `1.8px solid ${COLORS.darkBrown}`,
    padding: '8px',
    borderRadius: 20,
  },
};

const ExitButton = styled.button`
  top: -2.5px;
  right: 0;
  padding: 0;
  display: flex;
  background: ${COLORS.yellow};
  border-right: 1.8px solid ${COLORS.darkBrown};
  border-left: none;
  border-bottom: none;
  border-top: none;
  width: 50px;
  height: 50px;
  font-size: 50px;
  cursor: pointer;
  margin-top: -0.3px;
  margin-left: -0.5px;

  .tooltip {
    display: none;
  }

  &:hover {
    background: ${COLORS.red};

    .tooltip {
      display: block;
    }
  }
`;

const FormContainer = styled.div`
  width: 50%;
  overflow-y: scroll;

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    width: 100%;
  }
`;

const PreviewContainer = styled.div`
  position: sticky;
  top: 52px;
  background: white;
  font-size: 12px;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: scroll;
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-right: 1.8px solid ${COLORS.darkBrown};
  width: 50%;
  height: 100%;

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    display: none;
  }
`;

const PreviewInfo = styled.div`
  color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 1;
  bottom: 10px;
  left: 10px;
  background: white;
  font-size: 12px;

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    display: none;
  }
`;

export default function Modal({ item, styling, closeModal, appendSection }) {
  const isOpen = item !== null;

  const [state, setState] = useState({
    name: '',
    body: [],
    type: SECTIONS.TYPES.SECTION1,
  });

  useEffect(() => {
    if (item) {
      setState(item);
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();

    const section = SECTIONS.formatIntoSection(state);
    appendSection(section.char);
  };

  return (
    <>
      <div
        onClick={closeModal}
        onKeyPress={closeModal}
        style={{ ...styles.overlay, display: isOpen ? 'block' : 'none' }}
      />
      <div
        style={{ ...styles.fixedContainer, display: isOpen ? 'block' : 'none' }}
      >
        <div style={styles.modal}>
          <div style={styles.bar}>
            <ExitButton type="button" onClick={closeModal}>
              <BsX />
              <p>
                <span style={styles.tooltip} className="tooltip">
                  Are you sure? Changes will not be saved!
                </span>
              </p>
            </ExitButton>
          </div>
          <PreviewInfo>
            * this box is a smaller width than a real resume!
          </PreviewInfo>
          <div style={styles.body}>
            <PreviewContainer>
              {state.body.map((subsection, index) => (
                <div key={`${index + 1}`}>
                  <Subsection
                    styling={styling}
                    type={state.type}
                    header={state.name}
                    subsection={subsection}
                    subsectionIndex={index}
                  />
                </div>
              ))}
              <br />
              <br />
            </PreviewContainer>
            <FormContainer>
              <Form state={state} setState={setState} onSubmit={handleSubmit} />
            </FormContainer>
          </div>
        </div>
      </div>
    </>
  );
}
