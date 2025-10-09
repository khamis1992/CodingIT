#!/usr/bin/env node

/**
 * 🔍 Environment Variables Validation Script
 * 
 * This script validates your .env.local configuration and checks API connectivity.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  title: (msg) => console.log(`${colors.bright}${colors.cyan}🔍 ${msg}${colors.reset}`),
};

// Required environment variables
const requiredVars = {
  // Database
  'NEXT_PUBLIC_SUPABASE_URL': {
    name: 'Supabase URL',
    critical: true,
    pattern: /^https:\/\/[a-zA-Z0-9]+\.supabase\.co$/
  },
  'NEXT_PUBLIC_SUPABASE_ANON_KEY': {
    name: 'Supabase Anon Key',
    critical: true,
    pattern: /^eyJ[a-zA-Z0-9_.-]+$/
  },
  'SUPABASE_SERVICE_ROLE_KEY': {
    name: 'Supabase Service Role Key',
    critical: true,
    pattern: /^eyJ[a-zA-Z0-9_.-]+$/
  },
  
  // Code Execution
  'E2B_API_KEY': {
    name: 'E2B API Key',
    critical: true,
    pattern: /^e2b_[a-zA-Z0-9_-]+/
  },
  
  // AI Providers (at least one required)
  'DEEPSEEK_API_KEY': {
    name: 'DeepSeek API Key',
    critical: false,
    pattern: /^sk-[a-zA-Z0-9]{32,}/
  },
  'OPENROUTER_API_KEY': {
    name: 'OpenRouter API Key',
    critical: false,
    pattern: /^sk-or-[a-zA-Z0-9_-]+/
  },
  'LONGCAT_API_KEY': {
    name: 'LongCat API Key',
    critical: false,
    pattern: /^ak_[a-zA-Z0-9_-]+/
  },
  'ANTHROPIC_API_KEY': {
    name: 'Anthropic API Key',
    critical: false,
    pattern: /^sk-ant-[a-zA-Z0-9_-]+/
  },
  'OPENAI_API_KEY': {
    name: 'OpenAI API Key',
    critical: false,
    pattern: /^sk-[a-zA-Z0-9]{48,}/
  }
};

function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  const env = {};
  
  if (!fs.existsSync(envPath)) {
    log.error('.env.local file not found');
    return null;
  }
  
  const content = fs.readFileSync(envPath, 'utf8');
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    }
  }
  
  return env;
}

function validateEnv() {
  log.title('Environment Variables Validation');
  console.log();
  
  const env = loadEnvFile();
  if (!env) {
    log.error('Failed to load .env.local file');
    log.info('Run: node configure-apis.js to set up your environment');
    return false;
  }
  
  let allCriticalPresent = true;
  let hasAnyAI = false;
  const issues = [];
  
  // Check each required variable
  for (const [key, config] of Object.entries(requiredVars)) {
    const value = env[key];
    
    if (!value) {
      if (config.critical) {
        log.error(`Missing critical variable: ${config.name} (${key})`);
        allCriticalPresent = false;
      } else {
        log.warning(`Missing optional variable: ${config.name} (${key})`);
      }
      continue;
    }
    
    // Validate format
    if (config.pattern && !config.pattern.test(value)) {
      log.error(`Invalid format for ${config.name} (${key})`);
      issues.push(`${config.name} has invalid format`);
      if (config.critical) {
        allCriticalPresent = false;
      }
      continue;
    }
    
    // Check if it's an AI provider
    if (['DEEPSEEK_API_KEY', 'OPENROUTER_API_KEY', 'LONGCAT_API_KEY', 'ANTHROPIC_API_KEY', 'OPENAI_API_KEY'].includes(key)) {
      hasAnyAI = true;
    }
    
    log.success(`${config.name} configured correctly`);
  }
  
  console.log();
  
  // Summary
  if (!allCriticalPresent) {
    log.error('❌ Critical environment variables are missing or invalid');
    log.info('Run: node configure-apis.js to fix the configuration');
    return false;
  }
  
  if (!hasAnyAI) {
    log.warning('⚠️  No AI providers configured - you need at least one for AI functionality');
    log.info('Configure at least one: DEEPSEEK_API_KEY, OPENROUTER_API_KEY, LONGCAT_API_KEY, ANTHROPIC_API_KEY, or OPENAI_API_KEY');
  }
  
  if (issues.length === 0 && allCriticalPresent && hasAnyAI) {
    log.success('🎉 All environment variables are properly configured!');
    log.info('Your CodingIT platform is ready to run');
    return true;
  } else if (allCriticalPresent) {
    log.success('✅ Core environment variables are configured');
    if (!hasAnyAI) {
      log.warning('Add AI provider keys for full functionality');
    }
    return true;
  }
  
  return false;
}

// For Vercel deployment
function generateVercelEnvCommands() {
  log.title('Vercel Environment Variables Setup');
  console.log();
  log.info('Add these environment variables to your Vercel dashboard:');
  console.log();
  
  const env = loadEnvFile();
  if (!env) return;
  
  const vercelCommands = [];
  
  for (const [key, value] of Object.entries(env)) {
    if (requiredVars[key] && value) {
      vercelCommands.push(`vercel env add ${key} ${value}`);
      console.log(`${colors.cyan}${key}${colors.reset} = ${value.substring(0, 20)}...`);
    }
  }
  
  console.log();
  log.info('Or use Vercel CLI:');
  vercelCommands.forEach(cmd => console.log(`  ${cmd}`));
  console.log();
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--vercel')) {
    generateVercelEnvCommands();
  } else {
    const isValid = validateEnv();
    
    if (isValid) {
      console.log();
      log.info('Next steps:');
      console.log('1. Run: npm run build (to test the build)');
      console.log('2. Run: npm run dev (to start development)');
      console.log('3. Run: node validate-env.js --vercel (for Vercel deployment info)');
    } else {
      process.exit(1);
    }
  }
}

module.exports = { validateEnv };