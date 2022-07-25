import React, { useMemo, useState } from "react";
import { getSections } from "../../constants";

const styles = {
  container: {
    display: "flex",
    backgroundColor: "gray",
    height: 90,
    overflowX: "scroll",
    marginBottom: 10,
  },
  item: {
    margin: "7px 0px 7px 10px",
    backgroundColor: "white",
    cursor: "pointer",
    boxShadow: "none",
  },
};

function Item({ section, appendToText }) {
  const [hover, setHover] = useState(false)

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {setHover(false)}}
      onClick={() => appendToText(`\n${section.char}\n`)}
      style={styles.item}
    >
      <img src={section.icon} />
      {section.name}
    </button>
  )
}

export default function Menu({ content, appendToText }) {
  const sections = getSections()

  const filteredSections = useMemo(() => {
    const headers = content.flatMap(({ header }, index) => [
      { header, key: index },
    ]);

    return sections.filter(({ name }) => !headers.some(({ header }) => header === name))
  }
  ,[content])

  return (
      <div style={styles.container}>
        {filteredSections.map((e, index) => <Item section={e} appendToText={appendToText} key={index} />)}
      </div>
  );
}
