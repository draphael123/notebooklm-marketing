"use client";

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const suggestedQuestions = [
  "What are the main points in this document?",
  "Summarize the key findings",
  "What topics does this document cover?",
  "Explain the main concepts",
  "What are the important details?",
  "What conclusions are drawn?",
];

export default function SuggestedQuestions({
  onQuestionClick,
}: SuggestedQuestionsProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-slate-600 mb-3">
        Suggested questions:
      </h3>
      <div className="flex flex-wrap gap-2">
        {suggestedQuestions.map((question, idx) => (
          <button
            key={idx}
            onClick={() => onQuestionClick(question)}
            className="text-sm px-4 py-2 bg-white border border-slate-200 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all text-slate-700"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
