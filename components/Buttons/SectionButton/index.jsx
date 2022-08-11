import React, { useState } from 'react';
import Modal from '../../Modal';
import Button from '../Button';
import { COLORS } from '../../../constants';
import { BsX } from 'react-icons/bs';

const styles = {
  container: {
    height: '100%',
  },
}

export default function SectionButton({ item, content, isPrimary, style }) {
  const [ modalVisible, setModalVisible ] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  return (
    <div style={styles.container}>
      <Modal title={item.name} isOpen={modalVisible} closeModal={closeModal} />
      <Button
        content={content}
        onClick={openModal}
        isPrimary={isPrimary}
        style={style}
      />
    </div>
  );
}
