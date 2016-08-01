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
          <td># Heading</td>
          <td><h1 className="m-b-0">H1</h1></td>
        </tr>
        <tr>
          <td>## Heading</td>
          <td><h2 className="m-b-0">H2</h2></td>
        </tr>
        <tr>
          <td>### Heading</td>
          <td><h3 className="m-b-0">H3</h3></td>
        </tr>
        <tr>
          <td>**text**</td>
          <td><strong>Bold</strong></td>
        </tr>
        <tr>
          <td>*text*</td>
          <td><em>Italic</em></td>
        </tr>
        <tr>
          <td>~~text~~</td>
          <td><del>Strike-through</del></td>
        </tr>
        <tr>
          <td>[title](http://)</td>
          <td><a href="#" onClick={(e) => e.preventDefault()}>Link</a></td>
        </tr>
        <tr>
          <td>`code`</td>
          <td><code>Inline Code</code></td>
        </tr>
        <tr>
          <td>![alt](http://)</td>
          <td><i className="icon icon-image5 m-r-sm"></i>Image</td>
        </tr>
        <tr>
          <td>* item</td>
          <td><li>List</li></td>
        </tr>
        <tr>
          <td>&gt; quote</td>
          <td><blockquote>Blockquote</blockquote></td>
        </tr>
        <tr>
          <td>---</td>
          <td><hr /></td>
        </tr>
        <tr>
          <td><a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">Documentation</a></td>
        </tr>
      </tbody>
    </table>
  </div>;

export default MarkdownGuide;
