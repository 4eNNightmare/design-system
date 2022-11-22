import { css } from 'lit';

export default css`
  :host {
    position: relative;
    display: block;
  }
  div, input {
    display: block;
    border: solid 1px gray;
    max-width: 800px;
    outline: none;
    padding: 8px 16px;
    border-radius: 4px;
    white-space: nowrap;
  }
  div[data-placeholder]:empty::before {
    content: attr(data-placeholder);
    color: gray;
    position: absolute;
    pointer-events: none;
    top: 50%;
    transform: translateY(-50%);
    left: 16px;
  }

  div:focus, input:focus {
    border-color: blue;
    border-width: 2px;
  }
`