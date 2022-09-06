import React from 'react';
import styled from 'styled-components';
import styles, { getItems, getSectionTitle } from '../styles';

const Container = styled.div`
  line-height: 17px;
`;

const Left = styled.div`
  flex: 0.25;
  margin-right: 5px;
`;

const Right = styled.div`
  flex: 1;
`;

const Header = styled.h2`
  font-weight: bold;
  padding-top: 5px;
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
      {other.length ? getItems(other) : null}
    </Right>
  );

  return (
    <Container>
      {isFirstSubsection && <Header style={styles.header}>{header}</Header>}
      <div style={styles.flex}>
        {getLeft()}
        {getRight()}
      </div>
    </Container>
  );
}
