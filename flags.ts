import { growthbookAdapter } from '@flags-sdk/growthbook';
import { flag } from 'flags/next';
import { identify } from '@/lib/identify';

// CodingIT Platform Feature Flags
// Real feature flags that control actual functionality in the application

// Workflow Builder V2 - Visual workflow creation interface
export const workflowBuilderV2 = flag<boolean>({
  key: 'workflow-builder-v2',
  adapter: growthbookAdapter.feature<boolean>(),
  defaultValue: false,
  identify,
});

// Enhanced Code Editor - Advanced Monaco editor features
export const enhancedCodeEditor = flag<boolean>({
  key: 'enhanced-code-editor',
  adapter: growthbookAdapter.feature<boolean>(),
  defaultValue: false,
  identify,
});

// Premium Templates - Access to advanced sandbox templates
export const premiumTemplates = flag<boolean>({
  key: 'premium-templates',
  adapter: growthbookAdapter.feature<boolean>(),
  defaultValue: false,
  identify,
});

// Real-time Collaboration - Live collaborative editing
export const realtimeCollaboration = flag<boolean>({
  key: 'realtime-collaboration',
  adapter: growthbookAdapter.feature<boolean>(),
  defaultValue: false,
  identify,
});

// Advanced Analytics - Detailed usage metrics and insights
export const advancedAnalytics = flag<boolean>({
  key: 'advanced-analytics',
  adapter: growthbookAdapter.feature<boolean>(),
  defaultValue: false,
  identify,
});

// Beta AI Models - Access to experimental AI models
export const betaAiModels = flag<boolean>({
  key: 'beta-ai-models',
  adapter: growthbookAdapter.feature<boolean>(),
  defaultValue: false,
  identify,
});

// Enterprise Features - Team management, SSO, advanced security
export const enterpriseFeatures = flag<boolean>({
  key: 'enterprise-features',
  adapter: growthbookAdapter.feature<boolean>(),
  defaultValue: false,
  identify,
});

// Theme Customization - Advanced theming beyond light/dark
export const themeCustomization = flag<boolean>({
  key: 'theme-customization',
  adapter: growthbookAdapter.feature<boolean>(),
  defaultValue: false,
  identify,
});

// Deployment Integrations - External deployment providers
export const deploymentIntegrations = flag<boolean>({
  key: 'deployment-integrations',
  adapter: growthbookAdapter.feature<boolean>(),
  defaultValue: false,
  identify,
});

// Usage Limits Enforcement - Plan-based resource limitations
export const usageLimitsEnforcement = flag<boolean>({
  key: 'usage-limits-enforcement',
  adapter: growthbookAdapter.feature<boolean>(),
  defaultValue: true, // Always enforce limits by default
  identify,
});

// Multi-variant flag for workflow interface style
export const workflowInterfaceStyle = flag<'list' | 'canvas' | 'hybrid'>({
  key: 'workflow-interface-style',
  adapter: growthbookAdapter.feature<'list' | 'canvas' | 'hybrid'>(),
  defaultValue: 'list',
  identify,
});

// User subscription tier (determines feature access)
export const subscriptionTier = flag<'free' | 'pro' | 'enterprise'>({
  key: 'subscription-tier',
  adapter: growthbookAdapter.feature<'free' | 'pro' | 'enterprise'>(),
  defaultValue: 'free',
  identify,
});

// Utility function for API routes - connects to GrowthBook feature flag service
export async function getAllFeatureFlags() {
  try {
    // TODO: Implement proper GrowthBook integration
    // For now, return default values as defined in flag declarations above
    // In production, this should connect to GrowthBook and return live flag values
    return {
      'workflow-builder-v2': false,
      'enhanced-code-editor': false,
      'premium-templates': false,
      'realtime-collaboration': false,
      'advanced-analytics': false,
      'beta-ai-models': false,
      'enterprise-features': false,
      'theme-customization': false,
      'deployment-integrations': false,
      'usage-limits-enforcement': true, // Always enforce limits by default
      'workflow-interface-style': 'list' as const,
      'subscription-tier': 'free' as const,
      'editor-theme-mode': 'basic' as const,
    };
  } catch (error) {
    console.error('Error fetching feature flags:', error);

    // Return safe defaults if GrowthBook is unavailable
    return {
      'workflow-builder-v2': false,
      'enhanced-code-editor': false,
      'premium-templates': false,
      'realtime-collaboration': false,
      'advanced-analytics': false,
      'beta-ai-models': false,
      'enterprise-features': false,
      'theme-customization': false,
      'deployment-integrations': false,
      'usage-limits-enforcement': true, // Always enforce limits by default
      'workflow-interface-style': 'list' as const,
      'subscription-tier': 'free' as const,
      'editor-theme-mode': 'basic' as const,
    };
  }
}

// Editor Theme Mode - Enhanced theme options
export const editorThemeMode = flag<'basic' | 'advanced' | 'custom'>({
  key: 'editor-theme-mode',
  adapter: growthbookAdapter.feature<'basic' | 'advanced' | 'custom'>(),
  defaultValue: 'basic',
  identify,
});