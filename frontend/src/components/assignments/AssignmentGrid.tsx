// src/components/assignments/AssignmentGrid.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Assignment } from '@/types/assignment';
import { AssignmentCard } from './AssignmentCard';
import { Search, Plus, ArrowLeft } from 'lucide-react';
import { PillButton } from '../shared/PillButton';

interface AssignmentGridProps {
  assignments: Assignment[];
}

export function AssignmentGrid({ assignments }: AssignmentGridProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Extract unique subjects for the filter
  const subjects = useMemo(() => {
    const set = new Set(assignments.map(a => a.subject));
    return Array.from(set);
  }, [assignments]);

  // Filter assignments based on search and selected subject
  const filteredAssignments = useMemo(() => {
    return assignments.filter((a) => {
      const matchesSearch = 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.grade.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSubject = selectedSubject ? a.subject === selectedSubject : true;
      
      return matchesSearch && matchesSubject;
    });
  }, [assignments, searchQuery, selectedSubject]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-24 md:pb-28 relative z-10">
      {/* Background blur bubble (Figma decorative detail) */}
      <div 
        className="absolute w-[1113px] h-[428px] pointer-events-none rounded-full select-none z-0 hidden md:block" 
        style={{ 
          left: '327px', 
          top: '560px', 
          background: 'rgba(76.25, 76.25, 76.25, 0.12)', 
          filter: 'blur(200px)' 
        }} 
      />

      {/* Page Header (Desktop) */}
      <div className="hidden md:flex flex-col gap-1 pl-2 relative z-10">
        <div className="flex items-center gap-3">
          {/* Glowing Green Live Indicator dot */}
          <div 
            className="w-3 h-3 bg-[#4BC26D] rounded-full inline-block flex-shrink-0"
            style={{ 
              boxShadow: '0px 32px 48px rgba(0, 0, 0, 0.20), 0px 16px 48px rgba(0, 0, 0, 0.12)',
              outline: '4px rgba(75.15, 193.95, 108.81, 0.40) solid' 
            }}
          />
          <h2 className="text-[20px] font-bold text-[#303030] font-sans">
            Assignments
          </h2>
        </div>
        <p className="text-[14px] text-gray-500/80 font-sans leading-tight pl-[24px]">
          Manage and create assignments for your classes.
        </p>
      </div>

      {/* Mobile Page Header */}
      <div 
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
        }}
        className="flex md:hidden w-full relative z-10"
      >
        <button
          type="button"
          onClick={() => router.push('/home')}
          style={{
            display: 'flex',
            width: '48px',
            height: '48px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            aspectRatio: '1/1',
            borderRadius: '100px',
            background: 'var(--Background-white-25, rgba(255, 255, 255, 0.25))',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          className="active:scale-95 transition-all text-[#303030] border border-gray-200/50 flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <h2
          style={{
            color: 'var(--Text-Primary, #303030)',
            textAlign: 'center',
            fontFamily: '"Bricolage Grotesque", sans-serif',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '140%',
            letterSpacing: '-0.64px',
          }}
          className="flex-1"
        >
          Assignments
        </h2>

        {/* Spacer to center the heading */}
        <div className="w-12 h-12 flex-shrink-0" />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-white h-16 px-4 rounded-[20px] border border-veda-card-border shadow-sm w-full relative z-20">
        
        {/* Filter Button */}
        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="flex items-center gap-2 text-[14px] font text-[#A9A9A9] hover:text-[#303030] transition-colors font-sans py-2 px-1"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.5 4.82153C2.5 3.53938 3.53938 2.5 4.82153 2.5H15.1785C16.4606 2.5 17.5 3.53938 17.5 4.82153C17.5 5.49412 17.2594 6.14453 16.8217 6.6552L14.4599 9.41062C13.5537 10.4679 13.0556 11.8144 13.0556 13.2069V15C13.0556 16.3807 11.9363 17.5 10.5556 17.5H9.44444C8.06373 17.5 6.94444 16.3807 6.94444 15V13.2069C6.94444 11.8144 6.44632 10.4679 5.54011 9.41062L3.17832 6.6552C2.7406 6.14453 2.5 5.49412 2.5 4.82153ZM4.82153 4.16667C4.45986 4.16667 4.16667 4.45986 4.16667 4.82153C4.16667 5.09627 4.26495 5.36195 4.44375 5.57054L6.80554 8.32597C7.97067 9.68529 8.61111 11.4166 8.61111 13.2069V15C8.61111 15.4602 8.98421 15.8333 9.44444 15.8333H10.5556C11.0158 15.8333 11.3889 15.4602 11.3889 15V13.2069C11.3889 11.4166 12.0293 9.68529 13.1945 8.32597L15.5563 5.57054C15.7351 5.36195 15.8333 5.09627 15.8333 4.82153C15.8333 4.45986 15.5401 4.16667 15.1785 4.16667H4.82153Z" fill="#A9A9A9"/>
            </svg>
            <span>
              {selectedSubject ? `Filter: ${selectedSubject}` : 'Filter '}
            </span>
          </button>

          {/* Filter Dropdown */}
          {showFilterDropdown && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-veda-card-border rounded-xl shadow-lg py-1.5 z-30">
              <button
                onClick={() => {
                  setSelectedSubject(null);
                  setShowFilterDropdown(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${
                  selectedSubject === null ? 'font-bold text-veda-orange' : 'text-[#303030]'
                }`}
              >
                All Subjects
              </button>
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => {
                    setSelectedSubject(sub);
                    setShowFilterDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${
                    selectedSubject === sub ? 'font-bold text-veda-orange' : 'text-[#303030]'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="relative w-full max-w-[380px] h-[44px] flex items-center gap-3 px-4 bg-gray-50 focus-within:bg-white custom-search-bar">
          <Search className="w-5 h-5 text-[#A9A9A9] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full text-[14px]  text-[#303030] placeholder-[#A9A9A9] bg-transparent outline-none font-sans"
          />
        </div>
      </div>

      {/* Grid of Assignment Cards */}
      {filteredAssignments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {filteredAssignments.map((assignment) => (
            <AssignmentCard key={assignment._id} assignment={assignment} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-veda-card-border rounded-xl p-8 text-center text-veda-text-secondary text-sm relative z-10">
          No assignments match your filter/search criteria.
        </div>
      )}

      {/* Bottom Sticky Action Bar (Desktop only, when assignments exist) */}
      <div className="hidden md:flex fixed bottom-0 left-0 right-0 items-center justify-center pointer-events-none z-10">
        <div 
          className="pointer-events-auto"
          style={{
            display: 'flex',
            width: '100%',
            height: '73px',
            padding: '10px 0',
            paddingLeft: '304px', // Offset by sidebar width to center button in main content area
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(176deg, rgba(234, 234, 234, 0.00) 3.17%, #DADADA 81.22%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <PillButton
            variant="primary"
            icon={<Plus className="w-5 h-5" />}
            onClick={() => router.push('/create')}
            className="shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            Create Assignment
          </PillButton>
        </div>
      </div>

    </div>
  );
}
