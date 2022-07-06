import React from "react";
import { getFirstImportantSymbol } from "./utils";
import Education from "./education";

const styles = {
  container: {
    width: "8.4in",
    height: "11in",
    border: "2px solid black",
    backgroundColor: "white",
    transform: "scale(0.5);",
    position: "absolute",
  },
  content: {
    padding: 30,
    whiteSpace: "pre-line",
  },
};

const sectionMap = {
  education: Education,
  experience: Education,
  projects: Education,
  honors: Education,
  skills: Education,
  organizations: Education,
  other: Education,
};

export function getSection({ header, body }, key) {
  const sectionKey = header.toLowerCase();
  if (sectionKey in sectionMap) {
    const Component = sectionMap[sectionKey];
    return <Component header={header} body={body} key={key} />;
  }
  return sectionMap.other;
}

export function getHeader(text) {
  return <h1>{text}</h1>;
}

function getContent(text) {
  const lines = text.split(/\r?\n/);
  const content = [];
  const sections = [{ header: "", body: [] }];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const firstImportantSymbol = getFirstImportantSymbol(line); // used to allow stray spaces/comments
    switch (line[firstImportantSymbol]) {
      case ">":
        sections[sections.length - 1].body.push(
          line.substring(firstImportantSymbol + 1)
        );
        break;
      case "/":
        sections.push({
          header: line.substring(firstImportantSymbol + 1),
          body: [],
        });
        break;
      default:
        break;
    }
  }

  for (let i = 0; i < sections.length; i += 1) {
    content.push(getSection(sections[i], i));
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
