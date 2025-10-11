const path = require('path');
const JavaScriptObfuscator = require('webpack-obfuscator');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './index.js', // File entry chính
  output: {
    path: path.resolve(__dirname, 'package', 'afpk-min'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.mjs'],
  },
  externals: [nodeExternals()],
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