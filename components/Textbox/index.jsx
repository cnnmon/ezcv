import React, { useRef } from 'react';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import { getFields, TRIGGERS, COLORS } from '../../constants';
import DropdownItem from './DropdownItem';

const styles = {
  textarea: {
    border: `1.5px solid ${COLORS.darkBrown}`,
    backgroundColor: COLORS.yellow,
    padding: 15,
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    minHeight: 300,
    resize: 'none',
    outline: 'none',
    fontFamily: 'Inter',
  },
  container: {
    height: 'calc(100% - 300px)',
  },
  dropdown: {
    position: 'absolute',
    fontSize: 13,
    border: `1.5px solid ${COLORS.darkBrown}`,
    backgroundColor: COLORS.redOrange,
    zIndex: 1,
    marginTop: 170,
    marginLeft: 20,
  },
  list: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    lineHeight: 0,
  },
  subtitle: {
    color: 'gray',
    fontSize: 12,
  },
};

function Loading() {
  return <span>Loading...</span>;
}

export default function Textbox({ text, setText }) {
  const textbox = useRef();

  const onTrigger = (values, token) =>
    values.filter(({ name }) => name.startsWith(token.toLowerCase()));

  const triggers = {
    [TRIGGERS.trigger]: {
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
      dropdownStyle={styles.dropdown}
      listStyle={styles.list}
      ref={textbox}
      style={styles.textarea}
      containerStyle={styles.container}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type * to start building your resume!"
    />
  );
}
