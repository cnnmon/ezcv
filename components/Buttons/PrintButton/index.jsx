import React from 'react';
import { RiCheckFill } from 'react-icons/ri';
import Button from '../Button';
import { COLORS } from '../../../constants';

const styles = {
  button: {
    padding: '20px',
    width: 450,
    minWidth: 450,
    height: 70,
    position: 'fixed',
    bottom: 40,
    right: -360,
    outline: `2px solid ${COLORS.background}`,
    fontWeight: 'normal',
    background: COLORS.lightGreen,
    transition: 'transform 0.2s ease-in-out',
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  hover: {
    transform: 'translateX(-50px)',
  },
  icon: {
    paddingLeft: 2,
    paddingRight: 30,
    fontSize: 35,
  },
};

export default function PrintButton() {
  return (
    <Button
      content={
        <div style={styles.content}>
          <RiCheckFill style={styles.icon} />
        </div>
      }
      style={styles.button}
      hoverStyle={styles.hover}
    />
  );
}
