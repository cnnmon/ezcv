import React from 'react';
import Subsection from '../Subsection';
import { STYLING } from '../../constants';

function Content({ content, styling = STYLING.getDefaultStyling() }) {
  return (
    <>
      {content.map(({ body, header, type }, i) => (
        <div key={`${i + 1}`}>
          {body.map((subsection, index) => (
            <div key={`${i + 1}${index + 1}`}>
              <Subsection
                styling={styling}
                header={header}
                type={type}
                subsection={subsection}
                subsectionIndex={index}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default Content;
