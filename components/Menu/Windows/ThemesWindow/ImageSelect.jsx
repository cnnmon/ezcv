import React from 'react';
import styled from 'styled-components';
import ScrollContainer from 'react-indiana-drag-scroll';
import { COLORS } from '../../../../constants';

const styles = {
  container: {
    margin: '20px 0',
  },
  title: {
    padding: '0 20px',
    paddingBottom: 10,
    borderBottom: `2px solid ${COLORS.darkBrown}`,
  },
  list: {
    display: 'flex',
    padding: '10px 20px 20px',
    boxSizing: 'border-box',
    overflowX: 'scroll',
  },
  text: {
    margin: 0,
  },
  description: {
    textAlign: 'center',
  },
};

const Option = styled.button`
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 2px solid ${COLORS.darkBrown};
  box-sizing: border-box;
  cursor: pointer;
  transition: border-radius 0.2s ease-in-out, opacity 0.2s ease-in-out;
  overflow: hidden;
  text-align: left;

  &:hover {
    border-radius: 20px;
  }

  img {
    display: block;
    width: 100%;
    height: 90px;
    object-fit: cover;
  }
`;

const FontPreview = styled.div`
  height: 90px;
  padding: 14px 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  font-family: ${(p) => p.$font};

  .sample-lg {
    margin: 0;
    line-height: 1.1;
    font-size: 28px;
  }

  .sample-sm {
    margin: 0;
    line-height: 1.2;
    font-size: 12px;
    opacity: 0.75;
  }
`;

const LayoutPreview = styled.div`
  height: 90px;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  color: ${COLORS.darkBrown};
`;

const LayoutRow = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;
`;

const Bar = styled.div`
  height: ${(p) => p.$h || 8}px;
  flex: ${(p) => p.$flex || 1};
  width: ${(p) => (p.$w ? `${p.$w}%` : undefined)};
  background: ${(p) => p.$bg || COLORS.darkBrown};
  opacity: ${(p) => p.$opacity || 1};
  border-radius: 2px;
`;

const NameBar = styled.div`
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 13px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
`;

const ContactBar = styled.div`
  font-family: Helvetica, Arial, sans-serif;
  font-size: 8px;
  line-height: 1.3;
  opacity: 0.7;
`;

function FontOption({ item }) {
  return (
    <FontPreview $font={item.name}>
      <p className="sample-lg">Aa</p>
      <p className="sample-sm">The quick brown fox</p>
    </FontPreview>
  );
}

function LayoutOption({ item }) {
  if (item.key === 'onecolumn' || item.body === 'onecolumn') {
    return (
      <LayoutPreview style={{ alignItems: 'center', textAlign: 'center' }}>
        <NameBar>Jane Doe</NameBar>
        <ContactBar>email · city · link</ContactBar>
        <LayoutRow style={{ justifyContent: 'center', marginTop: 4 }}>
          <Bar $w={70} $h={5} $opacity={0.25} />
        </LayoutRow>
        <LayoutRow style={{ justifyContent: 'center' }}>
          <Bar $w={55} $h={5} $opacity={0.18} />
        </LayoutRow>
      </LayoutPreview>
    );
  }

  const nameWide = item.key === 'lefthanded' || item.body === 'lefthanded';

  return (
    <LayoutPreview>
      <LayoutRow style={{ alignItems: 'flex-start' }}>
        <div style={{ flex: nameWide ? 2.3 : 1, minWidth: 0 }}>
          <NameBar>Jane Doe</NameBar>
        </div>
        <div style={{ flex: nameWide ? 1 : 2.3, minWidth: 0 }}>
          <ContactBar>
            email@site.com
            <br />
            city · link
          </ContactBar>
        </div>
      </LayoutRow>
      <LayoutRow>
        <Bar $flex={nameWide ? 2.3 : 1} $h={5} $opacity={0.25} />
        <Bar $flex={nameWide ? 1 : 2.3} $h={5} $opacity={0.15} />
      </LayoutRow>
      <LayoutRow>
        <Bar $flex={nameWide ? 2.3 : 1} $h={5} $opacity={0.18} />
        <Bar $flex={nameWide ? 1 : 2.3} $h={5} $opacity={0.12} />
      </LayoutRow>
    </LayoutPreview>
  );
}

function ImageOption({ item }) {
  return <img src={`/${item.image}`} alt="" />;
}

export default function ImageSelect({
  title,
  description,
  items,
  currentValue,
  onChange,
  smallWidth = false,
  preview = 'image',
}) {
  const getItemStyle = () => ({
    paddingRight: 20,
    width: smallWidth ? 150 : 200,
    minWidth: smallWidth ? 150 : 200,
  });

  const getOptionStyle = (isCurrent, color = 'white') => ({
    background: color,
    cursor: isCurrent ? 'not-allowed' : 'pointer',
    opacity: isCurrent ? 0.5 : undefined,
    borderRadius: isCurrent ? 20 : undefined,
  });

  const renderPreview = (item) => {
    if (preview === 'font') return <FontOption item={item} />;
    if (preview === 'layout') return <LayoutOption item={item} />;
    return <ImageOption item={item} />;
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        <h4 style={styles.text}>{title}</h4>
        <p style={styles.text}>{description}</p>
      </div>
      <ScrollContainer style={styles.list}>
        {items.map((item) => {
          const isCurrent = currentValue && item.name === currentValue.name;
          return (
            <div style={getItemStyle()} key={item.name}>
              <Option
                type="button"
                style={getOptionStyle(isCurrent, item.color)}
                onClick={() => {
                  if (!isCurrent) onChange(item);
                }}
                disabled={isCurrent}
              >
                {renderPreview(item)}
              </Option>
              <div style={styles.description}>
                <h4 style={styles.text}>{item.name}</h4>
                <p style={styles.text}>{item.description}</p>
              </div>
            </div>
          );
        })}
      </ScrollContainer>
    </div>
  );
}
