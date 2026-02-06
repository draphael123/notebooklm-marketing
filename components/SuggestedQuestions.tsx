"use client";

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const suggestedQuestions = [
  "How much does TRT cost?",
  "Do you operate in California?",
  "What's included in the subscription?",
  "How do I get started?",
  "Do you accept insurance?",
  "What's the difference between TRT and HRT?",
];

export default function SuggestedQuestions({
  onQuestionClick,
}: SuggestedQuestionsProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Popular Questions
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {suggestedQuestions.map((question, idx) => (
          <button
            key={idx}
            onClick={() => onQuestionClick(question)}
            className="text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}

