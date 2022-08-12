import React, { useState, useMemo, useEffect } from 'react';
import { BsX } from 'react-icons/bs';
import styled from 'styled-components';
import Subsection from '../../Subsection';
import { SECTIONS, COLORS, TRIGGERS } from '../../../constants';
import Form from './Form';

const styles = {
  bar: {
    position: 'sticky',
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
    position: 'absolute',
    zIndex: 2,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: COLORS.background,
    width: '70%',
    maxWidth: 900,
    maxHeight: '80%',
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

export default function Modal({ item, styling, closeModal, appendToText }) {
  const { isOpen, h, b } = useMemo(() => {
    if (item > -1) {
      const section = SECTIONS.getSection(item);
      const { name, body } = section;
      return { isOpen: true, h: name, b: body }
    }
    return { isOpen: false, h: '', b: [] }
  }, [item])

  const [header, setHeader] = useState(h);
  const [body, setBody] = useState(b);
  const [type, setType] = useState(null);

  useEffect(() => {
    if (item !== -1) {
      const section = SECTIONS.getSection(item);
      setHeader(section.name);
      setBody(section.body);
      setType(section.type);
    }
  }, [item])

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();

    const section = SECTIONS.getSectionsFormat({
      name: header,
      type,
      body,
    });

    appendToText(section.char);
  }

  return (
    <div>
      <div onClick={closeModal} style={{ ...styles.overlay, display: isOpen ? 'block' : 'none' }} />
      <div style={{ ...styles.modal, display: isOpen ? 'block' : 'none' }}>
        <div style={styles.bar}>
          <ExitButton type="button" onClick={closeModal}>
            <BsX />
          </ExitButton>
        </div>
        <PreviewContainer>
          {body.map((b, index) => (
            <div key={`${index + 1}`}>
              <Subsection
                styling={styling}
                type={type}
                header={header}
                subsection={b}
                subsectionIndex={index}
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
            onSubmit={handleSubmit}
          />
        </FormContainer>
      </div>
    </div>
  );
}
