import { Classic, Modern, Handed, Minimalist, Elegant } from './themes';
import { Center, SideBySide } from './headers';

const HEADERS = {
  classic: Center,
  modern: SideBySide,
  righthanded: SideBySide,
  lefthanded: SideBySide,
  minimalist: SideBySide,
  elegant: SideBySide,
};

const THEMES = {
  classic: Classic,
  modern: Modern,
  righthanded: Handed,
  lefthanded: Handed,
  minimalist: Minimalist,
  elegant: Elegant,
};

export default function Subsection({ styling, type, ...props }) {
  if (!styling) {
    return null;
  }

  const { theme } = styling;

  // enlarges/formats header section differently
  return type === 'header'
    ? HEADERS[theme.key](props)
    : THEMES[theme.key](props);
}
