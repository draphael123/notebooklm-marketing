"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import QuestionInput from "@/components/QuestionInput";
import ResponseDisplay from "@/components/ResponseDisplay";
import SuggestedQuestions from "@/components/SuggestedQuestions";
import RelatedQuestions from "@/components/RelatedQuestions";
import FeedbackButtons from "@/components/FeedbackButtons";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  relatedQuestions?: string[];
}

// Create a separate component for the content that uses useSearchParams
function ChatContent() {
  const searchParams = useSearchParams();
  const initialQuestion = searchParams.get("q") || "";
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuestion) {
      handleQuestion(initialQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuestion = async (question: string) => {
    if (!question.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = { role: "user", content: question };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: "assistant",
        content: data.answer,
        sources: data.sources,
        relatedQuestions: data.relatedQuestions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Fountain Q&A
            </h1>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 min-h-[400px] max-h-[600px] overflow-y-auto">
          {messages.length === 0 && !isLoading && (
            <div className="text-center text-gray-500 py-12">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Ask me anything about Fountain&apos;s programs!</p>
            </div>
          )}

          <div className="space-y-6">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <>
                      <ResponseDisplay
                        content={message.content}
                        sources={message.sources}
                      />
                      {message.relatedQuestions && message.relatedQuestions.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-300">
                          <RelatedQuestions
                            questions={message.relatedQuestions}
                            onQuestionClick={handleQuestion}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {error}
              </div>
            )}
          </div>

          <div ref={messagesEndRef} />
        </div>

        {/* Question Input */}
        <QuestionInput
          onQuestionSubmit={handleQuestion}
          disabled={isLoading}
        />

        {/* Suggested Questions (if no messages) */}
        {messages.length === 0 && !isLoading && (
          <SuggestedQuestions onQuestionClick={handleQuestion} />
        )}
      </div>
    </div>
  );
}

// Main page component with Suspense
export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300 animate-pulse" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}

