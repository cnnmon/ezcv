/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { STYLING, COLORS } from '../../../../constants';
import ImageSelect from './ImageSelect';

const styles = {
  container: {
    borderTop: `2px solid ${COLORS.darkBrown}`,
    height: 'calc(100vh - 170px)',
    border: `2px solid ${COLORS.darkBrown}`,
    background: COLORS.yellowGreen,
  },
};

export default function ThemesWindow({ onClick, styling }) {
  const { theme } = styling;
  const all = STYLING.getStyling();
  const allThemes = all.theme;

  const oneColumn = allThemes.filter(({ alignment }) => !alignment);
  const twoColumn = allThemes.filter(({ alignment }) => alignment);

  const handleStyleSelect = (object) => {
    onClick(all[object.type].find(({ name }) => name === object.name));
  };

  return (
    <div style={styles.container}>
      <ImageSelect
        title="One-Column Themes"
        description="Ol' reliable one-column resumes."
        items={oneColumn}
        currentValue={theme}
        onChange={handleStyleSelect}
      />
      <ImageSelect
        title="Two-Column Themes"
        description="Compact and lively. (Switch keywords like 'section1' and 'section2' to move each section between columns!)"
        items={twoColumn}
        currentValue={theme}
        onChange={handleStyleSelect}
      />
    </div>
  );
}
