import React from 'react';
import styled from 'styled-components';
import styles, { getItems, autolink } from '../styles';

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
`;

const Header = styled.h2`
  font-weight: normal;
  font-weight: bold;
  margin: 0;
`;

const Title = styled.h3``;

const Subtitle = styled.h3`
  font-weight: 500;
`;

const Description = styled.p`
  color: rgba(0, 0, 0, 0.5);
  margin: 0;
`;

const Left = styled.div`
  flex: 0.3;
  margin-right: 30px;
  margin-bottom: 15px;
  margin-top: -3px;
`;

const Right = styled.div`
  flex: 1;
`;

export default function Elegant({ header, subsection, subsectionIndex }) {
  const { title, subtitle, description, date, other } = subsection;
  const isFirstSubsection = subsectionIndex === 0;
  const isHeaderOnTop = title || subtitle || description || date;

  return (
    <Body>
      {isFirstSubsection && isHeaderOnTop && (
        <>
          <Header>{header}</Header>
          <br />
        </>
      )}
      <Container>
        <Left>
          {isFirstSubsection && !isHeaderOnTop && <Header>{header}</Header>}
          {subtitle && (
            <Subtitle style={styles.text}>{autolink(subtitle)}</Subtitle>
          )}
          {title && <Title style={styles.text}>{autolink(title)}</Title>}
          {(date || description) && (
            <Description style={styles.text}>
              {date && date}
              <br />
              {description && autolink(description)}
            </Description>
          )}
        </Left>
        <Right>{getItems(other)}</Right>
      </Container>
    </Body>
  );
}
