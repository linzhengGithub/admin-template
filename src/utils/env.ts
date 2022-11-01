export function globalConfig() {
  const config = getAppEnvConfig()
  const {
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX,
  } = config

  const global = {
    baseURL: VITE_GLOB_API_URL,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
  }

  return global
}

export function getAppEnvConfig() {
  const ENV = import.meta.env
  return ENV
}

/**
 * @description: Development mode
 */
export const devMode = 'development'

/**
  * @description: Production mode
  */
export const prodMode = 'production'
