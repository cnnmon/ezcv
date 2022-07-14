import React from "react";
import sections from "../Sections";

const styles = {
  container: {
    width: "8.4in",
    height: "11in",
    border: "2px solid black",
    backgroundColor: "white",
    transform: "scale(0.7);",
    position: "absolute",
  },
  content: {
    padding: 30,
    whiteSpace: "pre-line",
  },
};

export function getSection({ header, body }, key) {
  const searchKey = header.toLowerCase();
  if (searchKey in sections) {
    const Component = sections[searchKey];
    return <Component header={header} body={body} key={key} />;
  }
  return sections.other;
}

export function getHeader(text) {
  return <h1>{text}</h1>;
}

function getContent(text) {
  const lines = text.split(/\r?\n/);
  const content = [];
  const s = [{ header: "", body: [] }];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmedLine = line.trim();
    switch (trimmedLine[0]) {
      case ">":
        if (trimmedLine[1] === "*") {
          // not super necessary, just here for readability
          s[s.length - 1].body.push(
            trimmedLine.substring(2).trim()
          );
        } else {
          s[s.length - 1].body.push(trimmedLine.substring(1));
        }
        break;
      case "/":
        s.push({
          header: trimmedLine.substring(1),
          body: [],
        });
        break;
      default:
        break;
    }
  }

  for (let i = 0; i < s.length; i += 1) {
    content.push(getSection(s[i], i));
  }

  return content;
}

const Resume = React.forwardRef(({ text }, ref) => {
  const content = getContent(text);
  return (
    <div style={styles.container}>
      <div style={styles.content} ref={ref}>
        {content.map((section) => section)}
      </div>
    </div>
  );
});

export default Resume;
