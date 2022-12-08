import {StyleInfo} from 'lit/directives/style-map'
import {buildColors, BuildColorsParams, Colors} from './colors'
import {buildElevations, Elevations} from './elevations'

export interface CSSVariables extends Colors, Elevations, StyleInfo {}

export function buildCSSVariables({primaryKey, secondaryKey, errorKey, mode = 'light'}: BuildColorsParams): CSSVariables {
  return {
    ...buildColors({primaryKey, secondaryKey, errorKey, mode}),
    ...buildElevations()
  }
}
