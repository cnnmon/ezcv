import React from 'react';
import { STYLING, SECTIONS } from '../../constants';
import Content from './Content';

const styles = {
  flex: {
    display: 'flex',
    width: '100%',
  },
  left: {
    width: '40%',
    marginRight: 20,
  },
  right: {
    width: '40%',
    marginLeft: 20,
  },
  main: {
    width: '100%',
  },
};

export default function TwoColumn({ content, alignment, styling }) {
  const isRight = alignment === STYLING.ALIGNMENT.RIGHT;

  const columns = {
    center: [],
    side: [],
    main: [],
  };

  for (let i = 0; i < content.length; i += 1) {
    const c = content[i];

    if (c.type === SECTIONS.TYPES.HEADER) {
      columns.center.push(c);
    } else if (c.type === SECTIONS.TYPES.SECTION1) {
      columns.main.push(c);
    } else {
      columns.side.push(c);
    }
  }

  return (
    <>
      <Content content={columns.center} styling={styling} />
      <div style={styles.flex}>
        <div style={!isRight ? styles.main : styles.left}>
          <Content
            content={isRight ? columns.side : columns.main}
            styling={styling}
          />
        </div>
        <div style={isRight ? styles.main : styles.right}>
          <Content
            content={isRight ? columns.main : columns.side}
            styling={styling}
          />
        </div>
      </div>
    </>
  );
}
