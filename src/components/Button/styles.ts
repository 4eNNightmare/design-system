import {css} from 'lit'

export default css`
  button {
    background-color: var(--wds-theme-color-surface-tint-1);
    color: var(--wds-theme-color-primary);
    height: 40px;
    border: none;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    box-shadow: var(--wds-theme-elevation-1);
    padding: 0 24px;
  }

  button:hover {
    background-color: var(--wds-theme-color-surface-tint-2);
    box-shadow: var(--wds-theme-elevation-2);
  }

  button:active {
    background-color: var(--wds-theme-color-surface-tint-3);
    box-shadow: var(--wds-theme-elevation-1);
  }

  button:disabled {
    background-color: var(--wds-theme-color-on-surface);
    color: var(--wds-theme-color-on-surface);
    box-shadow: var(--wds-theme-elevation-0);
    opacity: 0.38;
  }

  button.has-icon {
    padding-left: 16px;
  }

  ::slotted([slot='icon']) {
    margin-right: 8px;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }
`
