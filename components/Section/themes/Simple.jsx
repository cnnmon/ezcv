import React from 'react';
import styled from 'styled-components';
import styles, { getSectionTitle, getItems } from '../styles';

const Container = styled.div`
  margin: 20px 0;
`;

const Header = styled.h2`
  padding-bottom: 5px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  margin: 0;
  font-weight: 500;
`;

const Date = styled.span`
  opacity: 0.6;
`;

function Body({ subsection }) {
  const { title, subtitle, description, date, other } = subsection;

  return (
    <>
      <Subtitle>
        {getSectionTitle(title, subtitle, description)}
        <Date>{date}</Date>
      </Subtitle>
      {getItems(other)}
    </>
  );
}

export default function Simple({ header, subsections }) {
  return (
    <Container>
      <Header style={styles.header}>{header}</Header>
      {subsections.map((s, key) => (
        <Body subsection={s} key={`${key + 1}`} />
      ))}
    </Container>
  );
}
