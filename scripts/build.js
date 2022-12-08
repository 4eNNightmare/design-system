import fs from 'fs-extra'
import { rollup } from 'rollup'
import pkg from '../package.json' assert { type: "json" }
import config from '../rollup.config.js'

async function build() {
  for (const options of config) {
    const bundle = await rollup(options)
    await bundle.write(options.output)
  }
}

async function RemoveUnwantedFiles() {
  const root = pkg.module.split('/')[0]
  fs.readdirSync(root).forEach(name => {
    const path = `${root}/${name}`
    if (path !== pkg.module && path !== pkg.types) {
      fs.removeSync(`${root}/${name}`)
    }
  })
  console.log('Files Removed')
}

build().then(async () => {
  await RemoveUnwantedFiles()
  console.log('Build complete')
}).catch(err => {
  console.error(err)
})
