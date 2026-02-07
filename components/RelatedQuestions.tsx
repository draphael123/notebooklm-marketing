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
      <p className="text-base font-bold text-blue-900 mb-3">
        💡 Related Questions:
      </p>
      <div className="space-y-2">
        {questions.map((question, idx) => (
          <button
            key={idx}
            onClick={() => onQuestionClick?.(question)}
            className="w-full text-left p-4 bg-blue-50 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-100 transition-all flex items-center justify-between group"
          >
            <span className="text-base text-blue-800 group-hover:text-blue-900 font-medium">
              {question}
            </span>
            <ArrowRight className="w-5 h-5 text-blue-500 group-hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}




