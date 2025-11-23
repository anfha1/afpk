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
      // Bundle tất cả dependencies CommonJS vào, chỉ externalize native modules
      // Các native modules (sqlite3, better-sqlite3) sẽ tự động được externalize
      // Temporarily externalize af-common-min to test if the issue is from af-common-min
      // Externalize ua-parser-js để tránh vấn đề với import.meta.url trong createRequire
      // Nó sẽ được install từ dependencies và import dynamic khi runtime
      allowlist: [/^express/, /^cookie-parser/, /^cookie/, /^cors/, /^socket\.io/, /^better-sqlite3/, /^fs-extra/, /^googleapis/, /^http-proxy-middleware/]
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
      // Preserve exports để giữ lại các exports trong default export object
      reservedNames: ['UAParser', 'sqlite3', 'cors', 'cookieParser', 'Server', 'fsExtra', 'createProxyMiddleware', 'express', 'cookie', 'cryptoJs', 'DateTime'],
    }, [
      '**/node_modules/**',
    ]),
  ]
};