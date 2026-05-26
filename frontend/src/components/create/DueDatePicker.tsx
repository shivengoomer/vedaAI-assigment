// src/components/create/DueDatePicker.tsx
'use client';

import React, { useRef } from 'react';
import { Calendar } from 'lucide-react';

interface DueDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
}

export function DueDatePicker({ value, onChange }: DueDatePickerProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    try {
      dateInputRef.current?.showPicker();
    } catch {
      dateInputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[16px] font-bold text-[#303030] font-sans">
        Due Date
      </label>
      
      <div 
        className="relative flex items-center w-full bg-white rounded-full transition-all"
        style={{ 
          height: '44px',
          outline: '1.25px #DADADA solid', 
          outlineOffset: '-1.25px' 
        }}
      >
        <input
          ref={dateInputRef}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full pl-4 pr-12 bg-transparent text-[16px] font-medium text-[#303030] placeholder-[#A9A9A9] outline-none cursor-pointer font-sans"
        />
        
        {/* Calendar Icon Button */}
        <button
          type="button"
          onClick={handleIconClick}
          className="absolute right-4 p-1 text-[#2B2B2B] hover:text-[#FF5623] transition-colors"
        >
          <Calendar className="w-5 h-5 text-[#2B2B2B] stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
