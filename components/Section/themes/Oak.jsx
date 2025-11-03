import React from 'react';
import styled from 'styled-components';
import styles, { getItems, getSectionTitle } from '../styles';

const Container = styled.div`
  line-height: 1.2;
`;

const Left = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const Right = styled.p`
  flex: 0 0 auto;
  margin: 0;
  text-align: right;
`;

const Header = styled.h2`
  padding-top: 4px;
  padding-bottom: 4px;
`;

function Body({ subsection }) {
  const { title, subtitle, description, date, other } = subsection;

  const getLeft = () => (
    <Left>{getSectionTitle(title, subtitle, description)}</Left>
  );

  const getRight = () => <Right>{date}</Right>;

  return (
    <div style={{ marginBottom: 5 }}>
      <div style={styles.flex}>
        {getLeft()}
        {getRight()}
      </div>
      {getItems(other)}
    </div>
  );
}

export default function Oak({ mode, header, subsections }) {
  const isDarkMode = mode.key === 'dark';
  const getRightBorder = () => ({
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    fontSize: '1.2em',
    ...styles.header,
  });

  const renderHeaderWithLine = (headerText) => (
    <Header style={getRightBorder()}>
      <span>{headerText}</span>
      <span
        style={{
          flex: 1,
          height: 1,
          borderBottom: `1px solid ${isDarkMode ? 'white' : 'black'}`,
          marginLeft: 10,
          opacity: 0.5,
          marginTop: 7, // aligns with text baseline
        }}
      />
    </Header>
  );

  return (
    <Container>
      {header && renderHeaderWithLine(header)}
      {subsections.map((s, key) => (
        <Body subsection={s} key={`${key + 1}`} />
      ))}
    </Container>
  );
}
