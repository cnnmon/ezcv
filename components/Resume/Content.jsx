import React from 'react';
import Section from '../Section';
import { STYLING } from '../../constants';
import styled from 'styled-components';

const Header = styled.h2`
  padding-bottom: 5px;
  font-weight: bold;
`;

function Content({ content, styling = STYLING.getDefaultStyling() }) {
  return (
    <>
      {content.map(({ body, header, type }, i) => (
        <div key={`${i + 1}`}>
          <Section
            styling={styling}
            type={type}
            header={header}
            subsections={body}
          />
        </div>
      ))}
    </>
  );
}

export default Content;
