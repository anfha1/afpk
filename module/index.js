/**
 * AFPK Modules
 * Re-exports modules from af-common-min and native afpk modules
 */

import { module } from "af-common-min"
import Server from './server.js'

export default {
  ...module,
  Server,
}