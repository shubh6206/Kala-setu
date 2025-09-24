/**
 * AI Configuration and Environment Checks
 */

export const AI_CONFIG = {
  isProduction: process.env.NODE_ENV === 'production',
  hasGoogleAIKey: !!process.env.GOOGLE_GENAI_API_KEY,
  isDemoMode: !process.env.GOOGLE_GENAI_API_KEY || process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
};

export function getAIStatus() {
  if (AI_CONFIG.isDemoMode) {
    return {
      status: 'demo',
      message: 'Running in demo mode with mock AI responses',
      canUseAI: false,
    };
  }
  
  if (!AI_CONFIG.hasGoogleAIKey) {
    return {
      status: 'missing-key',
      message: 'Google AI API key not configured',
      canUseAI: false,
    };
  }
  
  return {
    status: 'ready',
    message: 'AI services are configured and ready',
    canUseAI: true,
  };
}

export function logAIStatus() {
  const status = getAIStatus();
  console.log(`🤖 AI Status: ${status.status} - ${status.message}`);
  return status;
}