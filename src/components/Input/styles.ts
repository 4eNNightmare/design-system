import {css} from 'lit'

export default css`
  :host {
    position: relative;
    display: flex;
    min-width: 230px;
  }
  div,
  input {
    flex: 1;
    outline: none;
    border: 1px solid var(--wds-theme-color-outline);
    font-size: 16px;
    padding: 8px 16px;
    border-radius: 4px;
    white-space: nowrap;
    background-color: var(--wds-theme-color-surface);
    color: var(--wds-theme-color-on-surface);
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
  div:not(:focus),
  input:not(:focus) {
    border-width: 1px;
    margin: 1px 1px;
  }

  div:focus,
  input:focus {
    border-color: var(--wds-theme-color-primary);
    border-width: 2px;
  }
`
