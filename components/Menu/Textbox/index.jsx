import React from 'react';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import { COLORS, TRIGGERS, FIELDS } from '../../../constants';

const styles = {
  textarea: {
    width: '100%',
    border: `2px solid ${COLORS.darkBrown}`,
    backgroundColor: COLORS.yellow,
    padding: 15,
    boxSizing: 'border-box',
    minHeight: 300,
    resize: 'none',
    outline: 'none',
    fontFamily: 'Inter',
    fontSize: 13,
    height: '100%',
  },
  container: {
    flexGrow: 1,
  },
  dropdown: {
    position: 'absolute',
    marginTop: '30%',
    backgroundColor: COLORS.background,
    border: `2px solid ${COLORS.darkBrown}`,
    height: 300,
    width: 380,
    overflowY: 'scroll',
  },
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  item: {
    padding: 10,
  },
};

function Item({ selected, entity: { name, description } }) {
  const style = {
    padding: 10,
    minWidth: 150,
    ...(selected
      ? { background: COLORS.darkBrown, color: COLORS.background }
      : {
          background: COLORS.orange,
        }),
  };

  return (
    <div style={style}>
      <p>
        <b>#{name}</b>
        <br />
        {description}
      </p>
    </div>
  );
}

function Loading() {
  return <div>Loading</div>;
}

export default function Textbox({ text, setText, textbox, readOnly = false }) {
  const fields = FIELDS.getFields();

  const onTrigger = (token) =>
    fields.filter(({ name }) => name.includes(token.toLowerCase()));

  const trigger = {
    [TRIGGERS.trigger]: {
      dataProvider: onTrigger,
      component: Item,
      output: (item) => item.char,
    },
  };

  return (
    <ReactTextareaAutocomplete
      value={text}
      ref={textbox}
      loadingComponent={Loading}
      trigger={trigger}
      style={styles.textarea}
      containerStyle={styles.container}
      dropdownStyle={styles.dropdown}
      listStyle={styles.list}
      readOnly={readOnly}
      minChar={0}
      onChange={(e) => setText(e.target.value)}
      placeholder="Click on the sections above to start building your resume, or type #!"
    />
  );
}
