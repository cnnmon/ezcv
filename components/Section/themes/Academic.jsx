import React from 'react';
import styled from 'styled-components';
import styles, { getItems, autolink } from '../styles';

// Stacked CV layout: if a date exists it sits on the right, otherwise
// the subsection is full-width paragraphs (blank lines are preserved).

const Container = styled.div`
  line-height: 1.35;
`;

const Header = styled.h2`
  font-size: 1.1em;
  font-weight: bold;
  margin: 18px 0 10px;
  padding: 0;
  text-transform: uppercase;
`;

const Entry = styled.div`
  margin-bottom: 12px;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
`;

const DateRight = styled.p`
  flex: 0 0 auto;
  margin: 0 0 0 16px;
  text-align: right;
`;

function Lines({ title, subtitle, description }) {
  return (
    <>
      {title ? <p style={styles.text}>{autolink(title)}</p> : null}
      {subtitle ? <p style={styles.text}>{autolink(subtitle)}</p> : null}
      {description ? <p style={styles.text}>{autolink(description)}</p> : null}
    </>
  );
}

function Body({ subsection }) {
  const { title, subtitle, description, date, other } = subsection;

  if (date) {
    return (
      <Entry>
        <Row>
          <div style={{ flex: 1 }}>
            <Lines title={title} subtitle={subtitle} description={description} />
          </div>
          <DateRight>{date}</DateRight>
        </Row>
        {getItems(other)}
      </Entry>
    );
  }

  return (
    <Entry>
      <Lines title={title} subtitle={subtitle} description={description} />
      {getItems(other)}
    </Entry>
  );
}

export default function Academic({ header, subsections }) {
  return (
    <Container>
      {header ? <Header>{header}</Header> : null}
      {subsections.map((s, key) => (
        <Body subsection={s} key={`${key + 1}`} />
      ))}
    </Container>
  );
}
