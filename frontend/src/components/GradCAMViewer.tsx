"use client";
import React, { useState } from 'react';

interface GradCAMViewerProps {
  originalImage: string;
  heatmapUrl: string;
  regionLabel: string;
}

export const GradCAMViewer: React.FC<GradCAMViewerProps> = ({ originalImage, heatmapUrl, regionLabel }) => {
  const [opacity, setOpacity] = useState(0.65);

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 mb-6 tracking-tight">Vision Interpretability Maps</h3>
      
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black max-w-sm shadow-inner group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={originalImage} alt="Clinical Base" className="absolute inset-0 w-full h-full object-cover" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={heatmapUrl} 
            alt="Activation Heatmap" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-color-burn dark:mix-blend-screen transition-opacity duration-300" 
            style={{ opacity }}
          />
        </div>

        <div className="flex-1 w-full flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-bold text-zinc-600 dark:text-zinc-300">
              <label>Activation Filter Intensity</label>
              <span className="tabular-nums bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">{Math.round(opacity * 100)}%</span>
            </div>
            <input 
              type="range" 
              min="0" max="1" step="0.01" 
              value={opacity} 
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:bg-zinc-700"
            />
          </div>
          
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Focused Detection Region</h4>
            </div>
            <p className="text-sm font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">{regionLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
