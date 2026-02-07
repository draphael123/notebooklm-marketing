"use client";

import { useState, FormEvent, KeyboardEvent } from "react";
import { Send, Sparkles } from "lucide-react";

interface QuestionInputProps {
  onQuestionSubmit: (question: string) => void;
  disabled?: boolean;
}

export default function QuestionInput({
  onQuestionSubmit,
  disabled = false,
}: QuestionInputProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (question.trim() && !disabled) {
      onQuestionSubmit(question);
      setQuestion("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (question.trim() && !disabled) {
        onQuestionSubmit(question);
        setQuestion("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="flex items-start gap-3 bg-white border-2 border-blue-300 rounded-xl p-4 focus-within:border-blue-500 focus-within:shadow-lg transition-all">
          <Sparkles className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about your document..."
            disabled={disabled}
            rows={1}
            className="flex-1 resize-none border-none outline-none text-blue-900 placeholder-blue-400 text-base disabled:bg-transparent disabled:cursor-not-allowed min-h-[28px] max-h-[200px] overflow-y-auto leading-relaxed"
            style={{
              height: "auto",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
            }}
          />
          <button
            type="submit"
            disabled={disabled || !question.trim()}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center flex-shrink-0 shadow-md"
            title="Send (Enter)"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-blue-600 mt-2 ml-1">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </form>
  );
}
