import React from 'react';
import styled from 'styled-components';
import Subsection from '../Subsection';
import { TRIGGERS, COLORS } from '../../constants';

const WIDTH = '8.4in';
const HEIGHT = '11.8in';
const SCALE = '0.7';
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
  max-width: ${WIDTH};
  min-width: ${WIDTH};
  max-height: ${HEIGHT};
  min-height: ${HEIGHT};
  transform: scale(${SCALE});
  border: 3px solid ${COLORS.darkBrown};
  background-color: white;

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    position: flex;
    transform: scale(${MOBILESCALE});
  }
`;

export function getHeader(text) {
  return <h1>{text}</h1>;
}

const Resume = React.forwardRef(({ styling, content }, ref) => {
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

  return (
    <Container>
      <div style={styles.content} ref={ref}>
        {content.map((section, index) => getBody(section, index))}

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
