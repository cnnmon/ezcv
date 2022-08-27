/* eslint-disable react/display-name */
import React from 'react';
import styled from 'styled-components';
import Subsection from '../Subsection';
import { TRIGGERS, COLORS } from '../../constants';
import OneColumn from './OneColumn';
import TwoColumn from './TwoColumn';

const WIDTH = '8.2in';
const HEIGHT = '11in';
const SCALE = '0.9';
const MOBILESCALE = '0.6';

const styles = {
  content: {
    padding: 30,
    whiteSpace: 'pre-line',
    lineHeight: 1.4,
    fontSize: 13,
  },
};

const Container = styled.div`
  margin: 20px;
  max-width: ${WIDTH};
  min-width: ${WIDTH};
  max-height: ${HEIGHT};
  min-height: ${HEIGHT};
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
  const { alignment } = styling.theme;

  const getBody = ({ body, ...section }, i) => (
    <div key={i}>
      {body.map((subsection, index) => (
        <div key={`${i + 1}${index + 1}`}>
          <Subsection
            styling={styling}
            header={section.header}
            type={section.type}
            subsection={subsection}
            subsectionIndex={index}
          />
        </div>
      ))}
    </div>
  );

  const getContent = (items) =>
    items.map((section, index) => getBody(section, index));

  return (
    <Container>
      <div style={styles.content} ref={ref}>
        {alignment ? (
          <TwoColumn
            alignment={alignment}
            content={content}
            getContent={getContent}
          />
        ) : (
          <OneColumn content={content} getContent={getContent} />
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
