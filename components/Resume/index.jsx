import React from "react";
import Section from "../Section";

const styles = {
  container: {
    width: "8.4in",
    height: "11in",
    border: "2px solid black",
    backgroundColor: "white",
    transform: "scale(0.6)",
    position: "absolute",
  },
  content: {
    padding: 30,
    whiteSpace: "pre-line",
  },
};

export function getHeader(text) {
  return <h1>{text}</h1>;
}

const Resume = React.forwardRef(({ content }, ref) => (
  <div style={styles.container}>
    <div style={styles.content} ref={ref}>
      {content.map((c, index) => (
        <Section header={c.header} body={c.body} key={index} />
      ))}
    </div>
  </div>
));

export default Resume;
