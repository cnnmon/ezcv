import React from 'react';
import styled from 'styled-components';
import styles, { getItems, getSectionTitle } from '../styles';

const Container = styled.div`
  line-height: 1.3;
`;

const Left = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const Right = styled.p`
  flex: 0.3;
  margin: 0;
  text-align: right;
`;

const Header = styled.h2`
  padding-top: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid black;
`;

function Body({ subsection }) {
  const { title, subtitle, description, date, other } = subsection;

  const getLeft = () => (
    <Left>{getSectionTitle(title, subtitle, description)}</Left>
  );

  const getRight = () => <Right>{date}</Right>;

  return (
    <>
      <div style={styles.flex}>
        {getLeft()}
        {getRight()}
      </div>
      {getItems(other)}
    </>
  );
}

export default function Classic({ header, subsections }) {
  return (
    <Container>
      <Header style={styles.header}>{header}</Header>
      {subsections.map((s, key) => (
        <Body subsection={s} key={`${key + 1}`} />
      ))}
    </Container>
  );
}
