'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CursorVariant = 'default' | 'hover' | 'view' | 'open' | 'copy' | 'copied' | 'explore';

interface CursorContextType {
  cursorVariant: CursorVariant;
  cursorText: string;
  setCursorVariant: (variant: CursorVariant, text?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorVariant, setVariant] = useState<CursorVariant>('default');
  const [cursorText, setText] = useState<string>('');

  const setCursorVariant = (variant: CursorVariant, text: string = '') => {
    setVariant(variant);
    setText(text);
  };

  const resetCursor = () => {
    setVariant('default');
    setText('');
  };

  return (
    <CursorContext.Provider
      value={{
        cursorVariant,
        cursorText,
        setCursorVariant,
        resetCursor,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}
