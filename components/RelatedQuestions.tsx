"use client";

import { ArrowRight } from "lucide-react";

interface RelatedQuestionsProps {
  questions: string[];
  onQuestionClick?: (question: string) => void;
}

export default function RelatedQuestions({
  questions,
  onQuestionClick,
}: RelatedQuestionsProps) {
  if (!questions || questions.length === 0) return null;

  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-2">
        💡 Related Questions:
      </p>
      <div className="space-y-2">
        {questions.map((question, idx) => (
          <button
            key={idx}
            onClick={() => onQuestionClick?.(question)}
            className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between group"
          >
            <span className="text-sm text-gray-700 group-hover:text-blue-600">
              {question}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}

