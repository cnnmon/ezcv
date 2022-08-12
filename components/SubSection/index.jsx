import { Classic, Modern } from './themes';
import { Center, SideBySide } from './headers';

const HEADERS = {
  center: Center,
  sidebyside: SideBySide,
};

const THEMES = {
  classic: Classic,
  modern: Modern,
};

export default function Subsection({ styling, type, ...props }) {
  if (!styling) {
    return null;
  }

  const { headers, theme } = styling;

  // enlarges/formats header section differently
  return type === 'header'
    ? HEADERS[headers.key](props)
    : THEMES[theme.key](props);
}
