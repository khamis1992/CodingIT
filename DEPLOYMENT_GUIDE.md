# CodingIT Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Authentication
- Visit: https://vercel.com/oauth/device?user_code=VDZD-QSPX
- Login/signup to your Vercel account
- Return to terminal and press ENTER

### 2. Deploy Command
```bash
vercel --prod
```

### 3. Environment Variables Setup
After deployment, you need to configure these environment variables in your Vercel dashboard:

#### Required Variables:
```bash
E2B_API_KEY=your_e2b_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

#### AI Provider (choose at least one):
```bash
OPENAI_API_KEY=sk-your_openai_api_key
ANTHROPIC_API_KEY=sk-ant-your_anthropic_api_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
XAI_API_KEY=xai-your_xai_api_key
MISTRAL_API_KEY=your_mistral_api_key
GROQ_API_KEY=gsk_your_groq_api_key
FIREWORKS_API_KEY=fw_your_fireworks_api_key
TOGETHER_API_KEY=your_together_api_key
DEEPSEEK_API_KEY=your_deepseek_api_key
```

#### Optional Services:
```bash
STRIPE_SECRET_KEY=sk_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_your_stripe_publishable_key
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token
NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_s3_bucket_name
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## 🔧 Configuration Details

### Project Settings
- **Framework**: Next.js (auto-detected)
- **Build Command**: `pnpm build`
- **Install Command**: `pnpm install --filter @codinit/web`
- **Output Directory**: `.next`
- **Node.js Version**: 18.x or 20.x

### Files Deployed
✅ **Included**: `/app`, `/components`, `/lib`, `/public`, root package.json
❌ **Excluded**: `/apps` (desktop app), environment files, development files

### Important Notes
1. **E2B API Key**: Required for code execution - get from https://e2b.dev/dashboard
2. **Supabase**: Required for authentication and database - create project at https://supabase.com
3. **AI Provider**: At least one AI provider key is required for the platform to function
4. **Environment Variables**: Set in Vercel Dashboard > Settings > Environment Variables

## 🔍 Post-Deployment Checklist

1. ✅ Deployment successful
2. ✅ Environment variables configured
3. ✅ Domain accessible
4. ✅ Authentication working
5. ✅ AI chat functionality working
6. ✅ Code execution working (E2B)
7. ✅ Database operations working

## 🐛 Troubleshooting

### Common Issues:
1. **Build Errors**: Check TypeScript errors in build logs
2. **Authentication Issues**: Verify Supabase URL and keys
3. **AI Not Working**: Check AI provider API keys
4. **Code Execution Fails**: Verify E2B API key

### Support Resources:
- Vercel Docs: https://vercel.com/docs
- CodingIT Docs: https://docs.codinit.dev
- GitHub Issues: https://github.com/Gerome-Elassaad/CodingIT/issues

## 🚀 Next Steps

After successful deployment:
1. Update your domain in environment variables (NEXT_PUBLIC_APP_URL)
2. Configure custom domain (optional)
3. Set up monitoring and analytics
4. Configure Stripe webhooks (if using payments)
5. Test all functionality thoroughly

Your CodingIT platform should now be live and fully functional! 🎉