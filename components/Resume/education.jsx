import React, { useMemo } from "react";
import { getHeader, getDefaultFieldsString, getFirstSpace } from "./utils";

const styles = {
  body: {
    whiteSpace: "pre-line",
  },
};

const fields = {
  school: "University of Clown, Cincinnati",
  dates: "Aug 1555 - May 2020",
  degree: "B.A. Clown Science",
  gpa: "0.0",
  coursework: "Data Structures, Algorithms, Clown Car Driving",
  other: [],
};

export const getDefaultEducationFields = () => getDefaultFieldsString(fields);

export default function Education({ header, body }) {
  const content = useMemo(() => {
    // change to /h2
    for (let i = 0; i < body.length; i += 1) {
      const text = body[i];
      const spaceIndex = getFirstSpace(text);
      const key = text.substring(0, spaceIndex);
      const value = text.substring(spaceIndex + 1);
      if (key in fields) {
        fields[key] = value;
      } else {
        fields.other.push(value);
      }
    }
    return fields;
  }, [body]);

  return (
    <div styles={styles.body}>
      {getHeader(header)}
      <div>
        <div>
          <b>{content.school}</b>
        </div>
        <div>
          <p>{content.dates}</p>
        </div>
      </div>
      <p>{content.degree}</p>
      <p>GPA: {content.gpa}</p>
      <p>Coursework: {content.coursework}</p>
    </div>
  );
}
