import React, { useState } from 'react';
import { COLORS } from '../../constants';
import { BsX } from 'react-icons/bs';
import Form from './Form';
import ReactModal from 'react-modal';

const styles = {
  bar: {
    width: '100%',
    height: 50,
    borderBottom: `1.8px solid ${COLORS.darkBrown}`,
    backgroundColor: COLORS.redOrange,

  },
  modal: {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    content: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: COLORS.background,
      width: '70%',
      maxWidth: 800,
      height: 500,
      border: `1.8px solid ${COLORS.darkBrown}`,
      borderRadius: 0,
      padding: 0,
    },
  },
  exitButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: COLORS.yellow,
    borderLeft: `1.8px solid ${COLORS.darkBrown}`,
    borderRight: 'none',
    borderBottom: 'none',
    borderTop: 'none',
    width: 50,
    height: 50,
    fontSize: 50,
    cursor: 'pointer',
  },
};

export default function Modal({ title, isOpen, closeModal }) {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Example"
      style={styles.modal}
    >
      <div style={styles.bar}>
        <button
          style={styles.exitButton}
          onClick={closeModal}
        >
          <BsX />
        </button>
      </div>

      <Form title={title} />
    </ReactModal>
  );
}
