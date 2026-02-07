import Link from "next/link";
import { FileText, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FileText className="w-14 h-14 text-blue-600" />
            <Sparkles className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-5xl font-bold text-blue-900 mb-5">
            Document Q&A
          </h1>
          <p className="text-2xl font-medium text-blue-700 mb-3">
            Ask questions about your documents
          </p>
          <p className="text-lg text-blue-600 max-w-2xl mx-auto leading-relaxed">
            Upload your documents and get instant, accurate answers powered by AI. 
            Perfect for research, analysis, and understanding complex documents.
          </p>
        </div>

        {/* Main CTA */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-bold text-blue-900">
              Start asking questions
            </h2>
          </div>
          
          <Link
            href="/chat"
            className="block w-full"
          >
            <div className="flex items-center justify-between p-6 border-2 border-blue-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group">
              <span className="text-blue-700 group-hover:text-blue-900 text-lg font-medium">
                Ask a question about your document...
              </span>
              <ArrowRight className="w-6 h-6 text-blue-500 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border-2 border-blue-100 shadow-sm">
            <FileText className="w-10 h-10 text-blue-600 mb-4" />
            <h4 className="font-bold text-lg text-blue-900 mb-3">Document Analysis</h4>
            <p className="text-base text-blue-700 leading-relaxed">
              Ask questions about any document. Get precise answers based on the content.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border-2 border-blue-100 shadow-sm">
            <Sparkles className="w-10 h-10 text-blue-600 mb-4" />
            <h4 className="font-bold text-lg text-blue-900 mb-3">AI-Powered</h4>
            <p className="text-base text-blue-700 leading-relaxed">
              Advanced AI understands context and provides accurate, relevant answers.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border-2 border-blue-100 shadow-sm">
            <ArrowRight className="w-10 h-10 text-blue-600 mb-4" />
            <h4 className="font-bold text-lg text-blue-900 mb-3">Instant Answers</h4>
            <p className="text-base text-blue-700 leading-relaxed">
              Get answers in seconds. No need to search through pages of text.
            </p>
          </div>
        </div>

        {/* Example Questions */}
        <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-5">
            Example questions you can ask:
          </h3>
          <div className="space-y-3 text-blue-700 text-base">
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
