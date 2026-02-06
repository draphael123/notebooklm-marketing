# Fountain Leads Q&A Tool

An intelligent Q&A system that queries the Fountain Workflows document to answer lead questions in a conversion-optimized, sales-friendly manner.

## Features

- 🤖 AI-powered question answering (Claude or OpenAI)
- 🔍 Multiple search modes: Simple, RAG, or Hybrid
- 💬 Conversational chat interface with streaming support
- 📊 Intent classification for optimized responses
- 🎯 Conversion-focused CTAs
- 📱 Mobile-responsive design
- ⚡ Response caching for performance
- 🛡️ Rate limiting and error handling
- 📈 Analytics and query logging
- 📄 Document processing (TXT, DOCX, PDF, MD)
- 🔄 Vector embeddings (Pinecone or Supabase)

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API or OpenAI GPT
- **Embeddings**: OpenAI (text-embedding-3-small)
- **Vector DB**: Pinecone or Supabase Vector (pgvector)
- **Caching**: Node-cache
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Anthropic API key (or OpenAI API key)
- Pinecone API key (or Supabase account)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fountain-leads-qa
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys. See `.env.example` for all options.

**Minimum setup (Simple Mode):**
```env
ANTHROPIC_API_KEY=your_key_here
SEARCH_MODE=simple
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Full setup (RAG Mode):**
```env
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here  # For embeddings
SEARCH_MODE=rag
VECTOR_DB=pinecone
PINECONE_API_KEY=your_key_here
PINECONE_INDEX=fountain-qa
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
fountain-leads-qa/
├── app/                    # Next.js app directory
│   ├── page.tsx            # Landing page
│   ├── chat/               # Chat interface
│   └── api/                # API routes
├── components/             # React components
├── lib/                    # Core logic
│   ├── ai/                 # AI client & prompts
│   ├── processing/         # Query processing
│   └── vector/             # Vector search
├── scripts/                # Utility scripts
└── data/                   # Data files
```

## Document Processing

### Quick Start (Simple Mode)

1. Place your document in `data/source-document.txt` (or .docx, .pdf, .md)
2. Set `SEARCH_MODE=simple` in `.env.local`
3. That's it! The system will load the full document.

### Full RAG Setup

1. Place your source document in `data/source-document.txt` (or .docx, .pdf, .md)
2. Process the document into chunks:
```bash
npm run process-doc
```

3. Generate embeddings and upload to vector database:
```bash
npm run generate-embeddings
```

4. Set `SEARCH_MODE=rag` in `.env.local`

**Supported formats:** `.txt`, `.docx`, `.pdf`, `.md`

## Testing

Run test queries to validate the system:
```bash
npm run test-queries
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

- `ANTHROPIC_API_KEY`
- `PINECONE_API_KEY`
- `PINECONE_INDEX`
- `NEXT_PUBLIC_SITE_URL`

## Usage

### For Leads

Visit the landing page and ask questions about:
- Pricing plans
- Service availability
- Getting started process
- Program details
- Comparisons

### API Endpoints

- `POST /api/ask` - Submit a question (returns full response)
- `POST /api/stream` - Submit a question (streaming SSE response)
- `GET /api/suggest` - Get suggested questions
- `POST /api/feedback` - Submit feedback

## Development Roadmap

- [x] Project setup and structure
- [x] Basic UI components
- [x] AI integration (Claude & OpenAI)
- [x] Document processing pipeline
- [x] Vector database integration (Pinecone & Supabase)
- [x] Embedding generation
- [x] Analytics and logging
- [x] Response caching
- [x] Rate limiting
- [x] Streaming responses
- [x] Multiple search modes (Simple, RAG, Hybrid)
- [ ] Fine-tuned response quality
- [ ] Advanced analytics dashboard
- [ ] Multi-document support

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT

## Support

For questions or issues, please open a GitHub issue.

