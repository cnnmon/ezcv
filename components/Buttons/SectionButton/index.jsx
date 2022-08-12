import React from 'react';
import Button from '../Button';

const styles = {
  container: {
    height: '100%',
  },
};

export default function SectionButton({
  content,
  isPrimary,
  style,
  openModal,
}) {
  return (
    <div style={styles.container}>
      <Button
        content={content}
        onClick={openModal}
        isPrimary={isPrimary}
        style={style}
      />
    </div>
  );
}
