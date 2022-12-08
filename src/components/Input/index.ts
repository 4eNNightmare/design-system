import {LitElement, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {ifDefined} from 'lit/directives/if-defined.js'
import {live} from 'lit/directives/live.js'

import styles from './styles'

@customElement('wds-input')
export class Input extends LitElement {
  static override styles = styles

  @property({type: Boolean}) disabled = false
  @property({type: String}) label: string | undefined
  @property({type: String}) placeholder: string | undefined
  @property({type: String}) value = ''
  @property({type: String}) type: 'text' | 'wysiwyg' = 'text'

  private async _handleChange(event: InputEvent) {
    const target = event.currentTarget as HTMLInputElement
    let newHTML = target.innerHTML
    newHTML = newHTML.replace(/<!--\?(lit\$\d+\$)?-->/g, '')
    if (newHTML == '<br>') {
      newHTML = ''
    }
    this.value = newHTML
    await this.updateComplete
    if (this.onchange) {
      const event = new CustomEvent('change', {detail: {value: this.value}, bubbles: true, composed: true})
      this.dispatchEvent(event)
    }
  }

  override render() {
    if (this.type === 'wysiwyg') {
      return html` <div role="textbox" contenteditable data-placeholder="${ifDefined(this.placeholder)}" @input="${this._handleChange}" .innerHTML="${live(this.value)}"></div> `
    }
    return html` <input type="text" placeholder="${ifDefined(this.placeholder)}" .value="${live(this.value)}" @change="${this._handleChange}" /> `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wds-input': Input
  }
}
