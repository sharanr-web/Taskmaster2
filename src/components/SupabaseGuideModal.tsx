import React, { useState } from 'react';
import { 
  X, 
  Database, 
  Copy, 
  Check, 
  Server, 
  ExternalLink, 
  ShieldCheck, 
  HardDrive, 
  Layers, 
  Code, 
  Sparkles,
  GitBranch
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUPABASE_SQL_SCHEMA } from '../data/initialData';

export const SupabaseGuideModal: React.FC = () => {
  const { isSupabaseModalOpen, setIsSupabaseModalOpen } = useApp();
  const [copied, setCopied] = useState(false);
  const [activeSubtab, setActiveSubtab] = useState<'architecture' | 'sql' | 'github' | 'storage'>('architecture');

  if (!isSupabaseModalOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={() => setIsSupabaseModalOpen(false)} />

      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white">
                Taskmation Production Architecture & Supabase Schema
              </h2>
              <p className="text-xs text-neutral-400">
                Blueprint for deploying to Vercel + Supabase (Auth, PostgreSQL & Direct Video Storage)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSupabaseModalOpen(false)}
            className="p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Subtabs */}
        <div className="flex border-b border-neutral-800 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveSubtab('architecture')}
            className={`px-4 py-2 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeSubtab === 'architecture' 
                ? 'border-amber-500 text-amber-400' 
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Full Stack Architecture
          </button>

          <button
            onClick={() => setActiveSubtab('sql')}
            className={`px-4 py-2 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeSubtab === 'sql' 
                ? 'border-amber-500 text-amber-400' 
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>PostgreSQL Schema (SQL)</span>
          </button>

          <button
            onClick={() => setActiveSubtab('storage')}
            className={`px-4 py-2 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeSubtab === 'storage' 
                ? 'border-amber-500 text-amber-400' 
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Direct Video Storage RLS</span>
          </button>

          <button
            onClick={() => setActiveSubtab('github')}
            className={`px-4 py-2 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeSubtab === 'github' 
                ? 'border-amber-500 text-amber-400' 
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>GitHub & Vercel Deploy</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {/* Subtab 1: Architecture */}
          {activeSubtab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                <strong>Why separate Website Hosting from File Storage?</strong> Animation files (MP4/WebM) are heavy. Hosting the site on Vercel with direct client-to-Supabase Storage uploads ensures you never hit server payload limits (Vercel serverless 4.5MB limit is completely bypassed).
              </div>

              {/* Stack Table */}
              <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-950">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900 text-neutral-300 font-bold uppercase border-b border-neutral-800">
                    <tr>
                      <th className="p-3.5">Component</th>
                      <th className="p-3.5">Technology</th>
                      <th className="p-3.5">Purpose & Benefit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    <tr>
                      <td className="p-3.5 font-bold text-white">Frontend Web App</td>
                      <td className="p-3.5 text-amber-400 font-mono">React / Next.js + Tailwind</td>
                      <td className="p-3.5 text-neutral-300">Dark cinematic UI, video player with frame stepping, submission flows</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-white">Website Hosting</td>
                      <td className="p-3.5 text-amber-400 font-mono">Vercel</td>
                      <td className="p-3.5 text-neutral-300">Global edge CDN, instant CI/CD from your GitHub repository</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-white">Authentication</td>
                      <td className="p-3.5 text-amber-400 font-mono">Supabase Auth</td>
                      <td className="p-3.5 text-neutral-300">Google OAuth + Email/Password authentication & JWT tokens</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-white">Relational Database</td>
                      <td className="p-3.5 text-amber-400 font-mono">Supabase PostgreSQL</td>
                      <td className="p-3.5 text-neutral-300">Store tasks, submissions, mentor scores, likes, comments, user streaks</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-white">Large Video Storage</td>
                      <td className="p-3.5 text-amber-400 font-mono">Supabase Storage</td>
                      <td className="p-3.5 text-neutral-300">Direct presigned browser uploads for animation clips up to 100MB</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-white">Admin & Mentor Hub</td>
                      <td className="p-3.5 text-amber-400 font-mono">Built-in Role Based Panel</td>
                      <td className="p-3.5 text-neutral-300">Publish monthly challenges, evaluate 12 principles, write private feedback</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Subtab 2: SQL Schema */}
          {activeSubtab === 'sql' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-300">Ready to execute in Supabase SQL Editor:</span>
                <button
                  onClick={handleCopySql}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-neutral-950 text-xs font-bold flex items-center gap-1 hover:bg-amber-400 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied SQL!' : 'Copy SQL Schema'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-amber-300 font-mono overflow-x-auto leading-relaxed max-h-96">
                {SUPABASE_SQL_SCHEMA}
              </pre>
            </div>
          )}

          {/* Subtab 3: Storage RLS */}
          {activeSubtab === 'storage' && (
            <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
              <h3 className="font-display font-bold text-sm text-white">Supabase Storage Bucket Configuration</h3>
              <p>
                1. In your Supabase Dashboard, navigate to <strong>Storage</strong> and create a public bucket named <code className="text-amber-400 font-mono bg-neutral-950 px-1 py-0.5 rounded">animations</code>.
              </p>
              <p>
                2. Apply Row Level Security (RLS) policies allowing authenticated animators to insert files under their user folder:
              </p>

              <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-amber-300 font-mono">
{`-- Allow authenticated users to upload their submissions
CREATE POLICY "Animators can upload clips"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'animations' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow public viewing of approved animations
CREATE POLICY "Public can view animations"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'animations');`}
              </pre>
            </div>
          )}

          {/* Subtab 4: GitHub & Vercel */}
          {activeSubtab === 'github' && (
            <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
              <h3 className="font-display font-bold text-sm text-white">Export to GitHub & Deploy to Vercel</h3>
              <ol className="list-decimal list-inside space-y-2 pl-2">
                <li>Export the project ZIP or push directly to your <strong>GitHub</strong> repository.</li>
                <li>Import the GitHub repo on <strong>Vercel</strong>.</li>
                <li>Set your Environment Variables in Vercel project settings:
                  <div className="my-2 p-3 bg-neutral-950 rounded-xl border border-neutral-800 font-mono text-[11px] text-amber-400">
                    VITE_SUPABASE_URL=https://your-project.supabase.co<br/>
                    VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
                  </div>
                </li>
                <li>Click <strong>Deploy</strong>. Vercel builds the SPA statically with lightning-fast CDN caching!</li>
              </ol>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={() => setIsSupabaseModalOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
