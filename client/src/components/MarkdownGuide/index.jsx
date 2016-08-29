import React from 'react';

const MarkdownGuide = () =>
  <div className="markdown-guide">
    <table>
      <thead>
        <tr>
          <th><h4 className="m-b-0">Markdown</h4></th>
          <th><h4 className="m-b-0">Result</h4></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td># H1</td>
          <td><h1 className="m-b-0">H1</h1></td>
        </tr>
        <tr>
          <td>## H2</td>
          <td><h2 className="m-b-0">H2</h2></td>
        </tr>
        <tr>
          <td>### H3</td>
          <td><h3 className="m-b-0">H3</h3></td>
        </tr>
        <tr>
          <td>**Bold**</td>
          <td><strong>Bold</strong></td>
        </tr>
        <tr>
          <td>*Italic*</td>
          <td><em>Italic</em></td>
        </tr>
        <tr>
          <td>~~Strike-through~~</td>
          <td><del>Strike-through</del></td>
        </tr>
        <tr>
          <td>[Link](http://)</td>
          <td><a href={undefined} onClick={(e) => e.preventDefault()}>Link</a></td>
        </tr>
        <tr>
          <td>![alt](http://)</td>
          <td><i className="icon icon-image5 m-r-sm" />Image</td>
        </tr>
        <tr>
          <td>* List item</td>
          <td><li>List item</li></td>
        </tr>
        <tr>
          <td>&gt; Blockquote</td>
          <td><blockquote>Blockquote</blockquote></td>
        </tr>
        <tr>
          <td>`inline code`</td>
          <td><code>inline code</code></td>
        </tr>
        <tr>
          <td>
            <span>```</span>
            <br />
            <span>multiline code</span>
            <br />
            <span>```</span>
          </td>
          <td>
            <pre>
              <code>multiline code</code>
            </pre>
          </td>
        </tr>
        <tr>
          <td>---</td>
          <td><hr /></td>
        </tr>
        <tr>
          <td>
            <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>;

export default MarkdownGuide;
