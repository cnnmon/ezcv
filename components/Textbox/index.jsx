import React, { useMemo, useRef } from "react";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import { useIsMobile } from "../../utils";
import { getFields, trigger, COLORS } from "../../constants";
import { DropdownItem } from "../../components";

const getStyles = (isMobile) => ({
  textbox: {
    border: "1.5px solid black",
    backgroundColor: COLORS.yellow,
    padding: 15,
    boxSizing: "border-box",
    width: "100%",
    height: isMobile ? 400 : "100%",
    marginBottom: isMobile ? 10 : undefined,
    resize: "none",
    outline: "none",
    fontFamily: "Inter",
  },
  container: {
    height: "calc(100% - 150px)",
  },
  dropdown: {
    position: "absolute",
    fontSize: 13,
    marginTop: "3em",
    border: "1.5px solid black",
    backgroundColor: COLORS.redOrange,
    zIndex: 1,
    marginTop: 170,
    marginLeft: 20,
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
});

function Loading() {
  return <span>Loading...</span>;
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

  const isMobile = useIsMobile();
  const styles = useMemo(() => getStyles(isMobile), [isMobile]);

  const onTrigger = (values, token) => {
    return values.filter(({ name }) =>
      name.startsWith(token.toLowerCase())
    );
  }

  const triggers = {
    [trigger]: {
      dataProvider: (token) => onTrigger(getFields(), token),
      component: DropdownItem,
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
      placeholder="Type * to start building your resume!"
    />
  );
}
