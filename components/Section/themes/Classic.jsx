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

export default function Classic({ mode, header, subsections }) {
  const isDarkMode = mode.key === 'dark';
  const getBottomBorder = () => ({
    borderBottom: `1px solid ${isDarkMode ? 'white' : 'black'}`,
  });

  return (
    <Container>
      {header && (
        <Header style={{ ...getBottomBorder(), ...styles.header }}>
          {header}
        </Header>
      )}
      {subsections.map((s, key) => (
        <Body subsection={s} key={`${key + 1}`} />
      ))}
    </Container>
  );
}
