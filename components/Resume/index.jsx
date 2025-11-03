/* eslint-disable react/display-name */
import React from 'react';
import styled from 'styled-components';
import { TRIGGERS, STYLING } from '../../constants';
import OneColumn from './OneColumn';
import TwoColumn from './TwoColumn';
import Content from './Content';

const WIDTH = '8.2in';
const HEIGHT = '11in';
const SCALE = '0.9';
const MOBILESCALE = '0.6';

const Container = styled.div`
  max-width: ${WIDTH};
  min-width: ${WIDTH};
  max-height: ${HEIGHT};
  min-height: ${HEIGHT};
  overflow: hidden;
  transform: scale(${SCALE});
  border: 3px solid black;
  margin-bottom: -100px;

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    transform: scale(${MOBILESCALE});
    margin-bottom: -420px;
  }
`;

const PageBreak = styled.div`
  page-break-after: always;
  height: 1px;
  margin: 0;
  padding: 0;
  border: none;
`;

export function getHeader(text) {
  return <h1>{text}</h1>;
}

const getContentStyle = (styling, isDarkMode) => ({
  padding: 30,
  boxSizing: 'border-box',
  whiteSpace: 'pre-line',
  fontSize: 12.5,
  maxWidth: '100%',
  maxHeight: HEIGHT,
  minHeight: HEIGHT,
  fontFamily: styling.fonts.name,
  color: isDarkMode ? 'white' : undefined,
  background: isDarkMode ? '#242426' : 'white',
});

function Column({ index, alignment, page, styling, isDarkMode }) {
  return (
    <div
      key={`page-${index.toString()}`}
      style={getContentStyle(styling, isDarkMode)}
    >
      {alignment !== STYLING.ALIGNMENT.CENTER ? (
        <TwoColumn
          key={`column-${index.toString()}`}
          alignment={alignment}
          content={page}
          styling={styling}
        />
      ) : (
        <OneColumn
          key={`column-${index.toString()}`}
          content={page}
          styling={styling}
        />
      )}
      {index > 0 && <PageBreak key={`page-break-${index.toString()}`} />}
    </div>
  );
}

const Resume = React.forwardRef(({ styling, content }, ref) => {
  const { alignment } = styling.columns;
  const isDarkMode = styling.mode.key === 'dark';

  // separate content into "pages", where objects of type pagebreak are the separators
  const contents = [];
  let currentPage = [];
  for (let i = 0; i < content.length; i += 1) {
    const object = content[i];
    if (object.type === 'pagebreak') {
      contents.push(currentPage);
      currentPage = [];
    }
    currentPage.push(object);
  }
  contents.push(currentPage);

  return (
    <>
      {/* container will hide the overflow of the page, but we need to include it here for react-to-print; the next page displays are separate */}
      <Container>
        <style jsx global>{`
          a {
            color: ${isDarkMode ? 'white' : 'black'};
            text-decoration: none;
          }
          @media print {
            .page-break {
              page-break-after: always;
              break-after: page;
            }
          }
        `}</style>
        <div ref={ref}>
          {contents.map((page, index) => (
            <Column
              key={`column-${index.toString()}`}
              index={index}
              alignment={alignment}
              page={page}
              styling={styling}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </Container>
      {contents.map((page, index) => {
        /* display the rest of the pages */
        if (index === 0) {
          return null;
        }

        return (
          <Container key={`container-${index.toString()}`}>
            <Column
              key={`column-${index.toString()}`}
              index={index}
              alignment={alignment}
              page={page}
              styling={styling}
            />
          </Container>
        );
      })}
      <div style={{ marginBottom: '120px' }} />
    </>
  );
});

export default Resume;
export { Content };
