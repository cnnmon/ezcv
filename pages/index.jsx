import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Button, Upload } from '../components';
import { COLORS } from '../constants';
import logo from '../public/logo.png';
import { useAppContext } from '../context/state';

const styles = {
  page: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 1000,
    display: 'flex',
  },
  left: {
    marginRight: 20,
    fontSize: 35,
  },
  right: {
    textAlign: 'center',
  },
  headerContainer: {
    position: 'fixed',
    top: 0,
    borderBottom: `1.5px solid ${COLORS.darkBrown}`,
    padding: 20,
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    maxWidth: 1000,
  },
  button: {
    padding: '15px 80px',
    fontSize: 20,
    background: 'black',
    color: COLORS.background,
    fontWeight: 300,
  },
};

const Left = styled.div`
  margin-right: 20px;
  font-size: 35px;
`;

const Divider = styled.p`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #000;
  line-height: 0.1em;
  margin: 10px 0 20px;

  span {
    background: ${COLORS.background};
    padding: 0 10px;
  }
`;

export default function App() {
  const { setSections } = useAppContext();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>ezcv — Easy Resume Maker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={styles.page}>
        <div style={styles.headerContainer}>
          <div style={styles.header}>
            <Image alt="logo" src={logo} width={80} height={80} />
          </div>
        </div>
        <div style={styles.contentContainer}>
          <Left>
            <h1>Turn text into a customizable resume in seconds.</h1>
            <Button
              content="Get Started"
              onClick={() => router.push('/builder')}
              style={styles.button}
            />
          </Left>
          <div style={styles.right}>
            <Upload setSections={setSections} />
            <Divider>
              <span>or</span>
            </Divider>
            <Link href="/builder">Create something from scratch!</Link>
          </div>
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
          height: 99%;
          padding: 20;
          font-family: Mabry;
        }

        a {
          color: ${COLORS.red};
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
