import {html, LitElement, PropertyValues} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'
import {styleMap} from 'lit/directives/style-map.js'
import {buildCSSVariables} from './cssVariables'

@customElement('wds-root')
export class WDSRoot extends LitElement {
  @property({type: String, reflect: true}) dark: 'true' | 'false' | 'auto' = 'false'
  @property({type: String, reflect: true}) primaryKey = '#023F87'
  @property({type: String, reflect: true}) secondaryKey = '#EF0C38'
  @property({type: String, reflect: true}) errorKey = '#B00020'
  @state() cssVariables = this.getCSSVariables()

  getCSSVariables() {
    return buildCSSVariables({primaryKey: this.primaryKey, secondaryKey: this.secondaryKey, errorKey: this.errorKey, mode: this.dark === 'true' ? 'dark' : 'light'})
  }

  override updated(prevProps: PropertyValues<this>) {
    if (prevProps.has('dark') || prevProps.has('primaryKey') || prevProps.has('secondaryKey') || prevProps.has('errorKey')) {
      this.cssVariables = this.getCSSVariables()
    }
  }

  override render() {
    return html` <slot style=${styleMap(this.cssVariables)}></slot> `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wds-root': WDSRoot
  }
}
