import React from 'react';
import styled from 'styled-components';
import styles, { getItems, getSectionTitle } from '../styles';

const Container = styled.div`
  line-height: 17px;
`;

const Left = styled.div`
  flex: 0.22;
  margin-right: 5px;
`;

const Right = styled.div`
  flex: 1;
`;

const Header = styled.h2`
  font-weight: bold;
  padding-top: 5px;
`;

function Body({ subsection }) {
  const { title, subtitle, description, date, other } = subsection;

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
    <div style={styles.flex}>
      {getLeft()}
      {getRight()}
    </div>
  );
}

export default function Modern({ header, subsections }) {
  return (
    <Container>
      <Header style={styles.header}>{header}</Header>
      {subsections.map((s) => <Body subsection={s} />)}
    </Container>
  );
}