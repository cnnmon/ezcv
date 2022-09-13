import React, { useRef } from 'react';
import TabMenu from './TabMenu';
import SectionsWindow from './Windows/SectionsWindow';
import Textbox from './Textbox';
import ThemesWindow from './Windows/ThemesWindow';
import getAppendJobs from './utils';

export default function Menu({ content, styling, lines, text, setText }) {
  const textbox = useRef();

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
        key={tab.title}
      />
      <Textbox text={text} setText={setText} textbox={textbox} />
    </>
  );

  const getThemesWindow = (tab) => (
    <ThemesWindow
      styling={styling}
      appendStyling={appendStyling}
      key={tab.title}
    />
  );

  const TABS = [
    {
      title: 'Sections',
      getTab: getSectionsWindow,
    },
    {
      title: 'Themes',
      getTab: getThemesWindow,
    },
  ];

  return <TabMenu tabs={TABS} />;
}

export { Textbox };
