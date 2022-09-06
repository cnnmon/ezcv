import { Classic, Modern, Minimalist, Simple } from './themes';
import { Center, LeftHanded, RightHanded } from './headers';

const HEADERS = {
  center: Center,
  lefthanded: LeftHanded,
  righthanded: RightHanded,
};

const THEMES = {
  classic: Classic,
  modern: Modern,
  minimalist: Minimalist,
  simple: Simple,
};

export default function Section({ styling, type, ...props }) {
  if (!styling) {
    return THEMES.classic(props);
  }
  
  const { themes, headers } = styling;

  if (type === 'header') {
    return HEADERS[headers.key](props);
  }

  // enlarges/formats header section differently
  return THEMES[themes.key](props);
}