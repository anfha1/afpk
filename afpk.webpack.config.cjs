const path = require('path');
const JavaScriptObfuscator = require('webpack-obfuscator');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './index.js', // File entry chính
  experiments: {
    outputModule: true, // Enable ES module output
  },
  output: {
    path: path.resolve(__dirname, 'package', 'afpk-min'),
    filename: 'index.js',
    module: true, // Build as ES module
    library: {
      type: 'module', // ES module format
    },
  },
  resolve: {
    extensions: ['.js', '.mjs'],
  },
  externals: [
    nodeExternals({
      // Không externalize af-common-min, bundle nó vào
      // Các native modules (sqlite3, better-sqlite3) sẽ tự động được externalize
      allowlist: [/^af-common-min/]
    })
  ],
  /* externals: {
    'fs': 'commonjs fs',
    'path': 'commonjs path',
    'os': 'commonjs os',
    'crypto': 'commonjs crypto',
    'bufferutil': 'commonjs bufferutil',
    'utf-8-validate': 'commonjs utf-8-validate',
    'better-sqlite3': 'commonjs better-sqlite3'
  }, */
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: []
  },
  plugins: [
    new JavaScriptObfuscator({
      compact: true,
      debugProtection: false,
      debugProtectionInterval: 0,
      identifierNamesGenerator: 'hexadecimal',
      log: false,
      renameGlobals: false,
      simplify: true,
      splitStringsChunkLength: 10,
    }, [
      '**/node_modules/**',
    ]),
  ]
};