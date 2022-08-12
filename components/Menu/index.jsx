import React, { useState, useMemo } from 'react';
import { STYLING, SECTIONS, TRIGGERS } from '../../constants';
import Tabs from './Tabs';
import { getKeyValuePair } from '../../utils';
import Modal from './Modal';

export default function Menu({ content, styling, lines, text, setText }) {
  const [activeItem, setActiveItem] = useState(-1);

  const openModal = (index) => {
    setActiveItem(index);
  };

  const closeModal = () => {
    setActiveItem(-1);
  };

  /* Actions from selecting from the menu */
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

    // else, move the rest of the text down & append at top
    const firstSecondEmpty = isEmpty(lines[0]) && isEmpty(lines[1]);
    const newLines = `${
      !isEmpty(lines[0]) && !isStyling(lines[0]) ? '\n' : ''
    }${!isEmpty(lines[1]) || !isStyling(lines[1]) ? '\n' : ''}`;
    setText(
      `${toAppend}${firstSecondEmpty ? '' : newLines}${lines.join('\n')}`
    );
  };

  const appendToText = (toAppend) => {
    // const toAppend = object.char;
    console.log(toAppend)
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

  const stylings = STYLING.getStyling();

  const tabs = [
    {
      title: 'Sections',
      items: [SECTIONS.getExampleSection(), ...SECTIONS.getSections()],
      onClick: appendToText,
      opensModal: true,
      isSelected: (object) => {
        const headers = content.flatMap(({ header }, index) => [
          { header, key: index },
        ]);
        return headers.find(({ header }) => header === object.name)
      },
    },
    {
      title: 'Main Style',
      items: stylings.theme,
      onClick: appendStyling,
      isSelected: (object) => styling[object.type].key === object.key,
    },
    {
      title: 'Header Style',
      items: stylings.headers,
      onClick: appendStyling,
      isSelected: (object) => styling[object.type].key === object.key,
    },
  ];

  return (
    <>
      <Modal
        item={activeItem}
        closeModal={closeModal}
        appendToText={appendToText}
        styling={styling}
      />
      <Tabs tabs={tabs} openModal={openModal} />
    </>
  );
}
