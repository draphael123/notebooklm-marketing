"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface FeedbackButtonsProps {
  messageId?: string;
  onFeedback?: (feedback: "positive" | "negative") => void;
}

export default function FeedbackButtons({
  messageId,
  onFeedback,
}: FeedbackButtonsProps) {
  const [feedback, setFeedback] = useState<"positive" | "negative" | null>(
    null
  );

  const handleFeedback = (type: "positive" | "negative") => {
    setFeedback(type);
    onFeedback?.(type);
    
    // Send to analytics
    if (messageId) {
      fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId, feedback: type }),
      }).catch(console.error);
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => handleFeedback("positive")}
        disabled={feedback !== null}
        className={`p-2 rounded-lg transition-colors ${
          feedback === "positive"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-600 hover:bg-green-50"
        } disabled:cursor-not-allowed`}
        title="Helpful"
      >
        <ThumbsUp className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleFeedback("negative")}
        disabled={feedback !== null}
        className={`p-2 rounded-lg transition-colors ${
          feedback === "negative"
            ? "bg-red-100 text-red-700"
            : "bg-gray-100 text-gray-600 hover:bg-red-50"
        } disabled:cursor-not-allowed`}
        title="Not helpful"
      >
        <ThumbsDown className="w-4 h-4" />
      </button>
    </div>
  );
}


