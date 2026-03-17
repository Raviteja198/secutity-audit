/**
 * Environment detection utility
 * Determines the deployment environment based on DEPLOYMENT_ENV variable
 */

export type DeploymentEnv = 'LOCAL' | 'DEV' | 'PROD'

/**
 * Get the current deployment environment
 */
export function getDeploymentEnv(): DeploymentEnv {
  const env = process.env.DEPLOYMENT_ENV as string | undefined

  if (!env || env === 'LOCAL') {
    return 'LOCAL'
  }

  if (env === 'DEV') {
    return 'DEV'
  }

  if (env === 'PROD') {
    return 'PROD'
  }

  // Default to LOCAL if invalid value
  console.warn(
    `[ENV] Invalid DEPLOYMENT_ENV value: "${env}". Defaulting to LOCAL. Valid values are: LOCAL, DEV, PROD`
  )
  return 'LOCAL'
}

/**
 * Check if running in local environment
 */
export function isLocal(): boolean {
  return getDeploymentEnv() === 'LOCAL'
}

/**
 * Check if running in dev environment
 */
export function isDev(): boolean {
  return getDeploymentEnv() === 'DEV'
}

/**
 * Check if running in production environment
 */
export function isProd(): boolean {
  return getDeploymentEnv() === 'PROD'
}

/**
 * Get environment-specific configuration
 */
export function getEnvConfig() {
  const env = getDeploymentEnv()

  return {
    env,
    isLocal: env === 'LOCAL',
    isDev: env === 'DEV',
    isProd: env === 'PROD',
    debug: env === 'LOCAL' || env === 'DEV',
  }
}
