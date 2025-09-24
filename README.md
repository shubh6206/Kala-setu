# KalaSetu: Bridging Artisans to the World

An AI-powered digital ecosystem to preserve, promote, and monetize India's vast artisanal heritage.

## 🌟 Features

- **Shilp-Scan AI**: Identify Indian handicrafts using AI-powered image recognition
- **Artisan Showcase**: Dedicated profiles for artisans to display their crafts and stories
- **Interactive Craft Map**: Explore the geographical origins of different crafts on an interactive map of India
- **Responsive Design**: Optimized for all devices with modern UI components

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google AI API key for Genkit

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kalasetu
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Fill in your Google AI API key and other required variables.

4. Start the development server:
```bash
npm run dev
```

5. Start the Genkit development server (in another terminal):
```bash
npm run genkit:dev
```

The application will be available at `http://localhost:9002`.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **AI**: Google Genkit with Gemini
- **State Management**: React hooks
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── ai/                 # AI flows and configurations
├── app/               # Next.js app router pages
├── components/        # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and data
└── types/            # TypeScript type definitions
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🔧 Development

```bash
# Type checking
npm run typecheck

# Linting
npm run lint
npm run lint:fix

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deployment

The application is configured for deployment on Firebase Hosting with App Hosting.

1. Build the application:
```bash
npm run build
```

2. Deploy using Firebase CLI or through the Firebase console.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Traditional Indian artisans who inspire this platform
- The open-source community for the amazing tools and libraries
- Google for providing the AI capabilities through Genkit
