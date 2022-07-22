import React, { useState, useRef } from "react";
import Head from "next/head";
import ReactToPrint from "react-to-print";
import Textbox from "../components/Textbox";
import Resume from "../components/Resume";
import {
  sectionsTrigger,
  fieldsTrigger,
  styleTrigger,
} from "../components/constants";

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
  const [content, setContent] = useState([]);
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
            <Textbox content={content} setContent={setContent} />
          </div>
          <div style={{ ...styles.column, ...styles.doc }}>
            <Resume content={content} ref={resume} />
          </div>
        </div>
      </main>

      <footer>
        <ReactToPrint trigger={PrintButton} content={() => resume.current} />
        <p>
          Type {sectionsTrigger} to start a section, or browse through example
          sections.
          <br />
          Type {fieldsTrigger} to fill up your section. Type {fieldsTrigger}
          title to start a new subsection.
          <br />
          Type {styleTrigger} to style your section.
        </p>
      </footer>
    </>
  );
}
