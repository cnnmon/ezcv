import React from 'react';
import Image from 'next/image';
import { COLORS } from '../../constants';
import logo from '../../public/logo.png';

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    borderTop: `2px solid ${COLORS.darkBrown}`,
    padding: '40px 0',
    zIndex: 1,
    fontFamily: 'Mabry Pro',
  },
  left: {
    flexGrow: 0.5,
  },
  right: {
    flexGrow: 0.5,
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  link: {
    textDecoration: 'underline',
    color: COLORS.red,
  },
};

function Footer({ noLogo = false }) {
  // currently nologo is always false
  const getFlex = () => ({
    display: noLogo ? undefined : 'flex',
    width: '100%',
    maxWidth: noLogo ? undefined : 1000,
    padding: '0 15px',
  });

  return (
    <footer>
      <div style={styles.container}>
        <div style={getFlex()}>
          {!noLogo ? (
            <div style={styles.left}>
              <Image alt="logo" src={logo} width={60} height={60} />
            </div>
          ) : null}
          <div style={styles.right}>
            <h4>
              Made with ♥ and red velvet lattes by{' '}
              <a
                href="https://twitter.com/cnnmonsugar"
                target="_blank"
                rel="noreferrer"
                style={styles.link}
              >
                cnnmon
              </a>
              <br />
              Have suggestions, comments, questions? Reach out!
            </h4>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
