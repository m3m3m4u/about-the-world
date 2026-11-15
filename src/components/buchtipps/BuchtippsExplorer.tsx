'use client';

import React, { useState, useMemo } from 'react';
import { getBuchTippsByLanguage, BUCHTIPPS_UI } from '@/lib/buchtipps/data';
import { BUCH_CATEGORIES } from '@/lib/buchtipps/types';
import { useLanguage } from '@/context/LanguageContext';
import BuchCard from './BuchCard';

export default function BuchtippsExplorer() {
  const { language } = useLanguage();
  const ui = BUCHTIPPS_UI[language] || BUCHTIPPS_UI.de;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const languageBooks = useMemo(() => {
    return getBuchTippsByLanguage(language);
  }, [language]);

  const filteredBooks = useMemo(() => {
    return languageBooks.filter((book) => {
      if (selectedCategory !== 'all' && book.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = book.title.toLowerCase().includes(query);
        const matchesSubtitle = book.subtitle?.toLowerCase().includes(query);
        const matchesAuthor = book.authorName.toLowerCase().includes(query);
        const matchesTopics = book.topics.some((t) => t.toLowerCase().includes(query));
        const matchesWhy = book.whyRecommended.toLowerCase().includes(query);
        const matchesSummary = book.summary.toLowerCase().includes(query);
        return Boolean(
          matchesTitle ||
            matchesSubtitle ||
            matchesAuthor ||
            matchesTopics ||
            matchesWhy ||
            matchesSummary
        );
      }
      return true;
    });
  }, [languageBooks, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Filter & Search Bar */}
      <div className="buchtipps-filter-card">
        <div className="buchtipps-search-row">
          {/* Live Search Input */}
          <div className="buchtipps-search-wrapper">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--green-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: '8px', flexShrink: 0 }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={ui.searchPlaceholder}
              aria-label={ui.searchAriaLabel}
              className="buchtipps-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label={ui.clearSearchAria}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Results count note */}
          <div className="buchtipps-count-pill">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--green-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span>{ui.resultsCount(filteredBooks.length)}</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="buchtipps-categories-row">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`buchtipps-category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          >
            {ui.allTopics}
          </button>

          {BUCH_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`buchtipps-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              title={category.description[language] || category.description.de}
            >
              {category.label[language] || category.label.de}
            </button>
          ))}
        </div>
      </div>

      {/* Book Grid */}
      {filteredBooks.length > 0 ? (
        <section className="buchtipps-grid">
          {filteredBooks.map((book) => (
            <BuchCard key={book.id} book={book} />
          ))}
        </section>
      ) : (
        <div
          style={{
            background: 'var(--bg-white)',
            border: '1px solid var(--border-light)',
            borderRadius: '6px',
            padding: '48px 24px',
            textAlign: 'center',
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--green-primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ margin: '0 auto 12px auto', display: 'block', opacity: 0.7 }}
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <h3 style={{ fontSize: '18px', color: 'var(--green-dark)', marginBottom: '8px' }}>
            {ui.emptyTitle}
          </h3>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '14px',
              maxWidth: '440px',
              margin: '0 auto 16px auto',
            }}
          >
            {ui.emptyDesc}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="buchtipp-amazon-btn"
          >
            {ui.resetFilterBtn}
          </button>
        </div>
      )}
    </div>
  );
}
