"use client";

import { useState, FormEvent } from "react";
import { Send } from "lucide-react";

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

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about Fountain's programs..."
          disabled={disabled}
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={disabled || !question.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <Send className="w-5 h-5" />
          Ask
        </button>
      </div>
    </form>
  );
}

