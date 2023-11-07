import React from 'react';

const boldRegex = /\*{2}(.+?)\*{2}/g;
const italicRegex = /_{1}(.+?)_{1}/g;
const strikethroughRegex = /~{1}(.+?)~{1}/g;

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

function whichFormattingMatch(regexes, text) {
  for (let i = 0; i < regexes.length; i += 1) {
    const { regex, format } = regexes[i];
    const match = regex.exec(text);

    if (match) {
      return {
        format,
        position: {
          start: match.index,
          end: regex.lastIndex,
        },
      };
    }
  }

  return null;
}

export default function formatterMatchParser(text) {
  const matches = [];
  const regexes = [
    {
      regex: new RegExp(boldRegex, 'gi'),
      format: FORMAT.BOLD,
    },
    {
      regex: new RegExp(italicRegex, 'gi'),
      format: FORMAT.ITALIC,
    },
    {
      regex: new RegExp(strikethroughRegex, 'gi'),
      format: FORMAT.STRIKETHROUGH,
    },
  ];

  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = whichFormattingMatch(regexes, text)) !== null) {
    const { format, position } = match;
    matches.push(new FormatMatch(text, position, format));
  }

  return matches;
}
