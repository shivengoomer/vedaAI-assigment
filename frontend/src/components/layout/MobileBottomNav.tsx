// src/components/layout/MobileBottomNav.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Badge } from '../shared/Badge';
import { useAssignmentStore } from '@/store/assignmentStore';

export function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const assignmentsCount = useAssignmentStore((state) => state.assignments.length);

  const homeIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.4998 11.6666H11.6665V17.5H17.4998V11.6666Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.33333 11.6666H2.5V17.5H8.33333V11.6666Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.4998 2.5H11.6665V8.33333H17.4998V2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.33333 2.5H2.5V8.33333H8.33333V2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const assignmentsIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 14.1666H12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M7.5 10.8334H12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M7.5 7.5H8.33333" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M4.1665 5C4.1665 3.61929 5.28579 2.5 6.6665 2.5H10.9761C11.4182 2.5 11.8421 2.67559 12.1547 2.98816L15.345 6.17851C15.6516 6.49107 15.8332 6.915 15.8332 7.35702V15C15.8332 16.3807 14.7139 17.5 13.3332 17.5H6.6665C5.28579 17.5 4.1665 16.3807 4.1665 15V5Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M10.8335 2.5V4.16667C10.8335 6.00762 12.3259 7.5 14.1668 7.5H15.8335" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );

  const libraryIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.6752 13.2417C17.145 14.4954 16.3158 15.6002 15.2601 16.4594C14.2043 17.3187 12.9541 17.9062 11.6189 18.1707C10.2836 18.4351 8.90386 18.3685 7.6003 17.9765C6.29673 17.5845 5.10903 16.8792 4.14102 15.9222C3.17302 14.9652 2.45419 13.7856 2.04737 12.4866C1.64055 11.1876 1.55814 9.80874 1.80734 8.47053C2.05653 7.13232 2.62975 5.87553 3.47688 4.81003C4.324 3.74453 5.41924 2.90277 6.66684 2.35834" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.3333 10C18.3333 8.90567 18.1178 7.82204 17.699 6.81099C17.2802 5.79994 16.6664 4.88129 15.8926 4.10746C15.1187 3.33364 14.2001 2.71981 13.189 2.30102C12.178 1.88224 11.0943 1.66669 10 1.66669V10H18.3333Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const toolkitIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.3335 16.25C3.3335 15.6974 3.55299 15.1675 3.94369 14.7768C4.33439 14.3861 4.8643 14.1666 5.41683 14.1666H16.6668M3.3335 16.25C3.3335 16.8025 3.55299 17.3324 3.94369 17.7231C4.33439 18.1138 4.8643 18.3333 5.41683 18.3333H16.6668V1.66663H5.41683C4.8643 1.66663 4.33439 1.88612 3.94369 2.27682C3.55299 2.66752 3.3335 3.19742 3.3335 3.74996V16.25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const tabs = [
    { label: 'Home', path: '/home', icon: homeIcon },
    { 
      label: 'Assignments', 
      path: '/assignments', 
      icon: assignmentsIcon,
      badge: assignmentsCount
    },
    { label: 'Library', path: '/library', icon: libraryIcon, badge: 4 },
    { label: 'AI Toolkit', path: '/toolkit', icon: toolkitIcon },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 flex flex-col gap-3">
      {/* Floating Action Button (FAB) */}
      <div className="flex justify-end pr-1">
        <button
          onClick={() => router.push('/create')}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg border border-gray-150"
          style={{ boxShadow: '0px 32px 48px rgba(0, 0, 0, 0.20), 0px 16px 48px rgba(0, 0, 0, 0.12)' }}
        >
          <div className="w-5 h-5 relative">
            <div className="w-[15px] h-[1.67px] left-[2.5px] top-[9.17px] absolute bg-[#FF5623]" />
            <div className="w-[15px] h-[1.67px] left-[10.83px] top-[2.5px] absolute origin-top-left rotate-90 bg-[#FF5623]" />
          </div>
        </button>
      </div>

      {/* Floating Bottom Navigation Bar */}
      <nav 
        className="h-[72px] px-6 bg-[#181818] rounded-[24px] flex items-center justify-between w-full"
        style={{ boxShadow: '0px 32px 48px rgba(0, 0, 0, 0.20), 0px 16px 48px rgba(0, 0, 0, 0.12)' }}
      >
        {tabs.map((tab, idx) => {
          const isActive = pathname === tab.path || (tab.path !== '/home' && pathname.startsWith(tab.path));
          
          return (
            <Link
              key={idx}
              href={tab.path}
              className="flex flex-col items-center justify-center gap-1 w-16 text-center"
            >
              <div className="relative">
                {/* Custom SVG icon */}
                <div style={{ opacity: isActive ? 1 : 0.25, color: 'white' }}>
                  {tab.icon}
                </div>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <Badge 
                    count={tab.badge} 
                    className="absolute -top-1.5 -right-3 !min-w-4 !h-4 !text-[9px] !px-1 bg-[#FF5623]" 
                  />
                )}
              </div>
              <span 
                className="text-[12px] font-semibold tracking-tight truncate w-full"
                style={{ 
                  color: isActive ? 'white' : 'rgba(255, 255, 255, 0.25)', 
                  fontFamily: 'var(--font-bricolage), sans-serif'
                }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
