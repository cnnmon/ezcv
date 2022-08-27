import React from 'react';
import styled from 'styled-components';
import styles, { getItems, getSectionTitle } from '../styles';

const Left = styled.div`
  flex: 0.3;
  margin-right: 20px;
`;

const Right = styled.div`
  flex: 1;
`;

const Header = styled.h2`
  font-weight: 500;
`;

export default function Modern({ header, subsection, subsectionIndex }) {
  const { title, subtitle, description, date, other } = subsection;
  const isFirstSubsection = subsectionIndex === 0;

  const getLeft = () =>
    date && (
      <Left>
        <p style={styles.text}>{date}</p>
      </Left>
    );

  const getRight = () => (
    <Right>
      {getSectionTitle(title, subtitle, description)}
      {getItems(other)}
    </Right>
  );

  return (
    <>
      {isFirstSubsection && <Header style={styles.header}>{header}</Header>}
      <div style={styles.flex}>
        {getLeft()}
        {getRight()}
      </div>
    </>
  );
}
