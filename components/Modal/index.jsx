import React, { useState } from 'react';
import { BsX } from 'react-icons/bs';
import styled from 'styled-components';
import Subsection from '../Subsection';
import { COLORS, TRIGGERS } from '../../constants';
import Form from './Form';

const styles = {
  bar: {
    position: 'sticky',
    top: 0,
    width: '100%',
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
    position: 'absolute',
    zIndex: 2,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: COLORS.background,
    width: '70%',
    maxWidth: 900,
    height: '80%',
    border: `1.8px solid ${COLORS.darkBrown}`,
    borderRadius: 0,
    padding: 0,
    overflowY: 'scroll',
  },
};

const ExitButton = styled.button`
  position: absolute;
  top: -2.5px;
  right: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${COLORS.yellow};
  border-left: 1.8px solid ${COLORS.darkBrown};
  border-right: none;
  border-bottom: none;
  border-top: none;
  width: 50px;
  height: 50px;
  font-size: 50px;
  cursor: pointer;
  margin-top: 2px;

  &:hover {
    background: ${COLORS.red};
  }
`;

const FormContainer = styled.div`
  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    width: 100%;
  }
`;

const PreviewContainer = styled.div`
  position: sticky;
  top: 70px;
  background: white;
  font-size: 10px;
  padding: 20px;
  margin: 20px;
  max-height: 130px;
  overflow-y: scroll;
  border: 1.8px solid ${COLORS.darkBrown};

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    display: none;
  }
`;

export default function Modal({ item, isOpen, closeModal, onSubmit }) {
  // TODO: ITEM IS NOW A NUMBER
  const [header, setHeader] = useState(item.name);
  const [body, setBody] = useState([]);

  return (
    <div>
      <div style={{ ...styles.overlay, display: isOpen ? 'block' : 'none' }} />
      <div style={{ ...styles.modal, display: isOpen ? 'block' : 'none' }}>
        <div style={styles.bar}>
          <ExitButton type="button" onClick={closeModal}>
            <BsX />
          </ExitButton>
        </div>

        <PreviewContainer>
          <h2>{header}</h2>
          {body.map((b, index) => (
            <div key={`${index + 1}`}>
              <Subsection
                styling={{
                  headers: { key: 'center' },
                  theme: { key: 'classic' },
                }}
                type={item.type}
                header={header}
                subsection={b}
              />
            </div>
          ))}
        </PreviewContainer>
        <FormContainer>
          <Form
            header={header}
            setHeader={setHeader}
            body={body}
            setBody={setBody}
            onSubmit={onSubmit}
          />
        </FormContainer>
      </div>
    </div>
  );
}
