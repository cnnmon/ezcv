import { Classic, Modern, Minimalist, Simple, Oak } from './themes';
import { Center, LeftHanded, RightHanded } from './headers';

const HEADERS = {
  onecolumn: Center,
  lefthanded: LeftHanded,
  righthanded: RightHanded,
};

const THEMES = {
  classic: Classic,
  modern: Modern,
  minimalist: Minimalist,
  simple: Simple,
  oak: Oak,
};

export default function Section({ styling, type, ...props }) {
  if (!styling) {
    return THEMES.classic(props);
  }

  const { themes, columns, mode } = styling;

  if (type === 'header') {
    return HEADERS[columns.key](props);
  }

  // enlarges/formats header section differently
  return THEMES[themes.key]({ columns, mode, ...props });
}
