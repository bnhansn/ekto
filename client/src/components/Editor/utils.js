/* eslint-disable max-len, no-regex-spaces, arrow-body-style */

/**
* Showdown extension to convert newlines to <br /> tags
*/
import showdown from 'showdown';

export function newlineExtension() {
  return showdown.extension('newline', () => {
    return [
      {
        type: 'lang',
        filter: text => {
          return text.replace(/^( *(\d+\.  {1,4}|[\w<'">\-*+])[^\n]*)\n{1}(?!\n| *\d+\. {1,4}| *[-*+] +|#|$)/gm, e => {
            return `${e.trim()}  \n`;
          });
        },
      },
    ];
  });
}
