import React, { useState, useRef } from 'react';
import TabMenu from './TabMenu';
import SectionsWindow from './Windows/SectionsWindow';
import Modal from './Modal';
import Textbox from './Textbox';
import ThemesTab from './Windows/ThemesWindow';
import getAppendJobs from './utils';

export default function Menu({ content, styling, lines, text, setText }) {
  const [activeItem, setActiveItem] = useState(null);
  const textbox = useRef();

  const openModal = (item) => {
    setActiveItem(item);
  };

  const closeModal = () => {
    setActiveItem(null);
  };
  const { appendStyling, appendSection } = getAppendJobs(
    lines,
    text,
    setText,
    textbox
  );

  const getSectionsWindow = (tab) => (
    <>
      <SectionsWindow
        content={content}
        onClick={appendSection}
        openModal={openModal}
        key={tab.title}
      />
      <Textbox text={text} setText={setText} textbox={textbox} />
    </>
  );

  const getThemesTab = (tab) => (
    <ThemesTab styling={styling} onClick={appendStyling} key={tab.title} />
  );

  const TABS = [
    {
      title: 'Sections',
      getTab: getSectionsWindow,
    },
    {
      title: 'Themes',
      getTab: getThemesTab,
    },
  ];

  return (
    <>
      <Modal
        item={activeItem}
        closeModal={closeModal}
        appendSection={appendSection}
        styling={styling}
      />
      <TabMenu tabs={TABS} />
    </>
  );
}

export { Textbox };
