"use client";

import { ArrowRight } from "lucide-react";

interface CtaButtonProps {
  text: string;
  url: string;
  variant?: "primary" | "secondary";
}

export default function CtaButton({
  text,
  url,
  variant = "primary",
}: CtaButtonProps) {
  const baseClasses =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${baseClasses}`}
    >
      {text}
      <ArrowRight className="w-4 h-4" />
    </a>
  );
}


