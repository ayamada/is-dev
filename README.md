# @tir.jp/is-dev

[![npm version](https://img.shields.io/npm/v/@tir.jp/is-dev.svg)](https://www.npmjs.com/package/@tir.jp/is-dev)
[![License](https://img.shields.io/npm/l/@tir.jp/is-dev.svg)](https://www.npmjs.com/package/@tir.jp/is-dev)

Lightweight environment detection and assertions optimized for tree-shaking and dead code elimination in bundlers like esbuild.

This module provides constants and functions that can be completely removed from your production build when used with a bundler that supports dead code elimination (e.g., esbuild, rollup, webpack).

## Installation

```bash
npm install @tir.jp/is-dev
```

## Features

### `isDev` and `isProd`

Detects the current environment. It looks for `IS_DEV` or `IS_PROD` global variables (defined via bundler define plugins). If neither is defined, `isDev` defaults to `true`.

```javascript
import { isDev, isProd } from '@tir.jp/is-dev';

if (isDev) {
  console.log('Running in development mode');
}

if (isProd) {
  // This block and the check itself can be eliminated in production
  // if IS_DEV/IS_PROD are defined as constants.
}
```

### `assert(condition, message)`

A simple assertion function. In production mode, it becomes an empty function and can be completely removed by your bundler.

```javascript
import { assert } from '@tir.jp/is-dev';

assert(value > 0, 'value must be positive');
```

### `assertOnlyValidParams(invalids)`

Checks if an object (typically containing "rest" parameters) is empty. Useful for catching typos in parameter objects during development without any production overhead.

```javascript
import { assertOnlyValidParams } from '@tir.jp/is-dev';

function myFunction(params) {
  const { foo, bar, ...invalids } = params || {};
  assertOnlyValidParams(invalids);
  
  // Logic using foo and bar...
}
```

## Production Optimization (e.g., esbuild)

To achieve full code elimination, define `IS_DEV` or `IS_PROD` as constants in your bundler configuration.

### esbuild example

```bash
esbuild app.js --bundle --minify --define:IS_DEV=false --outfile=out.js
```

In this case, `isDev` becomes `false` at compile time, and all `isDev` blocks and `assert` calls will be removed from the final bundle.

## License

Zlib
