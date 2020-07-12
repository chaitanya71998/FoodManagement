const envVariables = process.env
const Config = {}
console.log('env', process.env)
Object.keys(envVariables).forEach(variable => {
   if (variable.includes('REACT_APP_')) {
      const envKey = variable.replace('REACT_APP_', '')
      Config[envKey] = envVariables[variable]
   }
})

export default Config
