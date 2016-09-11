import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { colors } from '../../styles/settings';

const styles = StyleSheet.create({
  guide: {
    marginBottom: '1rem',
    background: '#fff',
  },
  table: {
    width: '100%',
  },
  th: {
    padding: '15px 20px',
    fontSize: '1.5rem',
    fontWeight: '500',
  },
  td: {
    padding: '10px 20px',
  },
  theadTr: {
    borderBottom: `1px solid ${colors.grayLighter}`,
  },
});

const MarkdownGuide = () =>
  <div className={css(styles.guide)}>
    <table className={css(styles.table)}>
      <thead>
        <tr className={css(styles.theadTr)}>
          <th className={css(styles.th)}>Markdown</th>
          <th className={css(styles.th)}>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={css(styles.td)}># H1</td>
          <td className={css(styles.td)}><h1 style={{ marginBottom: '0' }}>H1</h1></td>
        </tr>
        <tr>
          <td className={css(styles.td)}>## H2</td>
          <td className={css(styles.td)}><h2 style={{ marginBottom: '0' }}>H2</h2></td>
        </tr>
        <tr>
          <td className={css(styles.td)}>### H3</td>
          <td className={css(styles.td)}><h3 style={{ marginBottom: '0' }}>H3</h3></td>
        </tr>
        <tr>
          <td className={css(styles.td)}>**Bold**</td>
          <td className={css(styles.td)}><strong>Bold</strong></td>
        </tr>
        <tr>
          <td className={css(styles.td)}>*Italic*</td>
          <td className={css(styles.td)}><em>Italic</em></td>
        </tr>
        <tr>
          <td className={css(styles.td)}>~~Strike-through~~</td>
          <td className={css(styles.td)}><del>Strike-through</del></td>
        </tr>
        <tr>
          <td className={css(styles.td)}>[Link](http://)</td>
          <td className={css(styles.td)}>
            <a href={undefined} onClick={(e) => e.preventDefault()}>Link</a>
          </td>
        </tr>
        <tr>
          <td className={css(styles.td)}>![alt](http://)</td>
          <td className={css(styles.td)}><i className="glyphicon glyphicon-picture" />Image</td>
        </tr>
        <tr>
          <td className={css(styles.td)}>* List item</td>
          <td className={css(styles.td)}><li>List item</li></td>
        </tr>
        <tr>
          <td className={css(styles.td)}>&gt; Blockquote</td>
          <td className={css(styles.td)}><blockquote>Blockquote</blockquote></td>
        </tr>
        <tr>
          <td className={css(styles.td)}>`inline code`</td>
          <td className={css(styles.td)}><code>inline code</code></td>
        </tr>
        <tr>
          <td className={css(styles.td)}>
            <span>```</span>
            <br />
            <span>multiline code</span>
            <br />
            <span>```</span>
          </td>
          <td className={css(styles.td)}>
            <pre>
              <code>multiline code</code>
            </pre>
          </td>
        </tr>
        <tr>
          <td className={css(styles.td)}>---</td>
          <td className={css(styles.td)}><hr /></td>
        </tr>
        <tr>
          <td className={css(styles.td)}>
            <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>;

export default MarkdownGuide;
