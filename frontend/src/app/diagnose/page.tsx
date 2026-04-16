"use client";
import React, { useState } from 'react';
import { DiagnosisCard } from '@/components/DiagnosisCard';
import { GradCAMViewer } from '@/components/GradCAMViewer';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { diagnosePipeline } from '@/lib/api';

export default function DiagnosePage() {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [SymptomsText, setSymptomsText] = useState("");
  const [language, setLanguage] = useState("english");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || (!SymptomsText && !audioFile)) {
      setError("Please attach clinical imagery and contextual symptoms.");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('patient_id', '550e8400-e29b-41d4-a716-446655440000');
      formData.append('language', language);
      formData.append('symptoms', SymptomsText || "Audio vector uploaded.");
      if (audioFile) formData.append('audio', audioFile);

      const responseSet = await diagnosePipeline(formData);
      setResult(responseSet);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred during execution.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 lg:p-12 text-zinc-900 dark:text-zinc-100 font-sans">
      <div className="max-w-6xl mx-auto space-y-12 my-8">
        
        <header className="flex flex-col gap-2">
          <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-black uppercase tracking-widest rounded-full w-max mb-2">Agentic Framework</div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">Clinical Interface</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg mt-2">Deploy the asynchronous medical pipeline analyzing multi-modal arrays.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          <div className="xl:col-span-5 space-y-6 bg-white dark:bg-zinc-900/40 p-8 rounded-3xl shadow-xl border border-zinc-200/60 dark:border-zinc-800/60">
            <h2 className="text-xl font-bold tracking-tight mb-6">Patient Inputs</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="space-y-3">
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase">Dermoscopy File</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer border border-zinc-200 dark:border-zinc-800 p-2 rounded-2xl dark:bg-zinc-900"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase">Findings</label>
                <textarea 
                  value={SymptomsText}
                  onChange={(e) => setSymptomsText(e.target.value)}
                  placeholder="Record chronicity, pain..."
                  className="w-full h-32 p-4 border border-zinc-300 dark:border-zinc-700 rounded-2xl bg-zinc-50 dark:bg-black focus:ring-2 focus:ring-indigo-500 transition-shadow text-sm"
                />
              </div>

              <VoiceRecorder 
                onRecordingComplete={(file) => setAudioFile(file)} 
                language={language}
                setLanguage={setLanguage}
              />

              {error && (
                <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-bold">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-sm rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:scale-95"
              >
                {loading ? "Executing Deep Learning Nodes..." : "Run Diagnostic Protocol"}
              </button>
            </form>
          </div>

          <div className="xl:col-span-7 space-y-8">
            {loading && <div className="w-full h-[500px] bg-zinc-200 dark:bg-zinc-900/50 animate-pulse rounded-3xl" />}
            
            {result && !loading && (
              <div className="space-y-8 animate-in fade-in duration-700">
                <DiagnosisCard 
                  primaryDiagnosis={result.primary_diagnosis}
                  confidence={result.confidence}
                  riskLevel={result.risk_level}
                  humanReviewRequired={result.human_review_required}
                />
                
                <GradCAMViewer 
                  originalImage={imageFile ? URL.createObjectURL(imageFile) : ""}
                  heatmapUrl={result.gradcam_url}
                  regionLabel="Primary region displays concentrated visual mapping synonymous with ABCDE rule triggers."
                />

                <div className="bg-white dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-black text-xl">Chronological Run Trace</h3>
                    <a href={result.pdf_url} target="_blank" className="px-5 py-2.5 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 rounded-xl text-sm font-black uppercase flex gap-2">
                      Download PDF Bridge
                    </a>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    {result.agent_reasoning.map((agent: { agent_name: string; confidence: number; findings: string }, idx: number) => (
                      <details key={idx} className="bg-zinc-50 dark:bg-zinc-800 border p-4 rounded-xl cursor-pointer">
                        <summary className="font-bold flex justify-between items-center">
                          <span className="text-zinc-900 dark:text-zinc-100">{agent.agent_name} Node</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-50 px-2 py-1 rounded">w={(agent.confidence * 100).toFixed(0)}%</span>
                        </summary>
                        <p className="mt-3 text-zinc-600 dark:text-zinc-400 border-l-4 border-indigo-200 pl-4 py-1">{agent.findings}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
