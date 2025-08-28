import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

const onwarn = (warning, warn) => {
  // Suppress circular dependency warnings for external packages
  if (warning.code === 'CIRCULAR_DEPENDENCY' && 
      warning.message.includes('node_modules')) {
    return;
  }
  // Show all other warnings
  warn(warning);
};

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
      }),
      commonjs(),
      postcss({
        extract: 'index.css',
        minimize: false,
        sourceMap: true,
        inject: false,
        config: {
          path: './postcss.config.js',
        },
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
      }),
      // Suppress "use client" directive warnings with proper sourcemap generation
      {
        name: 'suppress-use-client',
        transform(code, id) {
          if (code.includes('"use client"') || code.includes("'use client'")) {
            const transformedCode = code.replace(/["']use client["'];?\s*\n?/g, '');
            return {
              code: transformedCode,
              map: null // Preserve original sourcemap
            };
          }
          return null;
        }
      },
    ],
    external: ['react', 'react-dom'],
    onwarn,
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];