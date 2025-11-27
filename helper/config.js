/**
 * Parse environment parameters from command line arguments
 * @param {object} config - Config object to merge parameters into
 * @returns {object} Config object with parsed parameters
 */
export function getEnvParam(config = {}) {
  const args = process.argv.slice(2)

  args.forEach(param => {
    const [key, value] = param.split('=')

    if (value !== undefined) {
      config[key] = value
    } else {
      config[param] = true
    }
  })

  return config
}