import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import dts from "rollup-plugin-dts"
import typescript from '@rollup/plugin-typescript'
import minifyHTML from 'rollup-plugin-minify-html-literals'
import pkg from './package.json' assert { type: "json" }

export default [{
    input: 'src/index.ts',
    output: {
       file: pkg.module,
       format: 'esm'
    },
    onwarn(warning) {
      if (warning.code !== 'THIS_IS_UNDEFINED') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: [
      resolve(),
      minifyHTML.default(),
      typescript({sourceMap: false, inlineSources: false}),
      replace({'Reflect.decorate': 'undefined', preventAssignment: true}),
      terser({
        ecma: 2017,
        module: true,
        warnings: true,
        mangle: {
          properties: {
            regex: /^__/,
          },
        },
        output: {
          comments: false
        }
      })
    ],
  },
   {
     input: pkg.types,
     output: { file: pkg.types, format: "es" },
     plugins: [dts({respectExternal: true})]
   }
 ]