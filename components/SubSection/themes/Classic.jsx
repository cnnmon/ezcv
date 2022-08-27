import React from 'react';
import styled from 'styled-components';
import styles, { getItems, getSectionTitle } from '../styles';

const Left = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const Right = styled.div`
  flex: 0.5;
  text-align: right;
`;

const Line = styled.hr`
  margin-top: 0;
  background: black;
`;

export default function Classic({ header, subsection, subsectionIndex }) {
  const { title, subtitle, description, date, other } = subsection;
  const isFirstSubsection = subsectionIndex === 0;

  const getLeft = () => (
    <Left>{getSectionTitle(title, subtitle, description)}</Left>
  );

  const getRight = () => <Right>{date}</Right>;

  return (
    <>
      {isFirstSubsection && (
        <>
          <h2 style={styles.header}>{header}</h2>
          {header && <Line />}
        </>
      )}
      <div style={styles.flex}>
        {getLeft()}
        {getRight()}
      </div>
      {getItems(other)}
    </>
  );
}
