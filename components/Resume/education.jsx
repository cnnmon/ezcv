import React from "react";
import { getHeader } from "./utils";

export default function Education({ header, body }) {
  const getEducationBody = (text) => {
    switch (text) {
      case "school":
        return text;
      default:
    }

    return text;
  };

  return (
    <div>
      {getHeader(header)}
      {body.map((el) => getEducationBody(el))}
    </div>
  );
}
