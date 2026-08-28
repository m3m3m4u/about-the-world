'use client';

import React from 'react';
import { ModuleItem } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Layers, 
  FileText,
  Video,
  HelpCircle,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ModuleListProps {
  modules: ModuleItem[];
  selectedModuleId: string;
  onSelectModule: (module: ModuleItem) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  currentPage: number;
  totalPages: number;
  totalModules: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function ModuleList({ 
  modules, 
  selectedModuleId, 
  onSelectModule,
  searchTerm,
  onSearchChange,
  currentPage,
  totalPages,
  totalModules,
  onPageChange,
  isLoading = false
}: ModuleListProps) {
  const { t, language } = useLanguage();

  const getTypeIcon = (type: ModuleItem['type']) => {
    switch (type) {
      case 'CoursePresentation':
        return <Layers className="w-3.5 h-3.5 text-teal-600" />;
      case 'InteractiveVideo':
        return <Video className="w-3.5 h-3.5 text-blue-600" />;
      case 'QuestionSet':
        return <HelpCircle className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  return (
    <div className="h5p-player-card" style={{ margin: 0 }}>
      
      <div className="h5p-title">
        <span>{t.relatedExercises}</span>
        <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>
          {totalModules.toLocaleString()} Übungen
        </span>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={language === 'de' ? 'Übung suchen...' : 'Search exercises...'}
          className="w-full pl-9 pr-3 py-1.5 text-xs border rounded focus:outline-none"
          style={{ borderColor: 'var(--border-color)', background: 'var(--bg-body)' }}
        />
      </div>

      {/* List */}
      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
        {isLoading ? (
          <div className="h5p-status">
            {t.loading}
          </div>
        ) : modules.length === 0 ? (
          <div className="h5p-status">
            {t.noResults}
          </div>
        ) : (
          modules.map((mod, idx) => {
            const isSelected = mod.id === selectedModuleId;
            const globalIndex = (currentPage - 1) * 30 + idx + 1;

            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => onSelectModule(mod)}
                className="admin-action-btn w-full text-left justify-between"
                style={{
                  borderColor: isSelected ? 'var(--primary-color)' : 'var(--border-dark)',
                  background: isSelected ? 'var(--primary-light)' : 'var(--bg-white)',
                  color: isSelected ? 'var(--primary-color)' : 'var(--text-main)',
                  fontWeight: isSelected ? 600 : 400,
                  display: 'flex',
                }}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-bold text-xs">{globalIndex}.</span>
                  <span className="truncate">{mod.title[language] || mod.title.de}</span>
                </div>
                <div className="flex-shrink-0">
                  {getTypeIcon(mod.type)}
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-3 mt-3 border-t text-xs" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
          <span>
            {language === 'de' 
              ? `Seite ${currentPage} von ${totalPages}` 
              : `Page ${currentPage} of ${totalPages}`}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="admin-action-btn p-1"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="admin-action-btn p-1"
              aria-label="Next Page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
