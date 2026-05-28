// src/components/result/AnswerKey.tsx
'use client';

import React from 'react';

interface AnswerKeyProps {
  answers: { questionId: string; answer: string }[];
  questionMapping: Record<string, number>; // maps questionId to its global display index number
}

export function AnswerKey({ answers, questionMapping }: AnswerKeyProps) {
  if (!answers || answers.length === 0) return null;

  return (
    <div className="border-t-2 border-dashed border-gray-300 pt-6 mt-8">
      <h3 className="text-base font-bold text-black mb-4 uppercase tracking-wider">
        Answer Key
      </h3>

      <div className="flex flex-col gap-1 pl-1">
        {answers.map((item, idx) => {
          const number = questionMapping[item.questionId] || (idx + 1);
          return (
            <div key={item.questionId} className="flex gap-2">
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
              <p 
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
                {item.answer}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
