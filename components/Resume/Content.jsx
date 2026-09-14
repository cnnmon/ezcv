import React from 'react';
import Section from '../Section';
import { STYLING } from '../../constants';

function Content({ content, styling = STYLING.getDefaultStyling() }) {
  return (
    <>
      {content.map((section, i) => (
        <div
          key={`${i + 1}`}
          data-resume-section={
            section.pageId !== undefined ? section.pageId : i
          }
        >
          <Section
            styling={styling}
            type={section.type}
            header={section.header}
            subsections={section.body}
          />
        </div>
      ))}
    </>
  );
}

export default Content;
