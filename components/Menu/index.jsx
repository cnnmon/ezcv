import React, { useMemo } from 'react';
import { getKeyValuePair } from '../../utils';
import { STYLING, SECTIONS, TRIGGERS } from '../../constants';
import List from './List';

export default function Menu({ content, lines, text, setText }) {
  const filteredSections = useMemo(() => {
    const headers = content.flatMap(({ header }, index) => [
      { header, key: index },
    ]);
    return SECTIONS.getSections().filter(
      ({ name }) => !headers.some(({ header }) => header === name)
    );
  }, [content]);

  const appendStyling = (object) => {
    const toAppend = object.char;
    const isEmpty = (t) => t === '';
    const isStyling = (t) => t[0] === TRIGGERS.stylingTrigger;

    // checks if styling property has been defined
    // all should be at the top together
    let i = 0;
    while (i < lines.length && isStyling(lines[i])) {
      const { key } = getKeyValuePair(lines[i].substring(1));

      if (key === object.type) {
        const newLines = [...lines];
        newLines[i] = object.char;
        setText(newLines.join('\n'));
        return;
      }

      i += 1;
    }

    // else, move it down
    const firstSecondEmpty = isEmpty(lines[0]) && isEmpty(lines[1]);
    const newLines = `${
      !isEmpty(lines[0]) && !isStyling(lines[0]) ? '\n' : ''
    }${!isEmpty(lines[1]) || !isStyling(lines[1]) ? '\n' : ''}`;
    setText(
      `${toAppend}${firstSecondEmpty ? '' : newLines}${lines.join('\n')}`
    );
  };

  const appendToText = (object) => {
    const toAppend = object.char;
    const isTextboxEmpty = lines.length === 1 && lines[0] === '';
    if (isTextboxEmpty) {
      setText(toAppend);
      return;
    }

    // ensures appending around 2+ spaces from the last line of text
    const lastLine = lines[lines.length - 1];
    const lastLastLine = lines[lines.length - 2];
    const newLines = `${lastLine !== '' ? '\n' : ''}${
      lastLastLine !== '' ? '\n' : ''
    }`;
    setText(`${text}${newLines}${toAppend}\n`);
  };

  return (
    <>
      <List
        items={[SECTIONS.getEmptySection(), ...filteredSections]}
        onClick={appendToText}
      />
      <List
        items={STYLING.getStyling()}
        onClick={appendStyling}
        // isHighlighted={(object) => styling.} TODO: ADD HIGHLIGHTING...
      />
    </>
  );
}
