import React, { useRef } from "react";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import { getFields, fieldsTrigger } from "../../constants";

const styles = {
  textbox: {
    width: "99%",
    height: "calc(100% - (90px + 10px))",
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
    marginTop: 150,
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

function Item({
  selected,
  entity: {title, description}
}) {
  return (
    <div style={{ ...styles.item, ...(selected ? styles.selected : {}) }}>
      <p>
        <b>{title}</b>
      </p>
      <p>{description}</p>
    </div>
  );
}

// ensures triggers can't be autocompleted on the same line as another trigger
function isTriggerValid(trigger, textbox) {
  return true;

  /* TODO: fix this
  const caretPosition = textbox.current.getCaretPosition() - 1;
  const { value } = textbox.current.state;

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

export default function Textbox({ text, content, setText }) {
  const textbox = useRef();

  const onTrigger = (values, token) => {
    return values.filter(({ name }) =>
      name.includes(token.toLowerCase())
    );
  }

  const triggers = {
    /* TODO: do i need this?
    [sectionsTrigger]: {
      dataProvider: (token) => onTrigger(getSectionsAutocomplete(), token),
      component: Item,
      output: (item) => item.char,
    },
    */
    [fieldsTrigger]: {
      dataProvider: (token) => onTrigger(getFields(), token),
      component: Item,
      output: (item) => item.char,
    },
  };

  return (
    <ReactTextareaAutocomplete
      value={text}
      loadingComponent={Loading}
      trigger={triggers}
      minChar={0}
      style={styles.textbox}
      dropdownStyle={styles.dropdown}
      listStyle={styles.list}
      ref={textbox}
      containerStyle={styles.container}
      onChange={(e) => setText(e.target.value)}
      placeholder="Start building your resume here!"
    />
  );
}
