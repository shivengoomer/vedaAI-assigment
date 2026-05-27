// src/components/layout/MobileBottomNav.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

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
      <path fillRule="evenodd" clipRule="evenodd" d="M10 2.08335C10 1.85324 9.81349 1.66669 9.58337 1.66669H6.66671C4.82576 1.66669 3.33337 3.15907 3.33337 5.00002V15C3.33337 16.841 4.82576 18.3334 6.66671 18.3334H13.3334C15.1743 18.3334 16.6667 16.841 16.6667 15V8.75002C16.6667 8.5199 16.4802 8.33335 16.25 8.33335H14.1667C11.8655 8.33335 10 6.46787 10 4.16669V2.08335ZM16.0162 6.66669C16.2933 6.66669 16.4925 6.39913 16.3594 6.15611C16.2464 5.94976 16.1038 5.75862 15.9345 5.58928L12.7441 2.39892C12.5748 2.22957 12.3836 2.08703 12.1773 1.97402C11.9343 1.84093 11.6667 2.04006 11.6667 2.31714V4.16669C11.6667 5.5474 12.786 6.66669 14.1667 6.66669H16.0162ZM10 9.16669C10.4603 9.16669 10.8334 9.53978 10.8334 10V11.6667H12.5C12.9603 11.6667 13.3334 12.0398 13.3334 12.5C13.3334 12.9603 12.9603 13.3334 12.5 13.3334H10.8334V15C10.8334 15.4603 10.4603 15.8334 10 15.8334C9.5398 15.8334 9.16671 15.4603 9.16671 15V13.3334H7.50004C7.0398 13.3334 6.66671 12.9603 6.66671 12.5C6.66671 12.0398 7.0398 11.6667 7.50004 11.6667H9.16671V10C9.16671 9.53978 9.5398 9.16669 10 9.16669Z" fill="currentColor"/>
    </svg>
  );

  const toolkitIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.63783 8.63783L6.18377 4H7.13246L8.6784 8.63783L13.3162 10.1838V11.1325L8.6784 12.6784L7.13246 17.3162H6.18377L4.63783 12.6784L0 11.1325V10.1838L4.63783 8.63783Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M13.3878 2.38783L14.1838 0H15.1325L15.9284 2.38783L18.3162 3.18377V4.13246L15.9284 4.9284L15.1325 7.31623H14.1838L13.3878 4.9284L11 4.13246V3.18377L13.3878 2.38783Z" fill="currentColor"/>
    </svg>
  );

  const tabs = [
    { label: 'Home', path: '/home', icon: homeIcon },
    { 
      label: 'Assignments', 
      path: '/assignments', 
      icon: assignmentsIcon
    },
    { label: 'Library', path: '/library', icon: libraryIcon },
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
