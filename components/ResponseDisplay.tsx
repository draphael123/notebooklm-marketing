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
      <div className="prose prose-base max-w-none text-blue-900 leading-relaxed">
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-4 text-base leading-relaxed">{children}</p>,
            h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 mt-6 text-blue-900">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-5 text-blue-900">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 mt-4 text-blue-900">{children}</h3>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
            li: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
            strong: ({ children }) => <strong className="font-semibold text-blue-900">{children}</strong>,
            code: ({ children }) => <code className="bg-blue-50 text-blue-800 px-2 py-1 rounded text-sm">{children}</code>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {sources && sources.length > 0 && (
        <div className="mt-5 pt-5 border-t border-blue-200">
          <p className="text-sm text-blue-600 font-medium">
            Sources: {sources.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

