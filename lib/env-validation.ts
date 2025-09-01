/**
 * Environment variable validation for production readiness
 * This utility checks for mock/placeholder values that should be replaced in production
 */

interface EnvValidationResult {
  isValid: boolean
  issues: string[]
  warnings: string[]
}

export function validateEnvironment(): EnvValidationResult {
  const issues: string[] = []
  const warnings: string[] = []

  // Check for mock webhook secrets
  const mockPatterns = [
    /_production_ready_/,
    /_test_/,
    /_demo_/,
    /_placeholder_/,
    /123456789/,
    /your_/,
    /YOUR_/,
    /example/,
    /EXAMPLE/
  ]

  // Validate GitHub webhook secret
  const githubWebhookSecret = process.env.GITHUB_WEBHOOK_SECRET
  if (!githubWebhookSecret) {
    issues.push('GITHUB_WEBHOOK_SECRET is not set')
  } else if (mockPatterns.some(pattern => pattern.test(githubWebhookSecret))) {
    issues.push('GITHUB_WEBHOOK_SECRET appears to be a mock/placeholder value')
  }

  // Validate Stripe webhook secret
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!stripeWebhookSecret) {
    issues.push('STRIPE_WEBHOOK_SECRET is not set')
  } else if (mockPatterns.some(pattern => pattern.test(stripeWebhookSecret))) {
    warnings.push('STRIPE_WEBHOOK_SECRET may be a mock/placeholder value')
  }

  // Check for required API keys
  const requiredKeys = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ]

  for (const key of requiredKeys) {
    if (!process.env[key]) {
      issues.push(`${key} is not set`)
    }
  }

  // Check for production site URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!siteUrl) {
    issues.push('NEXT_PUBLIC_SITE_URL is not set')
  } else if (siteUrl.includes('localhost') || siteUrl.includes('127.0.0.1')) {
    warnings.push('NEXT_PUBLIC_SITE_URL is set to localhost - should be production URL in production')
  }

  return {
    isValid: issues.length === 0,
    issues,
    warnings
  }
}

/**
 * Validate environment on startup and log issues
 */
export function validateEnvironmentOnStartup(): void {
  const result = validateEnvironment()

  if (!result.isValid) {
    console.error('🚨 Environment validation failed:')
    result.issues.forEach(issue => console.error(`  - ${issue}`))
  }

  if (result.warnings.length > 0) {
    console.warn('⚠️  Environment validation warnings:')
    result.warnings.forEach(warning => console.warn(`  - ${warning}`))
  }

  if (result.isValid && result.warnings.length === 0) {
    console.log('✅ Environment validation passed')
  }
}