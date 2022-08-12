import React, { useState } from 'react';
import Tab from './Tab';
import Container from './Container';

export default function Tabs({ tabs, openModal }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {tabs.map((tab, index) => (
        <Tab
          title={tab.title}
          isActive={index === activeTab}
          onClick={() => setActiveTab(index)}
          key={tab.title}
        />
      ))}
      {tabs.map((tab, index) => (
        <Container
          tab={tab}
          isActive={index === activeTab}
          openModal={openModal}
          key={tab.title}
        />
      ))}
    </>
  );
}
