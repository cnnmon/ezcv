import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import ReactToPrint from 'react-to-print';
import Image from 'next/image';
import styled from 'styled-components';
import ScrollContainer from 'react-indiana-drag-scroll';
import { AiOutlineDownload } from 'react-icons/ai';
import { Resume, Menu, Button } from '../components';
import { parseIntoContent } from '../utils';
import { SECTIONS, STYLING, COLORS, TRIGGERS } from '../constants';
import logo from '../public/logo.png';

const styles = {
  page: {
    height: '100%',
  },
  button: {
    padding: '20px',
    borderLeft: `2px solid ${COLORS.darkBrown}`,
    borderTop: 'none',
    borderBottom: 'none',
    borderRight: 'none',
    fontWeight: 'normal',
    fontFamily: 'Mabry',
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    background: COLORS.yellow,
  },
  hover: {
    background: COLORS.red,
    color: COLORS.darkBrown,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    padding: 15,
    cursor: 'pointer',
  },
  right: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
};

const Header = styled.div`
  margin-bottom: 10px;
  border-bottom: 2px solid ${COLORS.darkBrown};
  display: flex;
  flex-grow: 1;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 10px 30px;
  height: calc(100vh - 130px);

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    display: block;
  }
`;

const ColumnLeft = styled.div`
  min-width: 49.5%;
  max-width: 49.5%;
  height: 100%;
  flex-direction: column;

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    min-width: 100%;
    max-width: 100%;
    margin-bottom: 10px;
  }
`;

const ColumnRight = styled(ScrollContainer)`
  margin-left: 10px;
  border: 2px solid ${COLORS.darkBrown};
  background-color: ${COLORS.redOrange};
  overflow: scroll;
  height: 100%;

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    height: 1000px;
    margin-left: 0;
  }
`;

function HeaderButton({ content, onClick, style }) {
  return (
    <Button
      content={<div style={styles.content}>{content}</div>}
      style={{ ...styles.button, ...style }}
      onClick={onClick}
      hoverStyle={styles.hover}
    />
  );
}

export default function Builder() {
  // const { sections } = useAppContext();
  const [text, setText] = useState(SECTIONS.getDefaultText());
  const [styling, setStyling] = useState(STYLING.getDefaultStyling());
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedText = localStorage.getItem('text');

      // if not taking from resume
      if (storedText !== null && storedText !== '') {
        setText(storedText);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    setIsCopying(true);
    setTimeout(() => {
      setIsCopying(false);
    }, [600]);
  };

  const handleTextChange = (newText) => {
    localStorage.setItem('text', newText);
    setText(newText);
  };

  /* Info parsed from plaintext */
  const { lines, content } = useMemo(
    () => parseIntoContent(text, styling, setStyling),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Header>
          <div style={styles.logo}>
            <Link href="/">
              <Image src={logo} alt="logo" width={60} height={60} />
            </Link>
          </div>

          <div style={styles.right}>
            <HeaderButton
              content={isCopying ? 'Copied!' : 'Copy Text'}
              onClick={handleCopyText}
            />

            <ReactToPrint
              documentTitle="Resume"
              trigger={() =>
                HeaderButton({
                  content: (
                    <div style={styles.center}>
                      Export <AiOutlineDownload />
                    </div>
                  ),
                  style: { background: COLORS.darkBrown, color: 'white' },
                })
              }
              content={() => resume.current}
            />
          </div>
        </Header>
        <Body>
          <ColumnLeft>
            <div style={styles.page}>
              <Menu
                content={content}
                lines={lines}
                styling={styling}
                text={text}
                setText={handleTextChange}
              />
            </div>
          </ColumnLeft>
          <ColumnRight>
            <Resume content={content} styling={styling} ref={resume} />
          </ColumnRight>
        </Body>
      </main>

      <footer />

      <style jsx global>{`
        body {
          background: ${COLORS.background};
          margin: 0;
          font-family: Helvetica;
        }

        button,
        input,
        textarea,
        select {
          font-size: 13px;
          font-family: Helvetica;
        }

        p {
          font-size: 13px;
        }

        ::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }

        ::-webkit-scrollbar-track {
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background-color: ${COLORS.darkBrown};
        }

        ::-webkit-input-placeholder {
          color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </>
  );
}
