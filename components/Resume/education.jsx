import React, { useMemo } from "react";
import { getHeader, getDefaultFieldsString, getFirstSpace } from "./utils";

const styles = {
  container: {},
  left: {
    width: "30%",
    float: "left",
    lineHeight: 0.4,
  },
  right: {
    width: "70%",
    float: "right",
    lineHeight: 0.4,
  },
};

const fields = {
  school: "University of Clown, Cincinnati",
  dates: "Aug 1555 - May 2020",
  degree: "B.A. Clown Science",
  other: ["GPA: 0.0", "Relevant Coursework: Clown Car Driving"],
};

export const getDefaultEducationFields = () => getDefaultFieldsString(fields);

export default function Education({ header, body }) {
  const content = useMemo(() => {
    const state = { ...fields };
    Object.keys(state).forEach((key) => {
      state[key] = key === "other" ? [] : null;
    });

    // change to /h2
    for (let i = 0; i < body.length; i += 1) {
      const text = body[i];
      const spaceIndex = getFirstSpace(text);
      const key = text.substring(0, spaceIndex);
      const value = text.substring(spaceIndex + 1);
      if (key in state && key !== "other") {
        state[key] = value;
      } else if (text.length > 0) {
        state.other.push(text);
      }
    }

    return state;
  }, [body]);

  const { degree, school, dates, other } = content;

  return (
    <>
      {getHeader(header)}
      <div styles={styles.container}>
        <div style={styles.left}>
          <p>{dates}</p>
        </div>
        <div style={styles.right}>
          <p>
            {degree && <b>{degree}, </b>}
            {school}
          </p>
          {other.map((e) => (
            <p>{e}</p>
          ))}
        </div>
      </div>
    </>
  );
}
