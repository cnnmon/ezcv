/* eslint-disable react/display-name */
import React from 'react';
import styled from 'styled-components';
import { TRIGGERS, COLORS, STYLING } from '../../constants';
import OneColumn from './OneColumn';
import TwoColumn from './TwoColumn';
import Content from './Content';

const WIDTH = '8.2in';
const HEIGHT = '11in';
const SCALE = '0.9';
const MOBILESCALE = '0.6';

const styles = {
  content: {
    padding: 30,
    whiteSpace: 'pre-line',
    fontSize: 12.5,
    overflow: 'hidden',
    maxHeight: '95%',
  },
};

const Container = styled.div`
  max-width: ${WIDTH};
  min-width: ${WIDTH};
  max-height: ${HEIGHT};
  min-height: ${HEIGHT};
  overflow: hidden;
  transform: scale(${SCALE});
  border: 3px solid ${COLORS.darkBrown};
  background-color: white;

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    transform: scale(${MOBILESCALE});
  }
`;

export function getHeader(text) {
  return <h1>{text}</h1>;
}

const Resume = React.forwardRef(({ styling, content }, ref) => {
  const { alignment } = styling.columns;

  return (
    <Container>
      <div style={styles.content} ref={ref}>
        {alignment !== STYLING.ALIGNMENT.CENTER ? (
          <TwoColumn
            alignment={alignment}
            content={content}
            styling={styling}
          />
        ) : (
          <OneColumn content={content} styling={styling} />
        )}
        <style jsx global>{`
          a {
            color: black;
            text-decoration: none;
          }
        `}</style>
      </div>
    </Container>
  );
});

export default Resume;
export { Content };
