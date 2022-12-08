import {AnyColor, colord, extend} from 'colord'
import a11yPlugin from 'colord/plugins/a11y'
import namesPlugin from 'colord/plugins/names'
import mixPlugin from 'colord/plugins/mix'
import {Hct, TonalPalette, hexFromArgb, argbFromHex} from '@material/material-color-utilities'

extend([a11yPlugin, namesPlugin, mixPlugin])

export interface BuildColorsParams {
  primaryKey: AnyColor
  secondaryKey: AnyColor
  errorKey: AnyColor
  mode?: 'light' | 'dark'
}

export interface Colors {
  '--wds-theme-color-primary': string
  '--wds-theme-color-on-primary': string
  '--wds-theme-color-primary-container': string
  '--wds-theme-color-on-primary-container': string
  '--wds-theme-color-secondary': string
  '--wds-theme-color-on-secondary': string
  '--wds-theme-color-secondary-container': string
  '--wds-theme-color-on-secondary-container': string
  '--wds-theme-color-error': string
  '--wds-theme-color-on-error': string
  '--wds-theme-color-error-container': string
  '--wds-theme-color-on-error-container': string
  '--wds-theme-color-background': string
  '--wds-theme-color-on-background': string
  '--wds-theme-color-surface': string
  '--wds-theme-color-surface-tint-1': string
  '--wds-theme-color-surface-tint-2': string
  '--wds-theme-color-surface-tint-3': string
  '--wds-theme-color-surface-tint-4': string
  '--wds-theme-color-surface-tint-5': string
  '--wds-theme-color-on-surface': string
  '--wds-theme-color-surface-variant': string
  '--wds-theme-color-on-surface-variant': string
  '--wds-theme-color-outline': string
}

function buildPalette(colorKey: string) {
  return TonalPalette.fromInt(argbFromHex(colorKey))
}

function buildPaletteWithChroma(colorKey: string, chroma: number) {
  return TonalPalette.fromHueAndChroma(Hct.fromInt(argbFromHex(colorKey)).hue, chroma)
}

function buildPaletteOrDefaultHueAndChroma(colorKey: string | undefined, hue: number, chroma: number) {
  return colorKey ? TonalPalette.fromInt(argbFromHex(colorKey)) : TonalPalette.fromHueAndChroma(hue, chroma)
}

function hexFromPaletteTone(palette: TonalPalette, tone: number) {
  return hexFromArgb(palette.tone(tone)) as unknown as string
}

function generateSurfaceTint(hexSurface: string, hexPrimary: string) {
  return {
    surfaceTint1: colord(hexSurface).mix(hexPrimary, 0.05).toHex(),
    surfaceTint2: colord(hexSurface).mix(hexPrimary, 0.08).toHex(),
    surfaceTint3: colord(hexSurface).mix(hexPrimary, 0.11).toHex(),
    surfaceTint4: colord(hexSurface).mix(hexPrimary, 0.12).toHex(),
    surfaceTint5: colord(hexSurface).mix(hexPrimary, 0.14).toHex()
  }
}

export function buildColors({primaryKey, secondaryKey, errorKey, mode = 'light'}: BuildColorsParams): Colors {
  const primaryPalette = buildPalette(colord(primaryKey).toHex())
  const secondaryPalette = buildPalette(colord(secondaryKey).toHex())
  const neutralPalette = buildPaletteWithChroma(colord(primaryKey).toHex(), 4)
  const neutralVariantPalette = buildPaletteWithChroma(colord(primaryKey).toHex(), 8)
  const errorPalette = buildPaletteOrDefaultHueAndChroma(colord(errorKey).toHex(), 25, 84)

  const light = mode === 'light'

  const primary = hexFromPaletteTone(primaryPalette, light ? 40 : 80)
  const onPrimary = hexFromPaletteTone(primaryPalette, light ? 100 : 20)
  const primaryContainer = hexFromPaletteTone(primaryPalette, light ? 90 : 30)
  const onPrimaryContainer = hexFromPaletteTone(primaryPalette, light ? 10 : 90)
  const secondary = hexFromPaletteTone(secondaryPalette, light ? 40 : 80)
  const onSecondary = hexFromPaletteTone(secondaryPalette, light ? 100 : 20)
  const secondaryContainer = hexFromPaletteTone(secondaryPalette, light ? 90 : 30)
  const onSecondaryContainer = hexFromPaletteTone(secondaryPalette, light ? 10 : 90)
  const error = hexFromPaletteTone(errorPalette, light ? 40 : 80)
  const onError = hexFromPaletteTone(errorPalette, light ? 100 : 20)
  const errorContainer = hexFromPaletteTone(errorPalette, light ? 90 : 30)
  const onErrorContainer = hexFromPaletteTone(errorPalette, light ? 10 : 80)
  const background = hexFromPaletteTone(neutralPalette, light ? 99 : 10)
  const onBackground = hexFromPaletteTone(neutralPalette, light ? 10 : 90)
  const surface = hexFromPaletteTone(neutralPalette, light ? 99 : 10)
  const onSurface = hexFromPaletteTone(neutralPalette, light ? 10 : 90)
  const surfaceVariant = hexFromPaletteTone(neutralVariantPalette, light ? 90 : 30)
  const onSurfaceVariant = hexFromPaletteTone(neutralVariantPalette, light ? 30 : 80)
  const outline = hexFromPaletteTone(neutralVariantPalette, light ? 50 : 60)
  const {surfaceTint1, surfaceTint2, surfaceTint3, surfaceTint4, surfaceTint5} = generateSurfaceTint(surface, primary)

  return {
    '--wds-theme-color-primary': primary,
    '--wds-theme-color-on-primary': onPrimary,
    '--wds-theme-color-primary-container': primaryContainer,
    '--wds-theme-color-on-primary-container': onPrimaryContainer,
    '--wds-theme-color-secondary': secondary,
    '--wds-theme-color-on-secondary': onSecondary,
    '--wds-theme-color-secondary-container': secondaryContainer,
    '--wds-theme-color-on-secondary-container': onSecondaryContainer,
    '--wds-theme-color-error': error,
    '--wds-theme-color-on-error': onError,
    '--wds-theme-color-error-container': errorContainer,
    '--wds-theme-color-on-error-container': onErrorContainer,
    '--wds-theme-color-background': background,
    '--wds-theme-color-on-background': onBackground,
    '--wds-theme-color-surface': surface,
    '--wds-theme-color-surface-tint-1': surfaceTint1,
    '--wds-theme-color-surface-tint-2': surfaceTint2,
    '--wds-theme-color-surface-tint-3': surfaceTint3,
    '--wds-theme-color-surface-tint-4': surfaceTint4,
    '--wds-theme-color-surface-tint-5': surfaceTint5,
    '--wds-theme-color-on-surface': onSurface,
    '--wds-theme-color-surface-variant': surfaceVariant,
    '--wds-theme-color-on-surface-variant': onSurfaceVariant,
    '--wds-theme-color-outline': outline
  }
}
