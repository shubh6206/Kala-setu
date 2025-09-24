# AI Setup Guide for KalaSetu

## Overview
KalaSetu uses Google's Gemini AI through Firebase Genkit for the Shilp-Scan feature. This guide explains how to set up the AI functionality.

## Current Status
The application is currently running in **Demo Mode** with mock AI responses. To enable real AI functionality, follow the setup steps below.

## Setup Steps

### 1. Get Google AI API Key
1. Go to [Google AI Studio](AIzaSyB2hI5BzR9qf99DGSNNaIq9uSzhFmjA0VI)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables
Create a `.env.local` file in your project root:

```bash
# Google AI Configuration
GOOGLE_GENAI_API_KEY=your_api_key_here

# Optional: Disable demo mode
NEXT_PUBLIC_DEMO_MODE=false
```

### 3. Start Genkit Development Server
In a separate terminal, run:

```bash
npm run genkit:dev
```

This starts the Genkit development server that handles AI requests.

### 4. Test the Integration
1. Start your Next.js development server: `npm run dev`
2. Navigate to `/shilp-scan`
3. Upload an image of an Indian handicraft
4. The AI should now provide real analysis instead of mock responses

## Demo Mode
When the Google AI API key is not configured, the application automatically falls back to demo mode with realistic mock responses for:

- **Madhubani Painting**: Traditional Bihar art form
- **Terracotta Pottery**: Clay-based handicrafts
- **Warli Painting**: Tribal art from Maharashtra

## Troubleshooting

### Common Issues
1. **"Failed to identify handicraft"**: Check if Genkit server is running
2. **API Key errors**: Verify the API key is correct and has proper permissions
3. **Network errors**: Ensure internet connection for AI API calls

### Development vs Production
- **Development**: Uses mock responses when API key is missing
- **Production**: Requires valid API key for real AI functionality

## File Structure
```
src/
├── ai/
│   ├── flows/
│   │   ├── shilp-scan-identify-handicraft.ts
│   │   └── shilp-scan-confidence-level.ts
│   ├── genkit.ts
│   └── dev.ts
└── lib/
    └── ai-config.ts
```

## Next Steps
1. Set up Google AI API key
2. Configure environment variables
3. Start Genkit server
4. Test with real handicraft images
5. Deploy with proper AI configuration

For more information, see the [Genkit documentation](https://firebase.google.com/docs/genkit).