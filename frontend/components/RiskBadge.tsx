import React from 'react';

type RiskLevel = 'low' | 'medium' | 'high' | 'urgent';

interface RiskBadgeProps {
  level: RiskLevel;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level }) => {
  const getBadgeStyle = () => {
    switch (level.toLowerCase()) {
      case 'low': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400';
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 animate-pulse ring-2 ring-red-500 shadow-lg';
      default: return 'bg-zinc-100 text-zinc-800 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300';
    }
  };

  return (
    <span className={`px-4 py-1.5 text-xs font-black uppercase tracking-widest rounded-full border ${getBadgeStyle()}`}>
      Status: {level}
    </span>
  );
};
