import { getKeyValuePair } from '../../utils';
import { TRIGGERS } from '../../constants';

/*
    APPENDS STYLING
    Appends to top of text if doesn't find existing styling
    Else, replaces existing styling
    Does extra spacing work for readability
  */
const appendStylingJob = (object, lines, setText) => {
  const toAppend = object.char;
  const isEmpty = (t) => t === '';
  const isStyling = (t) => t[0] === TRIGGERS.stylingTrigger;

  // checks if styling property has been defined
  // all should be at the top together
  let i = 0;
  while (i < lines.length && isStyling(lines[i])) {
    const { key } = getKeyValuePair(lines[i].substring(1));

    if (key === object.type) {
      const newLines = [...lines];
      newLines[i] = toAppend;
      setText(newLines.join('\n'));
      return;
    }

    i += 1;
  }

  // else, move the rest of the text down & append at top
  const firstSecondEmpty = isEmpty(lines[0]) && isEmpty(lines[1]);
  const newLines = `${!isEmpty(lines[0]) && !isStyling(lines[0]) ? '\n' : ''}${
    !isEmpty(lines[1]) || !isStyling(lines[1]) ? '\n' : ''
  }`;
  setText(`${toAppend}${firstSecondEmpty ? '' : newLines}${lines.join('\n')}`);
};

/*
      APPENDS TEXT to bottom of textarea
      provide spacing as needed
      scroll to bottom
    */
const appendSectionJob = (toAppend, lines, text, setText, textbox) => {
  const isTextboxEmpty = lines.length === 1 && lines[0] === '';
  if (isTextboxEmpty) {
    setText(toAppend);
    return;
  }

  // ensures appending around 2+ spaces from the last line of text
  const lastLine = lines[lines.length - 1];
  const lastLastLine = lines[lines.length - 2];
  const newLines = `${lastLine !== '' ? '\n' : ''}${
    lastLastLine !== '' ? '\n' : ''
  }`;
  setText(`${text}${newLines}${toAppend}\n`);

  // eslint-disable-next-line no-param-reassign
  textbox.current.scrollTop = textbox.current.scrollHeight;
};

const getAppendJobs = (lines, text, setText, textbox) => ({
  appendStyling: (object) => appendStylingJob(object, lines, setText),
  appendSection: (toAppend) =>
    appendSectionJob(toAppend, lines, text, setText, textbox),
});

export default getAppendJobs;
