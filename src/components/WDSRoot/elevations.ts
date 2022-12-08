const keyOpacity = 0.3
const ambientOpacity = 0.15
const shadowMap = [
  {
    key: '0px 0px 0px 0px',
    ambient: '0px 0px 0px 0px'
  },
  {
    key: '0px 1px 2px 0px',
    ambient: '0px 1px 3px 1px'
  },
  {
    key: '0px 1px 2px 0px',
    ambient: '0px 2px 6px 2px'
  },
  {
    key: '0px 1px 3px 0px',
    ambient: '0px 4px 8px 3px'
  },
  {
    key: '0px 2px 3px 0px',
    ambient: '0px 6px 10px 4px'
  },
  {
    key: '0px 4px 4px 0px',
    ambient: '0px 8px 12px 6px'
  }
]

const elevationKeys = [0, 1, 2, 3, 4, 5] as const

export interface Elevations {
  '--wds-theme-elevation-0': string
  '--wds-theme-elevation-1': string
  '--wds-theme-elevation-2': string
  '--wds-theme-elevation-3': string
  '--wds-theme-elevation-4': string
  '--wds-theme-elevation-5': string
}

export function buildElevations() {
  return elevationKeys.reduce((acc, index) => {
    const {key, ambient} = shadowMap[index]
    acc[`--wds-theme-elevation-${index}`] = `${key} rgba(0, 0, 0, ${keyOpacity}), ${ambient} rgba(0, 0, 0, ${ambientOpacity})`
    return acc
  }, {} as Elevations)
}
