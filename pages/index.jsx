import React, { useState, useRef, useMemo } from "react";
import Head from "next/head";
import ReactToPrint from "react-to-print";
import  { Textbox, Resume, Menu } from "../components";
import { parseIntoContent } from "../utils";
import {
  getSections,
  sectionsTrigger,
  fieldsTrigger,
  styleTrigger,
} from "../constants";

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
  const [text, setText] = useState(`${getSections()[0].char}\n`); // default to name
  const content = useMemo(() => parseIntoContent(text), [text]);
  const resume = useRef();

  const appendToText = (toAppend) => {
    setText(text + toAppend)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div style={styles.body}>
          <div style={{ ...styles.column, height: "99%" }}>
            <Menu content={content} appendToText={appendToText} />
            <Textbox text={text} content={content} setText={setText} />
          </div>
          <div style={{ ...styles.column, ...styles.doc }}>
            <Resume content={content} ref={resume} />
          </div>
        </div>
        <ReactToPrint trigger={PrintButton} content={() => resume.current} />
      </main>

      <footer>
      </footer>
    </>
  );
}
