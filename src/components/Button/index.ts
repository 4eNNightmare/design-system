import {html, LitElement} from 'lit'
import {customElement, property, query} from 'lit/decorators.js'

import styles from './styles'

@customElement('wds-button')
export class Button extends LitElement {
  static override styles = styles

  @property({type: Boolean, reflect: true}) disabled = false

  @query('button') button!: HTMLButtonElement

  handleIconSlotChange(e: Event) {
    const target = e.currentTarget as HTMLSlotElement
    const hasIcon = target?.assignedNodes({flatten: true}).length > 0
    if (hasIcon) {
      this.button.classList.add('has-icon')
    } else {
      this.button.classList.remove('has-icon')
    }
  }

  override render() {
    return html`
      <button @click=${() => console.log('click')} .disabled=${this.disabled}>
        <slot name="icon" @slotchange=${this.handleIconSlotChange}></slot>
        <slot></slot>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wds-button': Button
  }
}
