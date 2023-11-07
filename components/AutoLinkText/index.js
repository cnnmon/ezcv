/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
/* Taken from https://github.com/schneidmaster/react-autolink-text/blob/master/src/index.js */

import React, { PureComponent } from 'react';
import matchParser from './match_parser';
import URLMatch from './url_match';
import formatterMatchParser, { FormatMatch } from './match_format';

export default class AutoLinkText extends PureComponent {
  prepareElements(urlMatches, formatterMatches, text) {
    const elements = [];
    let lastIndex = 0;

    /* check both urlMatches and formatterMatches for the next match,
     * and add the next element to the list of elements
     */
    while (urlMatches.length > 0 || formatterMatches.length > 0) {
      let nextMatch;

      if (urlMatches.length === 0) {
        nextMatch = formatterMatches.shift();
      } else if (formatterMatches.length === 0) {
        nextMatch = urlMatches.shift();
      } else if (
        urlMatches[0].position.start < formatterMatches[0].position.start
      ) {
        nextMatch = urlMatches.shift();
      } else {
        nextMatch = formatterMatches.shift();
      }

      if (nextMatch.position.start !== 0) {
        elements.push(
          React.createElement(
            'span',
            {},
            text.slice(lastIndex, nextMatch.position.start)
          )
        );
      }

      if (nextMatch instanceof URLMatch) {
        elements.push(
          React.createElement(
            'a',
            { href: nextMatch.getAnchorHref(), ...this.props.linkProps },
            nextMatch.getAnchorText()
          )
        );
      } else if (nextMatch instanceof FormatMatch) {
        elements.push(nextMatch.render());
      }

      lastIndex = nextMatch.position.end;
    }

    if (lastIndex < text.length) {
      elements.push(React.createElement('span', {}, text.slice(lastIndex)));
    }

    /*
    urlMatches.forEach((match) => {
      if (match.position.start !== 0) {
        elements.push(
          React.createElement(
            'span',
            {},
            text.slice(lastIndex, match.position.start)
          )
        );
      }
      elements.push(
        React.createElement(
          'a',
          { href: match.getAnchorHref(), ...this.props.linkProps },
          match.getAnchorText()
        )
      );
      lastIndex = match.position.end;
    });

    if (lastIndex < text.length) {
      elements.push(React.createElement('span', {}, text.slice(lastIndex)));
    }
    */

    return elements;
  }

  truncate(items) {
    if (!this.props.maxLength) return items;

    const elements = [];
    let length = 0;

    items.some((el) => {
      length += el.props.children.length;

      if (length > this.props.maxLength) {
        const truncatedText = el.props.children.slice(
          0,
          -(length - this.props.maxLength)
        );
        elements.push(React.cloneElement(el, {}, truncatedText));
        return true; // stop iterating through the elements
      }

      elements.push(el);
      return false;
    });

    return elements;
  }

  /*
   * Generate unique keys for each of the elements.
   * The key will be based on the index of the element.
   */
  keyElements(elements) {
    return elements.map((el, index) => React.cloneElement(el, { key: index }));
  }

  render() {
    const text = this.props.text || '';

    const keyedElements = this.keyElements(
      this.truncate(
        this.prepareElements(
          matchParser(text, this.props.disableUrlStripping),
          formatterMatchParser(text),
          text
        )
      )
    );

    return React.createElement('span', {}, keyedElements);
  }
}
