import React, { useState, useRef } from "react";
import Head from "next/head";
import ReactToPrint from "react-to-print";
import Textbox from "../components/Textbox";
import Resume from "../components/Resume";

const styles = {
  body: {
    display: "flex",
    height: "93vh",
    marginBottom: 10,
  },
  column: {
    height: "100%",
    margin: 10,
    width: "50%",
  },
  text: {
    height: "99%",
  },
  doc: {
    backgroundColor: "grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  print: {},
};

function PrintButton() {
  return <button type="button">Print this out!</button>;
}

export default function Home() {
  const [text, setText] = useState("");
  const resume = useRef();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div style={styles.body}>
          <div style={{ ...styles.column, ...styles.text }}>
            <Textbox setText={setText} />
          </div>
          <div style={{ ...styles.column, ...styles.doc }}>
            <Resume text={text} ref={resume} />
          </div>
        </div>
      </main>

      <footer>
        <ReactToPrint trigger={PrintButton} content={() => resume.current} />
        <br />
        <p>fueled by red velvet lattes</p>
      </footer>
    </>
  );
}
