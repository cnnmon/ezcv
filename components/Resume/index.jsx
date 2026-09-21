/* eslint-disable react/display-name */
import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TRIGGERS, STYLING } from '../../constants';
import OneColumn from './OneColumn';
import TwoColumn from './TwoColumn';
import Content from './Content';
import { collectIntervals, paginate } from '../../utils/paginate';

const WIDTH = '8.2in';
const HEIGHT = '11in';
const SCALE = '0.9';
const MOBILESCALE = '0.6';
const DEFAULT_LINK = '#0563c1';

const Container = styled.div`
  max-width: ${WIDTH};
  min-width: ${WIDTH};
  max-height: ${HEIGHT};
  min-height: ${(p) => (p.$fill ? HEIGHT : 'auto')};
  height: ${(p) => (p.$fill ? HEIGHT : 'auto')};
  overflow: hidden;
  transform: ${(p) => (p.$plain ? 'none' : `scale(${SCALE})`)};
  transform-origin: top center;
  border: ${(p) => (p.$plain ? 'none' : '3px solid black')};
  margin-bottom: ${(p) =>
    p.$plain ? '0' : `calc(${HEIGHT} * (${SCALE} - 1))`};
  box-shadow: none;
  background: white;

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    transform: ${(p) => (p.$plain ? 'none' : `scale(${MOBILESCALE})`)};
    margin-bottom: ${(p) =>
      p.$plain ? '0' : `calc(${HEIGHT} * (${MOBILESCALE} - 1))`};
  }

  @media print {
    transform: none;
    margin-bottom: 0;
    border: none;
    box-shadow: none;
    min-height: ${HEIGHT};
    height: ${HEIGHT};
    page-break-after: always;
    break-after: page;

    &:last-of-type {
      page-break-after: auto;
      break-after: auto;
    }
  }
`;

const Hidden = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
`;

const MeasureClip = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: ${WIDTH};
  height: 0;
  overflow: hidden;
  visibility: hidden;
  pointer-events: none;
`;

export function getHeader(text) {
  return <h1>{text}</h1>;
}

const getContentStyle = (styling, isDarkMode) => {
  const isAcademic = styling.themes.key === 'academic';
  return {
    padding: isAcademic ? 48 : 30,
    boxSizing: 'border-box',
    whiteSpace: 'pre-line',
    fontSize: 12.5,
    maxWidth: '100%',
    fontFamily: styling.fonts.name,
    color: isDarkMode ? 'white' : undefined,
    background: isDarkMode ? '#242426' : 'white',
  };
};

const getLinkStyle = (styling) => ({
  color: (styling.links && styling.links.color) || DEFAULT_LINK,
  textDecoration: 'underline',
});

function renderBody(alignment, page, styling) {
  if (alignment !== STYLING.ALIGNMENT.CENTER) {
    return <TwoColumn alignment={alignment} content={page} styling={styling} />;
  }

  return <OneColumn content={page} styling={styling} />;
}

const Resume = React.forwardRef(({ styling, content, plain = false }, ref) => {
  const { alignment } = styling.columns;
  const isDarkMode = styling.mode.key === 'dark';
  const measureRef = useRef(null);
  const probeRef = useRef(null);
  const [pages, setPages] = useState([{ start: 0, end: 0 }]);

  const flow = content.filter((c) => c.type !== 'pagebreak');
  const pageStyle = getContentStyle(styling, isDarkMode);

  useLayoutEffect(() => {
    const measure = measureRef.current;
    const probe = probeRef.current;
    if (!measure || !probe) {
      return undefined;
    }

    const update = () => {
      const pagePx = probe.offsetHeight;
      const cs = window.getComputedStyle(measure);
      const padTop = parseFloat(cs.paddingTop) || 0;
      const pad = padTop + (parseFloat(cs.paddingBottom) || 0);
      const area = Math.max(1, pagePx - pad);
      const contentTop = measure.getBoundingClientRect().top + padTop;
      const intervals = collectIntervals(measure, contentTop, area);
      const next = paginate(intervals, measure.offsetHeight - pad, area);

      setPages((prev) =>
        JSON.stringify(prev) === JSON.stringify(next) ? prev : next
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(measure);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(update);
    }

    return () => observer.disconnect();
  }, [content, styling, isDarkMode, alignment, flow.length]);

  return (
    <>
      <style jsx global>{`
        a {
          color: ${getLinkStyle(styling).color};
          text-decoration: ${getLinkStyle(styling).textDecoration};
        }
      `}</style>
      <MeasureClip aria-hidden="true">
        <Hidden ref={probeRef} style={{ width: WIDTH, height: HEIGHT }} />
        <Hidden
          ref={measureRef}
          style={{ ...pageStyle, width: WIDTH, height: 'auto' }}
        >
          {renderBody(alignment, flow, styling)}
        </Hidden>
      </MeasureClip>
      <div ref={ref}>
        {pages.map((page, index) => {
          // Builder always uses letter pages. Public view sizes the last page
          // to content so short resumes aren't mostly empty whitespace.
          const fill = !plain || index < pages.length - 1;
          return (
            <Container
              key={`page-${index.toString()}`}
              $plain={plain}
              $fill={fill}
            >
              <div
                style={{
                  ...pageStyle,
                  ...(fill
                    ? {
                        height: HEIGHT,
                        maxHeight: HEIGHT,
                        minHeight: HEIGHT,
                      }
                    : {
                        height: 'auto',
                        maxHeight: HEIGHT,
                        minHeight: 0,
                      }),
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: page.end - page.start,
                    // page breaks fall between blocks, so this only hides the
                    // neighboring pages. clip-path (unlike overflow: hidden)
                    // leaves the left open, out to the page edge, so list
                    // markers can hang into the padding. The right stays
                    // clipped so long unbroken text can't run into it.
                    clipPath: `inset(0 0 0 -${pageStyle.padding}px)`,
                    display: 'flow-root',
                  }}
                >
                  <div style={{ marginTop: -page.start }}>
                    {renderBody(alignment, flow, styling)}
                  </div>
                </div>
              </div>
            </Container>
          );
        })}
      </div>
    </>
  );
});

export default Resume;
export { Content };
