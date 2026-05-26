// src/components/create/QuestionTypeRow.tsx
'use client';

import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { QuestionType } from '@/types/question';

interface QuestionTypeRowProps {
  type: QuestionType;
  count: number;
  marks: number;
  onUpdate: (field: 'type' | 'count' | 'marks', value: QuestionType | number) => void;
  onRemove: () => void;
}

const QUESTION_TYPES = [
  { value: 'mcq', label: 'Multiple Choice Questions' },
  { value: 'short', label: 'Short Questions' },
  { value: 'long', label: 'Long Questions' },
  { value: 'truefalse', label: 'True or False' },
  { value: 'fillblank', label: 'Fill in the Blanks' }
];

export function QuestionTypeRow({
  type,
  count,
  marks,
  onUpdate,
  onRemove
}: QuestionTypeRowProps) {
  
  // Increment/Decrement helper
  const handleStep = (field: 'count' | 'marks', increment: boolean) => {
    const currentValue = field === 'count' ? count : marks;
    const newValue = increment ? currentValue + 1 : currentValue - 1;
    if (newValue >= 1) {
      onUpdate(field, newValue);
    }
  };

  return (
    <>
      {/* Desktop Row View */}
      <div className="hidden md:flex items-center justify-between w-full gap-4">
        {/* Left Side: Select Dropdown & Remove Button */}
        <div className="flex items-center gap-3 w-[471px] flex-shrink-0">
          <div 
            className="w-[443px] h-[44px] px-4 bg-white rounded-full flex items-center justify-between"
            style={{ 
              outline: '1.25px #DADADA solid', 
              outlineOffset: '-1.25px' 
            }}
          >
            <select
              value={type}
              onChange={(e) => onUpdate('type', e.target.value as QuestionType)}
              className="w-full h-full bg-transparent text-[16px] font-medium text-[#303030] outline-none cursor-pointer appearance-none pr-8 font-sans"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23303030' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right center',
                backgroundSize: '14px',
              }}
            >
              {QUESTION_TYPES.map((qt) => (
                <option key={qt.value} value={qt.value}>
                  {qt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Delete Row Button */}
          <button
            type="button"
            onClick={onRemove}
            className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-[#C53535] active:scale-90 transition-all flex-shrink-0"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Right Side: No. of Questions & Marks Steppers */}
        <div className="w-[216px] flex justify-between flex-shrink-0">
          {/* No. of Questions Counter */}
          <div 
            className="w-[100px] h-[44px] px-2 bg-white rounded-full flex items-center justify-between shadow-sm"
            style={{ 
              outline: '1.25px #DADADA solid', 
              outlineOffset: '-1.25px' 
            }}
          >
            <button
              type="button"
              onClick={() => handleStep('count', false)}
              disabled={count <= 1}
              className="w-6 h-6 rounded-full flex items-center justify-center text-[#5E5E5E] hover:bg-gray-100 disabled:opacity-30 transition-all"
            >
              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
            <span className="text-[16px] font-bold text-[#303030] font-sans">
              {count}
            </span>
            <button
              type="button"
              onClick={() => handleStep('count', true)}
              className="w-6 h-6 rounded-full flex items-center justify-center text-[#5E5E5E] hover:bg-gray-100 transition-all"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Marks Counter */}
          <div 
            className="w-[100px] h-[44px] px-2 bg-white rounded-full flex items-center justify-between shadow-sm"
            style={{ 
              outline: '1.25px #DADADA solid', 
              outlineOffset: '-1.25px' 
            }}
          >
            <button
              type="button"
              onClick={() => handleStep('marks', false)}
              disabled={marks <= 1}
              className="w-6 h-6 rounded-full flex items-center justify-center text-[#5E5E5E] hover:bg-gray-100 disabled:opacity-30 transition-all"
            >
              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
            <span className="text-[16px] font-bold text-[#303030] font-sans">
              {marks}
            </span>
            <button
              type="button"
              onClick={() => handleStep('marks', true)}
              className="w-6 h-6 rounded-full flex items-center justify-center text-[#5E5E5E] hover:bg-gray-100 transition-all"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Card Row View */}
      <div className="w-full p-3 bg-white border border-gray-150 rounded-[24px] flex flex-col gap-3 shadow-sm md:hidden">
        {/* Top Row: Dropdown Select & Remove Button */}
        <div className="flex items-center justify-between w-full">
          <div className="relative flex items-center gap-1 min-w-0 max-w-[85%]">
            <select
              value={type}
              onChange={(e) => onUpdate('type', e.target.value as QuestionType)}
              className="bg-transparent text-[14px] font-bold text-[#303030] outline-none cursor-pointer appearance-none pr-6 font-sans"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23303030' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right center',
                backgroundSize: '14px',
              }}
            >
              {QUESTION_TYPES.map((qt) => (
                <option key={qt.value} value={qt.value}>
                  {qt.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={onRemove}
            className="w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-[#C53535] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Row: Steppers in #F0F0F0 rounded capsule container */}
        <div className="w-full p-2 bg-[#F0F0F0] rounded-[24px] flex items-center gap-3">
          <div className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[12px] font-bold text-[#303030] font-sans text-center">
              No. of Questions
            </span>
            <div className="w-full p-1 bg-white rounded-full flex items-center justify-between h-[36px] px-2 shadow-sm">
              <button
                type="button"
                onClick={() => handleStep('count', false)}
                disabled={count <= 1}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[#5E5E5E] hover:bg-gray-100 disabled:opacity-30 transition-all"
              >
                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
              <span className="text-[15px] font-bold text-[#303030] font-sans">
                {count}
              </span>
              <button
                type="button"
                onClick={() => handleStep('count', true)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[#5E5E5E] hover:bg-gray-100 transition-all"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[12px] font-bold text-[#303030] font-sans text-center">
              Marks
            </span>
            <div className="w-full p-1 bg-white rounded-full flex items-center justify-between h-[36px] px-2 shadow-sm">
              <button
                type="button"
                onClick={() => handleStep('marks', false)}
                disabled={marks <= 1}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[#5E5E5E] hover:bg-gray-100 disabled:opacity-30 transition-all"
              >
                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
              <span className="text-[15px] font-bold text-[#303030] font-sans">
                {marks}
              </span>
              <button
                type="button"
                onClick={() => handleStep('marks', true)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[#5E5E5E] hover:bg-gray-100 transition-all"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
