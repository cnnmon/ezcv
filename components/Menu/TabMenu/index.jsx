import React, { useState } from 'react';
import Tab from './Tab';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
};

export default function TabMenu({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={styles.container}>
      <div>
        {tabs.map((tab, index) => (
          <Tab
            title={tab.title}
            isActive={index === activeTab}
            onClick={() => setActiveTab(index)}
            key={tab.title}
          />
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          style={{
            display: index === activeTab ? 'flex' : 'none',
            flexDirection: 'column',
            flexGrow: 1,
          }}
          key={tab.title}
        >
          {tab.getTab(tab, index === activeTab)}
        </div>
      ))}
    </div>
  );
}
