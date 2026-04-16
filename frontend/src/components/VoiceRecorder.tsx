"use client";
import React, { useState } from 'react';

interface VoiceRecorderProps {
  onRecordingComplete: (file: File) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onRecordingComplete, language, setLanguage }) => {
  const [isRecording, setIsRecording] = useState(false);
  
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Dummy mock compilation representing audio blob parsing
      const dummyBlob = new Blob(["dummy audio context array"], { type: "audio/webm" });
      onRecordingComplete(new File([dummyBlob], "symptoms_record.webm", { type: "audio/webm" }));
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className={`p-6 rounded-2xl w-full flex flex-col items-center gap-6 transition-all border duration-300 ${
        isRecording 
          ? "bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-800" 
          : "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800"
      }`}>
      
      <div className="w-full flex justify-between items-center px-2">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Semantic Audio Input</span>
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-white dark:bg-zinc-800 border-none shadow-sm text-sm font-medium rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="english">English</option>
          <option value="telugu">Telugu (తెలుగు)</option>
          <option value="hindi">Hindi (हिंदी)</option>
          <option value="tamil">Tamil (தமிழ்)</option>
        </select>
      </div>

      <button 
        onClick={toggleRecording}
        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ring-4 ${
          isRecording 
            ? "bg-red-500 hover:bg-red-600 ring-red-500/30 animate-pulse scale-105" 
            : "bg-indigo-600 hover:bg-indigo-700 ring-indigo-600/30"
        }`}
      >
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          {isRecording ? (
             <rect x="7" y="7" width="10" height="10" rx="2" />
          ) : (
             <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
          )}
        </svg>
      </button>

      {isRecording && (
        <div className="flex bg-white dark:bg-zinc-800 px-4 py-2 rounded-full shadow-lg border border-red-100 dark:border-red-900 items-center justify-center gap-3">
          <div className="flex gap-1.5 h-6 items-center">
            {[...Array(6)].map((_, i) => (
               <span key={i} className="w-1.5 bg-red-400 rounded-full pointer-events-none" style={{
                   animation: `waveform 0.8s ease-in-out infinite alternate`,
                   animationDelay: `${i * 0.15}s`,
                   height: Math.random() * 80 + 20 + '%'
               }}></span>
            ))}
          </div>
          <span className="text-xs font-bold text-red-600 dark:text-red-400 tracking-wide uppercase">Streaming Whisper Audio</span>
        </div>
      )}
    </div>
  );
};
