 import {LitElement, html} from 'lit'
 import {customElement, property} from 'lit/decorators.js'
 import {ifDefined} from 'lit/directives/if-defined.js'
 import { live } from 'lit/directives/live.js';
 
 import styles from './styles'

@customElement('text-field')
export class TextField extends LitElement {
  static override styles = styles

  @property() disabled = false
  @property() label: string | undefined
  @property() placeholder: string | undefined
  @property() value = ''
  @property() type: 'text' | 'html' = 'text'
 
  private async _handleChange(event: InputEvent) {
    const target = event.currentTarget as HTMLInputElement
    let newHTML = target.innerHTML
    newHTML = newHTML.replace(/<!--\?(lit\$\d+\$)?-->/g, '')
    if(newHTML == '<br>') {
      newHTML = ''
    }
    this.value = newHTML
    await this.updateComplete;
    if (this.onchange) {
      const event = new CustomEvent('change', {detail: {value: this.value}, bubbles: true, composed: true})
      this.dispatchEvent(event)
    }
  }

  override render() {
    console.log(this.type)
    if (this.type === 'html') {
      return html`
        <div
          role="textbox"
          contentEditable
          data-placeholder="${ifDefined(this.placeholder)}"
          @input="${this._handleChange}"
          .innerHTML="${live(this.value)}"
        ></div>
      `
    }
    return html`
      <input
        type="text"
        placeholder="${ifDefined(this.placeholder)}"
        .value="${live(this.value)}"
        @change="${this._handleChange}"
      />
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'text-field': TextField
  }
}
 