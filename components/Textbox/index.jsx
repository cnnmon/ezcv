import React, { useRef } from "react";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import { getLastImportantSymbol, parseIntoContent } from "./utils";
import { getSections, getFields, sectionsTrigger, fieldsTrigger, styleTrigger } from "../Section";

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

function Loading() {
  return <span>Loading...</span>;
}

function Item({ selected, entity: { display: { title, description } } }) {
  return (
    <div style={{ ...styles.item, ...(selected ? styles.selected : {}) }}>
      <p><b>{title}</b></p>
      <p>{description}</p>
    </div>
  );
}

// ensures triggers can't be autocompleted on the same line as another trigger
function isTriggerValid(trigger, textbox) {
  const caretPosition = textbox.current.getCaretPosition() - 1;
  const { value } = textbox.current.state;

  return true;

  /*
  if (value.lastIndexOf("\n", caretPosition) === -1) {
    // if first line, checks if last index of / is first index of /
    return (
      value.lastIndexOf(trigger, caretPosition) === value.indexOf(trigger)
    );
  }

  return (
    value.lastIndexOf("\n", caretPosition) >
    getLastImportantSymbol(value, caretPosition - 1)
  );
  */
}

export default function Textbox({ content, setContent }) {
  const textbox = useRef();

  // searches for headers that have not already been placed earlier
  const onSectionsTrigger = (token) => {
    if (isTriggerValid(sectionsTrigger, textbox)) {
      const headers = content.flatMap(({header}, index) => [{header: header, key: index}]);
      return getSections().filter(({ name }) =>
        name.includes(token.toLowerCase()) && !headers.some(({header}) => header === name)
      );
    }
    return [];
  }

  const onFieldsTrigger = (token) => {
    if (isTriggerValid(fieldsTrigger, textbox)) {
      return getFields().filter(({ name }) =>
        name.includes(token.toLowerCase())
      );
    }
    return [];
  }

  const onTextboxChange = (e) => {
    const content = parseIntoContent(e.target.value)
    setContent(content)
  }

  const triggers = {
    [sectionsTrigger]: {
      dataProvider: onSectionsTrigger,
      component: Item,
      output: (item) => item.char,
    },
    [fieldsTrigger]: {
      dataProvider: onFieldsTrigger,
      component: Item,
      output: (item) => item.char,
    },
  };

  return (
    <>
      <p>
        Type {sectionsTrigger} to start a section, or browse through example sections.
        <br />
        Type {fieldsTrigger} to fill up your section. Type {fieldsTrigger}title to start a new subsection.
        <br />
        Type {styleTrigger} to style your section.
      </p>
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
        placeholder={`Start building your resume here!`}
      />
    </>
  );
}
