/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { STYLING, COLORS, TRIGGERS } from '../../../../constants';
import ImageSelect from './ImageSelect';

const styles = {
  container: {
    borderTop: `2px solid ${COLORS.darkBrown}`,
    height: 'calc(100vh - 170px)',
    border: `2px solid ${COLORS.darkBrown}`,
    background: COLORS.yellowGreen,
    overflowX: 'hidden',
  },
};


export default function ThemesWindow({ onClick, styling }) {
  const all = STYLING.getStyling();
  const { themes, columns, headers } = all;

  const handleStyleSelect = (object) => {
    onClick(all[object.type].find(({ name }) => name === object.name));
  };

  return (
    <div style={styles.container}>
      <ImageSelect
        title="Themes"
        description="Spice up your resume in one click."
        items={themes}
        currentValue={styling.themes}
        onChange={handleStyleSelect}
      />
      <ImageSelect
        title="Columns"
        description="One column or two columns. Tip: Switch 'section1' and 'section2' to move columns from left to right."
        items={columns}
        currentValue={styling.columns}
        onChange={handleStyleSelect}
      />
      <ImageSelect
        title="Headers"
        description="Changes only the #header section."
        items={headers}
        currentValue={styling.headers}
        onChange={handleStyleSelect}
      />
    </div>
  );
}
