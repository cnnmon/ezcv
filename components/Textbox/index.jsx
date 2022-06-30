import React from "react";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import phrases from "../../constants/phrases";

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
  return <span>loading...</span>;
}

function Item({ selected, entity: { name, description } }) {
  return (
    <div style={{ ...styles.item, ...(selected ? styles.selected : {}) }}>
      <p>/{name}</p>
      <p>{description}</p>
    </div>
  );
}

export default function Textbox({ setText }) {
  const triggers = {
    "/": {
      dataProvider: (token) =>
        phrases["/"].filter(({ name }) => name.includes(token.toLowerCase())),
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
      containerStyle={styles.container}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
