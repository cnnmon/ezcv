import React, { useMemo } from "react";
import { getHeader, getDefaultFieldsString, getFirstSpace } from "./utils";
import sx from "./styles"

const fields = {
  name: "Sans Undertale",
  email: "sansundertale@gmail.com",
  degree: "B.A. Clown Science",
  other: ["GPA: 0.0", "Relevant Coursework: Clown Car Driving"],
};

export const getDefaultIntroductionFields = () => getDefaultFieldsString(fields);

export default function Introduction({ header, body }) {
  const content = useMemo(() => {
    const state = { ...fields };
    Object.keys(state).forEach((key) => {
      state[key] = key === "other" ? [] : null;
    });

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
      <div style={sx.container}>
        <div style={sx.left}>
          <p>{dates}</p>
        </div>
        <div style={sx.right}>
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
