import React from 'react';
import styled from 'styled-components';
import { getItems, getSectionTitle } from '../styles';

const Container = styled.div`
  margin: 20px 0;
`;

const Header = styled.h2`
  margin-top: -5px;
  font-weight: normal;
`;

const Left = styled.div`
  min-width: 15%;
  max-width: 15%;
  margin-right: 20px;
  text-align: right;
  margin-top: 3px;
`;

const Right = styled.div`
  flex-direction: column;
  flex-grow: 1;
`;

const Flex = styled.div`
  display: flex;
`;

const Title = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const Date = styled.p`
  margin: 0;
  color: rgba(0, 0, 0, 0.5);
  text-align: right;
  flex: 0.4;
`;

function Body({ subsection }) {
  const { title, subtitle, description, date, other } = subsection;

  return (
    <>
      <Flex>
        <Title>{getSectionTitle(title, subtitle, description)}</Title>
        <Date>{date}</Date>
      </Flex>
      {getItems(other)}
    </>
  );
}

export default function Minimalist({ header, subsections, columns }) {
  const getColumnStyle = () => ({
    display: columns.key === 'onecolumn' ? 'flex' : 'block',
  });

  return (
    <Container style={getColumnStyle()}>
      <Left>
        <Header>{header}</Header>
      </Left>
      <Right>
        {subsections.map((s, key) => (
          <Body subsection={s} columns={columns} key={`${key + 1}`} />
        ))}
      </Right>
    </Container>
  );
}
