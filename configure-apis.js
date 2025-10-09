#!/usr/bin/env node

/**
 * 🔧 CodingIT API Configuration Script
 * 
 * This script helps you configure all required API keys for your CodingIT platform.
 * Run this script to set up your environment variables interactively.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI color codes for better output
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
  title: (msg) => console.log(`${colors.bright}${colors.cyan}🚀 ${msg}${colors.reset}`),
  step: (msg) => console.log(`${colors.bright}${colors.magenta}📋 ${msg}${colors.reset}`)
};

// Configuration for all API keys
const apiConfigs = {
  required: {
    // Database & Core
    SUPABASE_SERVICE_ROLE_KEY: {
      name: 'Supabase Service Role Key',
      description: 'Database admin operations',
      url: 'https://supabase.com/dashboard → Settings → API',
      pattern: /^sbp_[a-zA-Z0-9]{64,}/,
      example: 'sbp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },
    E2B_API_KEY: {
      name: 'E2B API Key',
      description: 'Code execution environment',
      url: 'https://e2b.dev/dashboard',
      pattern: /^e2b_[a-zA-Z0-9_-]+/,
      example: 'e2b_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },
    NEXT_PUBLIC_SUPABASE_URL: {
      name: 'Supabase URL',
      description: 'Your Supabase project URL',
      url: 'https://supabase.com/dashboard → Settings → API',
      pattern: /^https:\/\/[a-zA-Z0-9]+\.supabase\.co$/,
      example: 'https://xxxxxxxxxxxxxxxxx.supabase.co'
    },
    NEXT_PUBLIC_SUPABASE_ANON_KEY: {
      name: 'Supabase Anon Key',
      description: 'Public Supabase key for client-side',
      url: 'https://supabase.com/dashboard → Settings → API',
      pattern: /^eyJ[a-zA-Z0-9_.-]+$/,
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }
  },
  ai_providers: {
    // AI Providers
    DEEPSEEK_API_KEY: {
      name: 'DeepSeek API Key',
      description: 'DeepSeek AI models',
      url: 'https://platform.deepseek.com/',
      pattern: /^sk-[a-zA-Z0-9]{32,}/,
      example: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },
    OPENROUTER_API_KEY: {
      name: 'OpenRouter API Key',
      description: 'Multiple AI models via single API',
      url: 'https://openrouter.ai/',
      pattern: /^sk-or-[a-zA-Z0-9_-]+/,
      example: 'sk-or-vx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },
    LONGCAT_API_KEY: {
      name: 'LongCat API Key',
      description: 'Long context AI models',
      url: 'https://longcat.ai/',
      pattern: /^lc_[a-zA-Z0-9_-]+/,
      example: 'lc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },
    ANTHROPIC_API_KEY: {
      name: 'Anthropic API Key',
      description: 'Claude AI models',
      url: 'https://console.anthropic.com/',
      pattern: /^sk-ant-[a-zA-Z0-9_-]+/,
      example: 'sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },
    OPENAI_API_KEY: {
      name: 'OpenAI API Key',
      description: 'GPT models',
      url: 'https://platform.openai.com/api-keys',
      pattern: /^sk-[a-zA-Z0-9]{48,}/,
      example: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }
  }
};

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function validateApiKey(key, config) {
  if (!key || key.trim() === '') {
    return { valid: false, message: 'API key cannot be empty' };
  }
  
  if (key === config.example) {
    return { valid: false, message: 'Please enter your actual API key, not the example' };
  }
  
  if (config.pattern && !config.pattern.test(key)) {
    return { valid: false, message: `Invalid format. Expected format: ${config.example}` };
  }
  
  return { valid: true };
}

async function loadExistingEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  const existingEnv = {};
  
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          existingEnv[key.trim()] = valueParts.join('=').trim();
        }
      }
    }
  }
  
  return existingEnv;
}

async function configureApiKeys() {
  log.title('CodingIT API Configuration Setup');
  console.log();
  
  const existingEnv = await loadExistingEnv();
  const newEnv = { ...existingEnv };
  
  // Configure required APIs
  log.step('STEP 1: Required APIs (Essential for core functionality)');
  console.log();
  
  for (const [key, config] of Object.entries(apiConfigs.required)) {
    console.log(`${colors.bright}${config.name}${colors.reset}`);
    console.log(`📝 ${config.description}`);
    console.log(`🌐 Get it from: ${colors.cyan}${config.url}${colors.reset}`);
    console.log(`📋 Format: ${config.example}`);
    
    if (existingEnv[key]) {
      console.log(`${colors.yellow}Current value: ${existingEnv[key].substring(0, 20)}...${colors.reset}`);
    }
    
    const value = await askQuestion(`Enter ${config.name} (or press Enter to ${existingEnv[key] ? 'keep current' : 'skip'}): `);
    
    if (value.trim()) {
      const validation = validateApiKey(value.trim(), config);
      if (validation.valid) {
        newEnv[key] = value.trim();
        log.success(`${config.name} configured`);
      } else {
        log.error(`${validation.message}`);
      }
    } else if (existingEnv[key]) {
      log.info(`Keeping existing ${config.name}`);
    } else {
      log.warning(`Skipped ${config.name} - you can add this later`);
    }
    
    console.log();
  }
  
  // Configure AI providers
  log.step('STEP 2: AI Providers (Choose at least one for AI functionality)');
  console.log();
  
  for (const [key, config] of Object.entries(apiConfigs.ai_providers)) {
    console.log(`${colors.bright}${config.name}${colors.reset}`);
    console.log(`📝 ${config.description}`);
    console.log(`🌐 Get it from: ${colors.cyan}${config.url}${colors.reset}`);
    console.log(`📋 Format: ${config.example}`);
    
    if (existingEnv[key]) {
      console.log(`${colors.yellow}Current value: ${existingEnv[key].substring(0, 20)}...${colors.reset}`);
    }
    
    const value = await askQuestion(`Enter ${config.name} (or press Enter to ${existingEnv[key] ? 'keep current' : 'skip'}): `);
    
    if (value.trim()) {
      const validation = validateApiKey(value.trim(), config);
      if (validation.valid) {
        newEnv[key] = value.trim();
        log.success(`${config.name} configured`);
      } else {
        log.error(`${validation.message}`);
      }
    } else if (existingEnv[key]) {
      log.info(`Keeping existing ${config.name}`);
    } else {
      log.info(`Skipped ${config.name} - optional for now`);
    }
    
    console.log();
  }
  
  // Write to .env.local
  const envContent = Object.entries(newEnv)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  
  const envPath = path.join(process.cwd(), '.env.local');
  fs.writeFileSync(envPath, envContent);
  
  log.success('Configuration saved to .env.local');
  console.log();
  
  // Summary
  log.step('Configuration Summary:');
  const configuredApis = Object.keys(newEnv).filter(key => 
    Object.keys(apiConfigs.required).includes(key) || 
    Object.keys(apiConfigs.ai_providers).includes(key)
  );
  
  console.log(`✅ Configured APIs: ${configuredApis.length}`);
  configuredApis.forEach(key => {
    const config = apiConfigs.required[key] || apiConfigs.ai_providers[key];
    console.log(`   • ${config.name}`);
  });
  
  console.log();
  log.title('Next Steps:');
  console.log('1. Run: npm run build (to test the configuration)');
  console.log('2. Run: npm run dev (to start development)');
  console.log('3. For Vercel deployment, add these environment variables to your Vercel dashboard');
  console.log();
  
  rl.close();
}

// Check if running directly
if (require.main === module) {
  configureApiKeys().catch(error => {
    log.error(`Configuration failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { configureApiKeys };