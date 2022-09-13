/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { STYLING, COLORS, TRIGGERS } from '../../../../constants';
import ImageSelect from './ImageSelect';

const Container = styled.div`
  height: calc(100vh - 170px);
  border: 2px solid ${COLORS.darkBrown};
  background: ${COLORS.yellow};
  overflow-x: hidden;
  overflow-y: scroll;

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    height: 500px;
  }
`;

export default function ThemesWindow({ appendStyling, styling }) {
  const all = STYLING.getStyling();
  const { themes, columns, fonts, mode } = all;

  const handleStyleSelect = async (object) => {
    const chosen = all[object.type].find(({ name }) => name === object.name);
    appendStyling(chosen);
  };

  return (
    <Container>
      <ImageSelect
        title="Themes"
        description="Spice up your resume in one click."
        items={themes}
        currentValue={styling.themes}
        onChange={handleStyleSelect}
      />
      <ImageSelect
        title="Fonts"
        description="Change the typeface of your resume."
        items={fonts}
        currentValue={styling.fonts}
        onChange={handleStyleSelect}
        smallWidth
      />
      <ImageSelect
        title="Columns"
        description="One column or two columns. Tip: Switch 'section1' and 'section2' to move columns from left to right."
        items={columns}
        currentValue={styling.columns}
        onChange={handleStyleSelect}
        smallWidth
      />
      <ImageSelect
        title="Mode"
        description="For kicks."
        items={mode}
        currentValue={styling.mode}
        onChange={handleStyleSelect}
        smallWidth
      />
    </Container>
  );
}
