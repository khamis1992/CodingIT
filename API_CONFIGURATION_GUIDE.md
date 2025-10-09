# 🔧 API Configuration Guide for CodingIT

## 🚨 Missing API Keys Configuration

You need to configure these API keys for full functionality:

### ✅ **Required APIs:**

#### 1. **SUPABASE_SERVICE_ROLE_KEY** 🔐
**Purpose:** Database operations and admin functions
**How to get:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy the `service_role` secret key (NOT the anon key)

```env
SUPABASE_SERVICE_ROLE_KEY=sbp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 2. **DEEPSEEK_API_KEY** 🧠
**Purpose:** DeepSeek AI model access
**How to get:**
1. Visit [DeepSeek Platform](https://platform.deepseek.com/)
2. Create account and verify
3. Go to API Keys section
4. Generate new API key

```env
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 3. **OPENROUTER_API_KEY** 🚀
**Purpose:** Access to multiple AI models via single API
**How to get:**
1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign up and verify email
3. Go to Dashboard → Keys
4. Create new API key

```env
OPENROUTER_API_KEY=sk-or-vx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 4. **LONGCAT_API_KEY** 🐱
**Purpose:** Long context AI models
**How to get:**
1. Visit [LongCat API](https://longcat.ai/) or their documentation
2. Register for API access
3. Generate API key from dashboard

```env
LONGCAT_API_KEY=lc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🔧 **Configuration Steps:**

### Step 1: Create `.env.local` file
```bash
# In your project root
cp .env.local.example .env.local
```

### Step 2: Add your API keys to `.env.local`
```env
# Required Database
SUPABASE_SERVICE_ROLE_KEY=your_actual_supabase_service_role_key_here

# AI Providers
DEEPSEEK_API_KEY=your_actual_deepseek_api_key_here
OPENROUTER_API_KEY=your_actual_openrouter_api_key_here  
LONGCAT_API_KEY=your_actual_longcat_api_key_here

# Keep your existing keys
ANTHROPIC_API_KEY=your_existing_anthropic_key
OPENAI_API_KEY=your_existing_openai_key
# ... other existing keys
```

### Step 3: Verify Configuration
Run the verification script:
```bash
# Test that all APIs are configured
npm run build
```

## 🚀 **For Vercel Deployment:**

Add these environment variables in your Vercel dashboard:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (codelanch)
3. Go to Settings → Environment Variables
4. Add each variable:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `SUPABASE_SERVICE_ROLE_KEY` | `sbp_xxx...` | Production, Preview, Development |
| `DEEPSEEK_API_KEY` | `sk-xxx...` | Production, Preview, Development |
| `OPENROUTER_API_KEY` | `sk-or-xxx...` | Production, Preview, Development |
| `LONGCAT_API_KEY` | `lc_xxx...` | Production, Preview, Development |

## ⚠️ **Security Notes:**

1. **Never commit `.env.local`** to git (it's in `.gitignore`)
2. **Keep API keys secure** - don't share them
3. **Use different keys** for development and production if possible
4. **Rotate keys regularly** for security

## 🧪 **Testing API Configuration:**

Create a test script to verify all APIs work:

```typescript
// test-apis.ts
const testAPIs = async () => {
  const requiredKeys = [
    'SUPABASE_SERVICE_ROLE_KEY',
    'DEEPSEEK_API_KEY', 
    'OPENROUTER_API_KEY',
    'LONGCAT_API_KEY'
  ];
  
  const missing = requiredKeys.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing API keys:', missing);
    return false;
  }
  
  console.log('✅ All required API keys configured');
  return true;
};
```

## 📞 **Need Help?**

If you encounter issues:
1. Check the API provider's documentation
2. Verify your account has API access enabled
3. Ensure billing is set up (some APIs require payment)
4. Test keys with a simple API call first

## 🎯 **Priority Setup Order:**

1. **SUPABASE_SERVICE_ROLE_KEY** - Critical for database
2. **DEEPSEEK_API_KEY** - For AI functionality  
3. **OPENROUTER_API_KEY** - For multiple AI models
4. **LONGCAT_API_KEY** - For long context tasks

Once configured, your CodingIT platform will have full AI capabilities! 🚀