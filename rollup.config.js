 import summary from 'rollup-plugin-summary'
 import { terser } from 'rollup-plugin-terser'
 import resolve from '@rollup/plugin-node-resolve'
 import replace from '@rollup/plugin-replace'
 import cleanup from 'rollup-plugin-cleanup'
 import dts from "rollup-plugin-dts"
 import pkg from './package.json' assert { type: "json" }

 export default [{
   input: '.tmp/index.js',
   external: Object.keys(pkg.dependencies),
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
 },
  {
    input: ".tmp/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  }
];