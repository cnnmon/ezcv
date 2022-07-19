import React, { useRef } from "react";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import { getLastImportantSymbol, parseIntoContent } from "./utils";
import { getSections } from "../Section";

const styles = {
  textbox: {
    width: "100%",
    height: "100%",
    resize: "none",
  },
  container: {
    height: "100%",
  },
  dropdown: {
    position: "absolute",
    fontSize: 15,
    marginTop: "3em",
    border: "1px solid black",
    borderRadius: 5,
    backgroundColor: "white",
    zIndex: 1,
  },
  list: {
    padding: 0,
    margin: 0,
    listStyle: "none",
    lineHeight: 0,
  },
  subtitle: {
    color: "gray",
    fontSize: 12,
  },
  item: {
    margin: 5,
    padding: "10px 5px",
  },
  selected: {
    backgroundColor: "gray",
  },
};

export const phrases = {
  "/": getSections(),
};

function Loading() {
  return <span>loading...</span>;
}

function Item({ selected, entity: { display: { title, description } } }) {
  return (
    <div style={{ ...styles.item, ...(selected ? styles.selected : {}) }}>
      <p><b>{title}</b></p>
      <p>{description}</p>
    </div>
  );
}

function isTriggerValid(caretPosition, textboxValue) {
  if (textboxValue.lastIndexOf("\n", caretPosition) === -1) {
    // if first line, checks if last index of / is first index of /
    return (
      textboxValue.lastIndexOf("/", caretPosition) === textboxValue.indexOf("/")
    );
  }

  // ensures triggers can't be autocompleted on the same line as another trigger
  return (
    textboxValue.lastIndexOf("\n", caretPosition) >
    getLastImportantSymbol(textboxValue, caretPosition - 1)
  );
}

export default function Textbox({ content, setContent }) {
  const textbox = useRef();

  const onTrigger = (token) => {
    const caretPosition = textbox.current.getCaretPosition() - 1;
    const { value } = textbox.current.state;
    if (isTriggerValid(caretPosition, value)) {
      const headers = content.map((c) => c.header)
      return phrases["/"].filter(({ name }) =>
        name.includes(token.toLowerCase()) && !headers.includes(name)
      );
    }
    return [];
  }

  const onTextboxChange = (e) => {
    const content = parseIntoContent(e.target.value)
    setContent(content)
  }

  const triggers = {
    "/": {
      dataProvider: onTrigger,
      component: Item,
      output: (item) => item.char,
    },
  };

  return (
    <ReactTextareaAutocomplete
      loadingComponent={Loading}
      trigger={triggers}
      minChar={0}
      style={styles.textbox}
      dropdownStyle={styles.dropdown}
      listStyle={styles.list}
      ref={textbox}
      containerStyle={styles.container}
      onChange={onTextboxChange}
      placeholder="Type / for a menu..."
    />
  );
}
