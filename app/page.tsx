import Link from "next/link";
import { ArrowRight, MessageCircle, DollarSign, MapPin, Clock, HelpCircle } from "lucide-react";

export default function Home() {
  const popularQuestions = [
    "What are your pricing plans?",
    "Do you operate in my state?",
    "What's included in the subscription?",
    "How do I get started?",
    "Do you accept insurance?",
    "What's the difference between TRT, HRT, and GLP-1?",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Fountain Vitality
          </h1>
          <p className="text-2xl text-gray-600 mb-2">
            Ask Us Anything
          </p>
          <p className="text-gray-500">
            Get instant answers about our TRT, HRT, and GLP-1 programs
          </p>
        </div>

        {/* Main CTA */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              What would you like to know?
            </h2>
          </div>
          
          <Link
            href="/chat"
            className="block w-full"
          >
            <div className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group">
              <span className="text-gray-500 group-hover:text-gray-700">
                e.g., "How much does TRT cost?"
              </span>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>

        {/* Popular Questions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Popular Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {popularQuestions.map((question, idx) => (
              <Link
                key={idx}
                href={`/chat?q=${encodeURIComponent(question)}`}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 group-hover:text-blue-600">
                    {question}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <DollarSign className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Transparent Pricing</h4>
            <p className="text-sm text-gray-600">
              All-inclusive plans with no hidden fees
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <MapPin className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Nationwide Coverage</h4>
            <p className="text-sm text-gray-600">
              Available in most states with lab partners
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <Clock className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Quick Start</h4>
            <p className="text-sm text-gray-600">
              Get started in just a few days
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Ready to begin your journey?
          </p>
          <a
            href="https://fountain.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Your Assessment →
          </a>
        </div>
      </div>
    </div>
  );
}

