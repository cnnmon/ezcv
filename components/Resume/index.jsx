import React, { useMemo } from 'react';
import Subsection from '../Subsection';
import { useIsMobile } from '../../utils';

const WIDTH = '8.4in';
const HEIGHT = '11.8in';
const SCALE = '0.6';

const getStyles = (isMobile) => ({
  container: {
    width: WIDTH,
    height: HEIGHT,
    transform: `scale(${SCALE})`,
    position: isMobile ? 'flex' : 'absolute',
    border: '3px solid black',
    backgroundColor: 'white',
    overflowY: 'hidden',
  },
  content: {
    padding: 30,
    whiteSpace: 'pre-line',
    lineHeight: 1.4,
    fontSize: 13,
  },
});

export function getHeader(text) {
  return <h1>{text}</h1>;
}

const Resume = React.forwardRef(({ styling, content }, ref) => {
  const isMobile = useIsMobile();
  const styles = useMemo(() => getStyles(isMobile), [isMobile]);

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
    <div style={styles.container}>
      <div style={styles.content} ref={ref}>
        {content.map((section, index) => getBody(section, index))}

        <style jsx global>{`
          a {
            color: black;
            text-decoration: none;
          }
        `}</style>
      </div>
    </div>
  );
});

export default Resume;
