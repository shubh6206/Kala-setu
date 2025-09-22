import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 50 C 35 20, 65 20, 85 50" />
      <path d="M15 50 C 35 80, 65 80, 85 50" />
      <path d="M50 15 C 20 35, 20 65, 50 85" />
      <path d="M50 15 C 80 35, 80 65, 50 85" />
    </svg>
  );
}
