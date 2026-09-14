import React from 'react';

const FORMAT = {
  BOLD: 'bold',
  ITALIC: 'italic',
  STRIKETHROUGH: 'strikethrough',
};

export class FormatMatch {
  constructor(text, position, format) {
    this.text = text;
    this.position = position;
    this.format = format;
  }

  render() {
    const { start, end } = this.position;
    const formattedText = this.text.substring(start, end);

    /* kind of hard-coded removal of special characters */
    switch (this.format) {
      case FORMAT.BOLD:
        return React.createElement(
          'b',
          null,
          formattedText.substring(2, formattedText.length - 2)
        );
      case FORMAT.ITALIC:
        return React.createElement(
          'i',
          null,
          formattedText.substring(1, formattedText.length - 1)
        );
      case FORMAT.STRIKETHROUGH:
        return React.createElement(
          's',
          null,
          formattedText.substring(1, formattedText.length - 1)
        );
      default:
        return this.text;
    }
  }
}

export default function formatterMatchParser(text) {
  const specs = [
    { regex: /\*{2}(.+?)\*{2}/g, format: FORMAT.BOLD },
    { regex: /_(.+?)_/g, format: FORMAT.ITALIC },
    { regex: /~(.+?)~/g, format: FORMAT.STRIKETHROUGH },
  ];

  const matches = [];

  specs.forEach(({ regex, format }) => {
    let match;
    // eslint-disable-next-line no-cond-assign
    while ((match = regex.exec(text)) !== null) {
      matches.push(
        new FormatMatch(
          text,
          { start: match.index, end: regex.lastIndex },
          format
        )
      );
    }
  });

  matches.sort((a, b) => a.position.start - b.position.start);
  return matches;
}
