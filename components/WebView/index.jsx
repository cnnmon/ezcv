import React from 'react';
import styled from 'styled-components';
import AutoLinkText from '../AutoLinkText';
import { SECTIONS, TRIGGERS } from '../../constants';

const Profile = styled.article`
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  font-family: 'Neue Montreal', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 15px;
  color: #1c1c1c;
  line-height: 1.3;
  letter-spacing: -0.01em;

  a {
    color: inherit;
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
  }

  a:hover {
    opacity: 0.7;
  }

  @media only screen and (max-width: ${TRIGGERS.mobileBreakpoint}) {
    max-width: 100%;
  }
`;

const Name = styled.h1`
  margin: 0 0 12px;
  font-weight: 500;
  font-size: clamp(1.85rem, 2.8vw, 2.5rem);
  letter-spacing: -0.03em;
  line-height: 1.15;
`;

const Contact = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 0;
  margin: 0 0 48px;
  color: #6b6b6b;
  font-weight: 400;

  span {
    display: inline-flex;
    align-items: center;
  }

  span:not(:last-child)::after {
    content: '·';
    margin: 0 10px;
    color: #b0b0b0;
  }
`;

const Block = styled.section`
  margin: 0 0 40px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionLabel = styled.h2`
  margin: 0 0 18px;
  font-weight: 500;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #8a8a8a;
`;

const Entry = styled.div`
  margin: 0 0 22px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const EntryHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  margin: 0 0 4px;
`;

const EntryTitle = styled.p`
  margin: 0;
  font-weight: 500;
`;

const EntryDate = styled.p`
  margin: 0;
  flex-shrink: 0;
  color: #8a8a8a;
  white-space: nowrap;
`;

const EntryMeta = styled.p`
  margin: 0 0 0px;
  color: #5a5a5a;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  margin: 0 0 4px;
  padding-left: ${(p) => (p.$bullet ? '1em' : '0')};
  position: relative;

  &::before {
    content: ${(p) => (p.$bullet ? "'–'" : "''")};
    position: absolute;
    left: 0;
    color: #a3a3a3;
  }
`;

const Prose = styled.p`
  margin: 0 0 0px;

  &:last-child {
    margin-bottom: 0;
  }
`;

function link(text) {
  if (!text) return null;
  return <AutoLinkText text={text} linkProps={{ target: '_blank' }} />;
}

function keyed(list, prefix = '') {
  const seen = {};
  return list.map((item) => {
    const base = `${prefix}:${
      typeof item === 'string' ? item : JSON.stringify(item)
    }`;
    seen[base] = (seen[base] || 0) + 1;
    return { item, key: `${base}#${seen[base]}` };
  });
}

function isEmptySubsection(s) {
  if (!s) return true;
  const { title, subtitle, date, description, other } = s;
  return (
    !title && !subtitle && !date && !description && (!other || other.length < 1)
  );
}

function flattenContact(subsections = []) {
  const parts = [];
  subsections.forEach((s) => {
    [s.title, s.subtitle, s.description, s.date, ...(s.other || [])].forEach(
      (line) => {
        const t = (line || '').trim();
        if (t) parts.push(t);
      }
    );
  });
  return parts;
}

function HeaderBlock({ header, subsections }) {
  const contact = flattenContact(subsections);
  return (
    <header>
      {header ? <Name>{header}</Name> : null}
      {contact.length > 0 ? (
        <Contact>
          {contact.map((line) => (
            <span key={line}>{link(line)}</span>
          ))}
        </Contact>
      ) : (
        <div style={{ marginBottom: 48 }} />
      )}
    </header>
  );
}

function EntryBody({ subsection }) {
  const { title, subtitle, description, date, other = [] } = subsection;
  const meta = [subtitle, description].filter(Boolean).join(' · ');
  const lines = other.filter((line) => line !== undefined && line !== null);

  const hasStructured = title || subtitle || description || date;

  if (!hasStructured && lines.length > 0) {
    return (
      <Entry>
        {keyed(lines, 'b').map(({ item: line, key }) => {
          if (line === '') return <Prose key={key}>&nbsp;</Prose>;
          const bullet = line[0] === '-';
          const text = bullet ? line.substring(1).trim() : line;
          if (bullet) {
            return (
              <List key={key}>
                <Item $bullet>{link(text)}</Item>
              </List>
            );
          }
          return <Prose key={key}>{link(text)}</Prose>;
        })}
      </Entry>
    );
  }

  return (
    <Entry>
      {(title || date) && (
        <EntryHead>
          <EntryTitle>{link(title)}</EntryTitle>
          {date ? <EntryDate>{link(date)}</EntryDate> : null}
        </EntryHead>
      )}
      {meta ? <EntryMeta>{link(meta)}</EntryMeta> : null}
      {lines.length > 0 ? (
        <List>
          {keyed(lines, 'l').map(({ item: line, key }) => {
            if (line === '') {
              return <Item key={key} style={{ height: '0.75em' }} />;
            }
            const bullet = line[0] === '-';
            const text = bullet ? line.substring(1).trim() : line;
            return (
              <Item key={key} $bullet={bullet}>
                {link(text)}
              </Item>
            );
          })}
        </List>
      ) : null}
    </Entry>
  );
}

function SectionBlock({ header, subsections = [] }) {
  const items = subsections.filter((s) => !isEmptySubsection(s));
  if (!header && items.length === 0) return null;

  return (
    <Block>
      {header ? <SectionLabel>{header}</SectionLabel> : null}
      {keyed(items, header || 'section').map(({ item: s, key }) => (
        <EntryBody key={key} subsection={s} />
      ))}
    </Block>
  );
}

export default function WebView({ content = [] }) {
  return (
    <Profile>
      {keyed(content, 'section').map(({ item: section, key }) => {
        if (section.type === SECTIONS.TYPES.PAGEBREAK) return null;

        if (section.type === SECTIONS.TYPES.HEADER) {
          return (
            <HeaderBlock
              key={key}
              header={section.header}
              subsections={section.body}
            />
          );
        }

        return (
          <SectionBlock
            key={key}
            header={section.header}
            subsections={section.body}
          />
        );
      })}
    </Profile>
  );
}
