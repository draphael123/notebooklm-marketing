"use client";

import ReactMarkdown from "react-markdown";

interface ResponseDisplayProps {
  content: string;
  sources?: string[];
}

export default function ResponseDisplay({
  content,
  sources,
}: ResponseDisplayProps) {
  return (
    <div>
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      {sources && sources.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Sources: {sources.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

