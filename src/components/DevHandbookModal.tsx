'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  X, 
  CheckSquare, 
  FileCode, 
  Terminal, 
  Layers, 
  Video, 
  Cpu,
  BookOpen,
  Copy,
  Check
} from 'lucide-react';

interface DevHandbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DevHandbookModal({ isOpen, onClose }: DevHandbookModalProps) {
  const { t, language } = useLanguage();
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const checklistItems = [
    { num: 1, title: t.check1, detail: language === 'de' ? 'Python-Skript 01.py scannt alle .h5p-Dateien auf YouTube-Links und Inhaltstypen.' : 'Python script 01.py scans all .h5p archives for YouTube links and course types.' },
    { num: 2, title: t.check2, detail: language === 'de' ? 'Alle Bibliotheken in public/h5p-libraries/ zentral zur Wiederverwendung bündeln.' : 'Bundle all shared libraries in public/h5p-libraries/ for shared reuse.' },
    { num: 3, title: t.check3, detail: language === 'de' ? 'getIframe & .style Schutz, cc_load_policy: 0, iv_load_policy: 3 verhindern Abstürze.' : 'getIframe & .style protection, cc_load_policy: 0, iv_load_policy: 3 prevent player crashes.' },
    { num: 4, title: t.check4, detail: language === 'de' ? 'Video-Höhe height: calc(100% - 48px), z-index: 50 für Navigation & Fortschritt.' : 'Video height calc(100% - 48px), z-index: 50 for navigation and progress bar.' },
    { num: 5, title: t.check5, detail: language === 'de' ? 'saveFreq: 1 im H5P-Kern aktiviert State-Restoration inkl. Überprüfen-Trigger.' : 'saveFreq: 1 in H5P core enables state restoration and auto-trigger.' },
  ];

  const youtubePatchCode = `/**
 * Universal H5P YouTube Compatibility Patch
 * Behebt API-Crashes, schützt .style Zugriffe, deaktiviert ungewollte Untertitel
 */
H5P.VideoYouTube = (function ($) {
  function YouTube(sources, options, l10n) {
    var self = this;
    var player;
    var id = 'h5p-youtube-' + numInstances++;
    // ... vollflächige Ausrichtung & Schutz von YT.Player
  }
  return YouTube;
})(H5P.jQuery);`;

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-3xl max-h-[85vh] overflow-y-auto p-6 animate-scaleUp">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                {t.handbookTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.handbookSubtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 7-Step Checklist */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <CheckSquare className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">
              {t.checklistTitle}
            </h3>
          </div>

          <div className="space-y-2.5">
            {checklistItems.map((item) => (
              <div
                key={item.num}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/80"
              >
                <div className="w-6 h-6 rounded-md bg-teal-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.num}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Universal YouTube Patch Snippet */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Video className="w-4 h-4 text-red-600" />
              <span>Universal YouTube Compatibility Patch (Kapitel 3)</span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(youtubePatchCode, 'yt-patch')}
              className="inline-flex items-center gap-1 text-[11px] text-teal-700 bg-teal-50 hover:bg-teal-100 px-2 py-1 rounded border border-teal-200 transition-colors cursor-pointer"
            >
              {copiedSection === 'yt-patch' ? (
                <>
                  <Check className="w-3 h-3 text-teal-700" />
                  <span>Kopiert</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-teal-600" />
                  <span>Kopieren</span>
                </>
              )}
            </button>
          </div>
          <pre className="bg-slate-950 text-teal-300 p-3.5 rounded-lg text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
            {youtubePatchCode}
          </pre>
        </div>

        {/* Directory structure reference */}
        <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 text-xs text-teal-900 leading-relaxed">
          <div className="font-bold flex items-center gap-2 mb-1 text-teal-800">
            <Layers className="w-4 h-4" />
            <span>Struktur für neue H5P-Pakete (Next.js Public Ordner):</span>
          </div>
          <code className="text-[11px] font-mono text-teal-950 block mt-1">
            public/h5p-core/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# frame.bundle.js & styles/h5p.css<br />
            public/h5p-libraries/ &nbsp;# Geteilter Bibliotheken-Pool<br />
            public/h5p-content/[slug]/ # Entpackte h5p.json und content/
          </code>
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-primary text-xs font-semibold px-5 py-2 cursor-pointer"
          >
            {t.closeHandbook}
          </button>
        </div>

      </div>
    </div>
  );
}
