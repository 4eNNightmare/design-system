 import summary from 'rollup-plugin-summary'
 import { terser } from 'rollup-plugin-terser'
 import resolve from '@rollup/plugin-node-resolve'
 import replace from '@rollup/plugin-replace'
 import cleanup from 'rollup-plugin-cleanup'
 import pkg from './package.json' assert { type: "json" }

 export default {
   input: 'dist/index.js',
   output: [
     {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd'
    },
    {
      file: pkg.module,
      format: 'esm'
    }
   ],
   onwarn(warning) {
     if (warning.code !== 'THIS_IS_UNDEFINED') {
       console.error(`(!) ${warning.message}`);
     }
   },
   plugins: [
     replace({'Reflect.decorate': 'undefined', preventAssignment: true}),
     resolve(),
     terser({
       ecma: 2017,
       module: true,
       warnings: true,
       mangle: {
         properties: {
           regex: /^__/,
         },
       },
     }),
     cleanup({
      comments: 'none'
     }),
     summary()
   ],
 };