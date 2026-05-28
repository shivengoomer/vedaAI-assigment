// src/components/result/QuestionItem.tsx
'use client';

import React from 'react';
import { Question } from '@/types/question';

interface QuestionItemProps {
  number: number;
  question: Question;
}

export function QuestionItem({ number, question }: QuestionItemProps) {
  // Format difficulty text
  const difficultyLabel = 
    question.difficulty === 'easy' ? '[Easy]' : 
    question.difficulty === 'moderate' ? '[Moderate]' : 
    '[Challenging]';

  return (
    <div className="flex flex-col gap-1 w-full text-left" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
      
      {/* Question Text Line */}
      <div className="flex items-start gap-1.5 w-full">
        <span 
          style={{
            color: 'var(--Text-Primary, #303030)',
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '240%',
            letterSpacing: '-0.64px',
            flexShrink: 0
          }}
        >
          {number}.
        </span>
        <div 
          style={{
            color: 'var(--Text-Primary, #303030)',
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '240%',
            letterSpacing: '-0.64px',
            flex: 1
          }}
        >
          <span className="mr-1.5" style={{ fontWeight: 400 }}>{difficultyLabel}</span>
          <span>{question.text}</span>
          <span 
            style={{
              color: 'var(--Text-Primary, #303030)',
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '240%',
              letterSpacing: '-0.64px',
              marginLeft: '8px'
            }}
          >
            [{question.marks} Mark{question.marks > 1 ? 's' : ''}]
          </span>
        </div>
      </div>

      {/* Render Options for MCQs if available */}
      {question.options && question.options.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-6 mt-1 w-full">
          {question.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            return (
              <div key={idx} className="flex items-start gap-2">
                <span 
                  style={{
                    color: 'var(--Text-Primary, #303030)',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '240%',
                    letterSpacing: '-0.64px',
                    flexShrink: 0
                  }}
                >
                  {letter}.
                </span>
                <span 
                  style={{
                    color: 'var(--Text-Primary, #303030)',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '240%',
                    letterSpacing: '-0.64px',
                    flex: 1
                  }}
                >
                  {option}
                </span>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
