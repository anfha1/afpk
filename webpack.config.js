// webpack.config.js (ESM)
import path from "path";
import { fileURLToPath } from "url";
import JavaScriptObfuscator from "webpack-obfuscator";
import nodeExternals from "webpack-node-externals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "production",
  target: "node",
  entry: "./index.js",

  experiments: {
    outputModule: true,
  },

  output: {
    path: path.resolve(__dirname, "afpk-min"),
    filename: "index.js",
    module: true,
    library: {
      type: "module",
    },
    // Cho phép chunkLoading với import để preserve import.meta
    chunkFormat: "module",
  },

  resolve: {
    extensions: [".js", ".mjs"],
  },

  // Externalize tất cả node_modules để tránh bundle các packages có sử dụng import.meta
  externals: [
    nodeExternals({
      // Không bundle bất kỳ node_modules nào
      importType: "module",
    })
  ],

  externalsPresets: { node: true },

  node: {
    __dirname: false,
    __filename: false,
  },

  module: {
    rules: []
  },

  // Suppress warnings từ express và các third-party libraries
  ignoreWarnings: [
    {
      module: /express/,
      message: /Critical dependency: the request of a dependency is an expression/,
    },
  ],

  plugins: [
    new JavaScriptObfuscator(
      {
        compact: true,
        debugProtection: false,
        debugProtectionInterval: 0,
        identifierNamesGenerator: "hexadecimal",
        log: false,
        renameGlobals: false,
        simplify: true,
        splitStringsChunkLength: 10,
      },
      ["**/node_modules/**"]
    ),
  ],
};
