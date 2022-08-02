import React, { useState, useRef, useMemo } from 'react';
import Head from 'next/head';
import ReactToPrint from 'react-to-print';
import { RiCheckFill } from 'react-icons/ri';
import { Button, Textbox, Resume, Menu } from '../components';
import { parseIntoContent, useIsMobile } from '../utils';
import { STYLING, COLORS, SECTIONS } from '../constants';

const getStyles = (isMobile) => ({
  page: {
    height: '100%',
  },
  body: {
    display: isMobile ? 'block' : 'flex',
    minHeight: 600,
    margin: 10,
    height: isMobile ? undefined : '100%',
  },
  column: {
    width: isMobile ? '100%' : '50%',
  },
  right: {
    marginLeft: isMobile ? undefined : 20,
    border: '1.5px solid black',
    backgroundColor: COLORS.redOrange,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: isMobile ? undefined : 'center',
    height: isMobile ? 1000 : '97%',
    overflowX: 'scroll',
  },
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
    backgroundColor: COLORS.red,
    transition: 'transform 0.2s ease-in-out',
  },
  buttonContent: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  buttonHover: {
    transform: 'translateX(-50px)',
  },
  buttonIcon: {
    paddingLeft: 2,
    paddingRight: 30,
    fontSize: 35,
  },
});

export default function Home() {
  const [text, setText] = useState(SECTIONS.getDefaultText());
  const [styling, setStyling] = useState(STYLING.getDefaultStyling());
  const { lines, content } = useMemo(
    () => parseIntoContent(text, styling, setStyling),
    [text]
  );
  const resume = useRef();

  const isMobile = useIsMobile();
  const styles = useMemo(() => getStyles(isMobile), [isMobile]);

  const getPrintButton = () => (
    <Button
      content={
        <div style={styles.buttonContent}>
          <RiCheckFill style={styles.buttonIcon} />
        </div>
      }
      style={styles.button}
      hoverStyle={styles.buttonHover}
    />
  );

  return (
    <>
      <Head>
        <title>ezcv — Easy Resume Maker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={styles.page}>
        <div style={styles.body}>
          <div style={styles.column}>
            <Menu
              content={content}
              lines={lines}
              styling={styling}
              text={text}
              setText={setText}
            />
            <Textbox text={text} content={content} setText={setText} />
          </div>
          <div style={{ ...styles.column, ...styles.right }}>
            <Resume content={content} styling={styling} ref={resume} />
          </div>
          <ReactToPrint
            trigger={() => getPrintButton()}
            content={() => resume.current}
          />
        </div>
      </main>

      <footer />

      <style jsx global>{`
        body {
          background: ${COLORS.background};
        }
        html,
        body,
        div#__next,
        div#__next > div {
          height: 100%;
          padding: 20;
          font-family: Inter;
        }
      `}</style>
    </>
  );
}
