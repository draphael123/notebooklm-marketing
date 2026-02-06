import Link from "next/link";
import { FileText, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FileText className="w-12 h-12 text-slate-700" />
            <Sparkles className="w-10 h-10 text-slate-600" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Document Q&A
          </h1>
          <p className="text-xl text-slate-600 mb-2">
            Ask questions about your documents
          </p>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Upload your documents and get instant, accurate answers powered by AI. 
            Perfect for research, analysis, and understanding complex documents.
          </p>
        </div>

        {/* Main CTA */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-slate-700" />
            <h2 className="text-2xl font-semibold text-slate-900">
              Start asking questions
            </h2>
          </div>
          
          <Link
            href="/chat"
            className="block w-full"
          >
            <div className="flex items-center justify-between p-5 border-2 border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer group">
              <span className="text-slate-600 group-hover:text-slate-900 text-lg">
                Ask a question about your document...
              </span>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <FileText className="w-8 h-8 text-slate-700 mb-3" />
            <h4 className="font-semibold text-slate-900 mb-2">Document Analysis</h4>
            <p className="text-sm text-slate-600">
              Ask questions about any document. Get precise answers based on the content.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <Sparkles className="w-8 h-8 text-slate-700 mb-3" />
            <h4 className="font-semibold text-slate-900 mb-2">AI-Powered</h4>
            <p className="text-sm text-slate-600">
              Advanced AI understands context and provides accurate, relevant answers.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <ArrowRight className="w-8 h-8 text-slate-700 mb-3" />
            <h4 className="font-semibold text-slate-900 mb-2">Instant Answers</h4>
            <p className="text-sm text-slate-600">
              Get answers in seconds. No need to search through pages of text.
            </p>
          </div>
        </div>

        {/* Example Questions */}
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Example questions you can ask:
          </h3>
          <div className="space-y-2 text-slate-600">
            <p>• &quot;What are the main points in this document?&quot;</p>
            <p>• &quot;Summarize the key findings&quot;</p>
            <p>• &quot;What does this document say about [topic]?&quot;</p>
            <p>• &quot;Explain the process described in the document&quot;</p>
          </div>
        </div>
      </div>
    </div>
  );
}
