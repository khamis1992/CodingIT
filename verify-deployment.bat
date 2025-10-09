@echo off
echo 🚀 CodingIT Deployment Verification Script
echo ==========================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    exit /b 1
)

REM Check required files
echo 📋 Checking deployment configuration files...

set files=vercel.json .npmrc .gitignore .env.local.example
for %%f in (%files%) do (
    if exist "%%f" (
        echo ✅ %%f - Found
    ) else (
        echo ❌ %%f - Missing
    )
)

echo.
echo 🔍 Checking TypeScript configuration...

findstr /c:"as Record<string, any>" app\actions\validate-email.ts >nul
if %errorlevel%==0 (
    echo ✅ validate-email.ts - Type assertion fixed
) else (
    echo ❌ validate-email.ts - Type assertion missing
)

findstr /c:"as { path: string; isDirectory" app\api\files\route.ts >nul
if %errorlevel%==0 (
    echo ✅ files/route.ts - Type assertion fixed
) else (
    echo ❌ files/route.ts - Type assertion missing
)

findstr /c:"as { path: string; content: string }" app\api\files\content\route.ts >nul
if %errorlevel%==0 (
    echo ✅ files/content/route.ts - Type assertion fixed
) else (
    echo ❌ files/content/route.ts - Type assertion missing
)

echo.
echo 🔨 Testing TypeScript compilation...
call npm run build

if %errorlevel%==0 (
    echo.
    echo 🎉 SUCCESS: All deployment checks passed!
    echo ✅ Ready for Vercel deployment
) else (
    echo.
    echo ❌ FAILED: Build errors detected
    echo Please fix the issues above before deploying
    exit /b 1
)