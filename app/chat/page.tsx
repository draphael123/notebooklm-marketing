"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import QuestionInput from "@/components/QuestionInput";
import ResponseDisplay from "@/components/ResponseDisplay";
import RelatedQuestions from "@/components/RelatedQuestions";
import { FileText, Sparkles } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-700" />
              <Sparkles className="w-4 h-4 text-slate-500" />
            </div>
            <h1 className="text-xl font-semibold text-slate-900">
              Document Q&A
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 mb-6 overflow-y-auto">
          {messages.length === 0 && !isLoading && (
            <div className="text-center text-slate-500 py-16">
              <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <p className="text-lg mb-2">Ask a question about your document</p>
              <p className="text-sm">Get instant, accurate answers powered by AI</p>
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
                  className={`max-w-[85%] rounded-lg ${
                    message.role === "user"
                      ? "bg-slate-900 text-white px-4 py-3"
                      : "bg-white border border-slate-200 px-5 py-4 shadow-sm"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <>
                      <ResponseDisplay
                        content={message.content}
                        sources={message.sources}
                      />
                      {message.relatedQuestions && message.relatedQuestions.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <RelatedQuestions
                            questions={message.relatedQuestions}
                            onQuestionClick={handleQuestion}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-white">{message.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-lg px-5 py-4 shadow-sm">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
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

        {/* Question Input - Fixed at bottom */}
        <div className="bg-white border-t border-slate-200 pt-6">
          <QuestionInput
            onQuestionSubmit={handleQuestion}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense
export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300 animate-pulse" />
          <p className="text-slate-500">Loading...</p>
        </div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}
