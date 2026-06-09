'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'elektro-becker-cookie-consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 px-4 py-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <p className="text-slate-300 text-sm flex-1 leading-relaxed">
          Diese Website verwendet ausschließlich technisch notwendige Cookies. Es werden keine
          Tracking- oder Analyse-Cookies eingesetzt.{' '}
          <a href="/datenschutz" className="underline text-yellow-400 hover:text-yellow-300 transition-colors">
            Datenschutzerklärung
          </a>
        </p>
        <button
          onClick={accept}
          className="shrink-0 bg-yellow-500 hover:bg-yellow-400 text-slate-900 text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
        >
          Verstanden
        </button>
      </div>
    </div>
  );
}
