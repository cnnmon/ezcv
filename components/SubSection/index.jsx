import { Classic, Modern, Handed, Minimalist, Elegant } from './themes';
import { Center, RightHanded, LeftHanded } from './headers';

const HEADERS = {
  classic: Center,
  modern: Center,
  righthanded: RightHanded,
  lefthanded: LeftHanded,
  minimalist: Center,
  elegant: Center,
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
    return THEMES.classic(props);
  }

  const { theme } = styling;

  // enlarges/formats header section differently
  return type === 'header'
    ? HEADERS[theme.key](props)
    : THEMES[theme.key](props);
}
