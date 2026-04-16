import React from 'react';
import { RiskBadge } from './RiskBadge';

interface DiagnosisCardProps {
  primaryDiagnosis: string;
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high' | 'urgent';
  humanReviewRequired: boolean;
}

export const DiagnosisCard: React.FC<DiagnosisCardProps> = ({
  primaryDiagnosis,
  confidence,
  riskLevel,
  humanReviewRequired
}) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-6 backdrop-blur-sm relative overflow-hidden">
      
      {humanReviewRequired && (
        <div className="bg-amber-100 dark:bg-amber-900/40 border-l-4 border-amber-500 p-4 rounded-r-lg text-amber-900 dark:text-amber-300 text-sm font-semibold flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
          MANDATORY PHYSICIAN REVIEW - ML pipeline intercepted severe flags.
        </div>
      )}

      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h2 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">Primary Conclusion</h2>
          <p className="text-4xl font-black text-zinc-900 dark:text-white mt-2 tracking-tight leading-none">{primaryDiagnosis}</p>
        </div>
        <div className="pt-2">
            <RiskBadge level={riskLevel} />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Ensemble Confidence Weight</span>
          <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{(confidence * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-3 overflow-hidden shadow-inner">
          <div 
            className="bg-indigo-500 dark:bg-indigo-400 h-3 hover:bg-indigo-400 transition-all duration-1000 ease-out" 
            style={{ width: `${(confidence * 100).toFixed(1)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
