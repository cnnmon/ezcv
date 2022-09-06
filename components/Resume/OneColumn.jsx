import Content from './Content';
import { SECTIONS } from '../../constants';

export default function OneColumn({ content, styling }) {
  const columns = {
    center: [],
    rest: [],
  };
  
  for (let i = 0; i < content.length; i += 1) {
    const c = content[i];

    if (c.type === SECTIONS.TYPES.HEADER) {
      columns.center.push(c);
    } else {
      columns.rest.push(c);
    }
  }

  return (
    <>
      <Content content={columns.center} styling={styling} />
      <Content content={columns.rest} styling={styling} />
    </>
  );
}
