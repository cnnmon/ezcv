import React from "react";
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

export function getSection({ header, body }) {
  const sectionKey = header.toLowerCase();
  if (sectionKey in sectionMap) {
    const Component = sectionMap[sectionKey];
    return <Component header={header} body={body} />;
  }
  return sectionMap.other;
}

export function getHeader(text) {
  return <h1>{text}</h1>;
}

function getContent(text) {
  const lines = text.split(/\r?\n/);
  const content = [];
  const sections = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const currSection = sections.length - 1;
    // change body into dictionary
    // const firstWord = line.substring(1, spaceIndex - 1);

    switch (line[0]) {
      case ">":
        sections[currSection].body.push(line.substring(1));
        break;
      case "/":
        sections.push({ header: line.substring(1), body: [] });
        break;
      default:
        break;
    }
  }

  for (let i = 0; i < sections.length; i += 1) {
    content.push(getSection(sections[i]));
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
