import React from 'react';
import styled from 'styled-components';
import styles, { getItems, autolink } from '../styles';

const Container = styled.div`
  margin: 20px 0;
`;

const Header = styled.h2`
  padding-bottom: 5px;
  font-weight: 500;
`;

const Subtitle = styled.p`
  margin: 0;
  font-weight: 500;
`;

export default function LeftMain({ header, subsection, subsectionIndex }) {
  const { title, subtitle, description, date, other } = subsection;
  const isFirstSubsection = subsectionIndex === 0;

  return (
    <Container>
      {isFirstSubsection && <Header style={styles.header}>{header}</Header>}
      <p style={styles.text}>
        <b>{autolink(title)}</b>
      </p>
      <Subtitle>
        {autolink(subtitle)}
        {subtitle && description && ', '}
        {autolink(description)}
        {(subtitle || description) && date && ' | '}
        {date}
      </Subtitle>

      {getItems(other)}
    </Container>
  );
}
