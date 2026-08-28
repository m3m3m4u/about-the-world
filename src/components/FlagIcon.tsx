import React from 'react';
import { Language } from '@/types';

interface FlagIconProps {
  lang: Language;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export function FlagIcon({ lang, width = 24, height = 16, style = {} }: FlagIconProps) {
  const commonStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    display: 'block',
    borderRadius: '2px',
    border: '1px solid rgba(0, 0, 0, 0.15)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    flexShrink: 0,
    ...style,
  };

  switch (lang) {
    case 'de':
      return (
        <svg viewBox="0 0 5 3" style={commonStyle}>
          <rect width="5" height="1" y="0" fill="#000000" />
          <rect width="5" height="1" y="1" fill="#DD0000" />
          <rect width="5" height="1" y="2" fill="#FFCE00" />
        </svg>
      );
    case 'en':
      return (
        <svg viewBox="0 0 60 30" style={commonStyle}>
          <clipPath id="uk-clip-clean">
            <path d="M0,0 v30 h60 v-30 z"/>
          </clipPath>
          <clipPath id="uk-diag-clean">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
          </clipPath>
          <g clipPath="url(#uk-clip-clean)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-diag-clean)" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
          </g>
        </svg>
      );
    case 'fr':
      return (
        <svg viewBox="0 0 3 2" style={commonStyle}>
          <rect width="1" height="2" x="0" fill="#002654" />
          <rect width="1" height="2" x="1" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" fill="#CE1126" />
        </svg>
      );
    case 'es':
      return (
        <svg viewBox="0 0 3 2" style={commonStyle}>
          <rect width="3" height="0.5" y="0" fill="#AA151B" />
          <rect width="3" height="1" y="0.5" fill="#F1BF00" />
          <rect width="3" height="0.5" y="1.5" fill="#AA151B" />
        </svg>
      );
    case 'it':
      return (
        <svg viewBox="0 0 3 2" style={commonStyle}>
          <rect width="1" height="2" x="0" fill="#009246" />
          <rect width="1" height="2" x="1" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" fill="#CE2B37" />
        </svg>
      );
    default:
      return null;
  }
}
