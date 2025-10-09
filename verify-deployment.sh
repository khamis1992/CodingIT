#!/bin/bash

echo "🚀 CodingIT Deployment Verification Script"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check required files
echo "📋 Checking deployment configuration files..."

files=("vercel.json" ".npmrc" ".gitignore" ".env.local.example")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file - Found"
    else
        echo "❌ $file - Missing"
    fi
done

# Check TypeScript files
echo ""
echo "🔍 Checking TypeScript configuration..."

if grep -q "as Record<string, any>" app/actions/validate-email.ts; then
    echo "✅ validate-email.ts - Type assertion fixed"
else
    echo "❌ validate-email.ts - Type assertion missing"
fi

if grep -q "as { path: string; isDirectory" app/api/files/route.ts; then
    echo "✅ files/route.ts - Type assertion fixed"
else
    echo "❌ files/route.ts - Type assertion missing"
fi

if grep -q "as { path: string; content: string }" app/api/files/content/route.ts; then
    echo "✅ files/content/route.ts - Type assertion fixed"
else
    echo "❌ files/content/route.ts - Type assertion missing"
fi

# Test build
echo ""
echo "🔨 Testing TypeScript compilation..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS: All deployment checks passed!"
    echo "✅ Ready for Vercel deployment"
else
    echo ""
    echo "❌ FAILED: Build errors detected"
    echo "Please fix the issues above before deploying"
    exit 1
fi