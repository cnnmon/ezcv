import React, { useMemo } from "react";
import { SubSection } from "../../components";
import { useIsMobile } from "../../utils";

const width = "8.4in";
const height = "11.8in";
const laptopScale = "0.6";

const getStyles = (isMobile) => ({
  container: {
    width: width,
    height: height,
    transform: `scale(${laptopScale})`,
    position: isMobile ? "flex" :  "absolute",
    border: "3px solid black",
    backgroundColor: "white",
    overflowY: "hidden",
  },
  content: {
    padding: 30,
    whiteSpace: "pre-line",
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

  const getBody = ({body, ...section}, i) => {
    return (
      <div key={i}>
        {body.map((subSection, index) =>
          <div key={index}>
            <SubSection
              styling={styling}
              header={section.header}
              type={section.type}
              subSection={subSection}
              subSectionIndex={index}
            />
          </div>
        )}
      </div>
    )
  }

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
  )
});

export default Resume;
