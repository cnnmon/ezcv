import React, { useState, useEffect, useRef, useMemo } from 'react';
import Head from 'next/head';
import ReactToPrint from 'react-to-print';
import Image from 'next/image';
import styled from 'styled-components';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Textbox, Resume, Menu, PrintButton } from '../components';
import { parseIntoContent } from '../utils';
import { STYLING, COLORS, SECTIONS, TRIGGERS } from '../constants';
import logo from '../public/logo.png';

const styles = {
  page: {
    height: '90%',
    margin: 10,
  },
  logo: {
    margin: '20px 5px',
  },
};

const Body = styled.div`
  display: flex;
  height: 100%;

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    display: block;
  }
`;

const ColumnLeft = styled.div`
  min-width: 49.5%;
  max-width: 49.5%;

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    min-width: 100%;
    max-width: 100%;
  }
`;

const ColumnRight = styled(ScrollContainer)`
  margin-left: 10px;
  border: 1.5px solid ${COLORS.darkBrown};
  background-color: ${COLORS.redOrange};
  overflow: scroll;

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    height: 1000px;
    margin-left: 0;
  }
`;

export default function App() {
  const [text, setText] = useState(SECTIONS.getDefaultText());
  const [styling, setStyling] = useState(STYLING.getDefaultStyling());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedText = localStorage.getItem('text');

      if (storedText !== null) {
        setText(storedText);
      }
    }
  }, []);

  const handleTextChange = (newText) => {
    localStorage.setItem('text', newText);
    setText(newText);
  };

  /* Info parsed from plaintext */
  const { lines, content } = useMemo(
    () => parseIntoContent(text, styling, setStyling),
    [text]
  );

  /* Resume reference for print */
  const resume = useRef();

  return (
    <>
      <Head>
        <title>ezcv — Easy Resume Maker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={styles.page}>
        <Body>
          <ColumnLeft>
            <div style={styles.logo}>
              <Image src={logo} width={100} height={100} />
            </div>
            <Menu
              content={content}
              lines={lines}
              styling={styling}
              text={text}
              setText={handleTextChange}
            />
            <Textbox text={text} content={content} setText={handleTextChange} />
          </ColumnLeft>
          <ColumnRight>
            <Resume content={content} styling={styling} ref={resume} />
          </ColumnRight>
        </Body>
        <ReactToPrint trigger={PrintButton} content={() => resume.current} />
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
          height: 99%;
          padding: 20;
          font-family: Open Sans;
        }

        button,
        input,
        textarea {
          font-family: Open Sans;
        }

        ::-webkit-scrollbar {
          width: 3px;
          height: 3px;
        }

        ::-webkit-scrollbar-track {
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: ${COLORS.darkBrown};
        }

        ::-webkit-input-placeholder {
          color: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
}
