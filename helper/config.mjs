export default {
  param(config) {
    let envParam = [...process.argv]
    envParam = envParam.slice(2)
    envParam.map(param => {
      let envData = param.split('=')
      if (envData.length === 2) {
        config[envData[0]] = envData[1]
      } else {
        config[param] = true
      }
    })
    return config
  }
}