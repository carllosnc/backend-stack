import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${sizeClasses[size]} border-[5px] border-zinc-300 border-t-zinc-900 rounded-full animate-spin`}
      />
    </div>
  );
}