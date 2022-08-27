import React from 'react';
import styled from 'styled-components';
import { getItems, getSectionTitle } from '../styles';

const Container = styled.div`
  display: flex;
  margin: 20px 0;
`;

const Header = styled.h2`
  margin-top: -5px;
  font-weight: normal;
`;

const Left = styled.div`
  flex: 0.2;
  margin-right: 20px;
  text-align: right;
  margin-top: 3px;
`;

const Right = styled.div`
  flex: 1;
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

export default function Minimalist({ header, subsection, subsectionIndex }) {
  const { title, subtitle, description, date, other } = subsection;
  const isFirstSubsection = subsectionIndex === 0;

  return (
    <Container>
      <Left>{isFirstSubsection && <Header>{header}</Header>}</Left>
      <Right>
        <Flex>
          <Title>{getSectionTitle(title, subtitle, description)}</Title>
          <Date>{date}</Date>
        </Flex>
        {getItems(other)}
      </Right>
    </Container>
  );
}
