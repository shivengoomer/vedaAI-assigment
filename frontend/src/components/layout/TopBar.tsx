// src/components/layout/TopBar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, ChevronDown, Menu, ArrowLeft, LayoutGrid, Sparkle } from 'lucide-react';
import { Badge } from '../shared/Badge';
import { useNotificationStore } from '@/store/notificationStore';
import { NotificationPanel } from './NotificationPanel';

import { useUser, useClerk } from '@clerk/nextjs';

interface TopBarProps {
  onMenuToggle?: () => void;
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();
  const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'User' : 'John Doe';

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [wasSignedIn, setWasSignedIn] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        setWasSignedIn(true);
      } else if (wasSignedIn) {
        setIsLoggingOut(true);
      }
    }
  }, [isLoaded, isSignedIn, wasSignedIn]);

  const { unreadCount, fetchNotifications } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
    // Poll for notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Check if we are in the Create flow to display "Create New" with Sparkle icon
  const isCreateFlow = pathname.includes('/create') || pathname.includes('/status') || pathname.includes('/result');
  const titleText = isCreateFlow ? 'Create New' : 'Assignment';

  // Back navigation path helper
  const handleBack = () => {
    if (pathname === '/assignments') {
      router.push('#'); // assignments list doesn't need to go back, but can reload
    } else {
      router.push('/assignments');
    }
  };

  return (
    <>
      <header 
        className="flex items-center justify-between rounded-[16px] bg-white md:bg-white/75 border border-veda-card-border z-30 shadow-sm mx-auto w-full max-w-[373px] md:max-w-[1100px] h-[56px] pl-[12px] pr-[16px] md:pl-[24px] md:pr-[12px] gap-[10px] shrink-0"
      >
        {/* 1. Desktop Left Title Area (Circular back button + Icon + Title) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Circular Back Button (Figma Match) */}
          <button
            onClick={handleBack}
            className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
  
          {/* Dynamic Page Icon + Title */}
          <div className="flex items-center gap-2 text-veda-text-primary ml-1">
            {isCreateFlow ? (
              <Sparkle className="w-5 h-5 text-veda-orange fill-veda-orange" />
            ) : (
              <LayoutGrid className="w-5 h-5 text-gray-700" />
            )}
            <span className="text-[14px] font-bold text-gray-500 tracking-tight">
              {titleText}
            </span>
          </div>
        </div>
  
        {/* 2. Mobile Left Brand Area (Logo + Brand Name) */}
        <div className="flex md:hidden items-center gap-2">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="7" fill="#303030"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M15.9091 19.8507C15.9091 19.8507 16.4184 21.2101 16.885 21.2952H10.988C9.80005 21.2952 8.7397 20.6155 8.40001 19.3409L4.96371 9.14447C4.96371 9.14447 4.66688 7.91238 4.2002 7.7H10.2245C11.4125 7.74254 12.2185 8.16731 12.6852 9.7394L15.9091 19.8507Z" fill="white"/>
              <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M15.9091 19.8507C15.9091 19.8507 16.4184 21.2101 16.885 21.2952H10.988C9.80005 21.2952 8.7397 20.6155 8.40001 19.3409L4.96371 9.14447C4.96371 9.14447 4.66688 7.91238 4.2002 7.7H10.2245C11.4125 7.74254 12.2185 8.16731 12.6852 9.7394L15.9091 19.8507Z" fill="url(#paint0_linear_2_10188)"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M12.1336 19.8509C12.1336 19.8509 11.6244 21.2103 11.1577 21.2954H17.0547C18.2427 21.2954 19.303 20.6157 19.6427 19.3411L23.0368 9.14499C23.0368 9.14499 23.3336 7.9129 23.8003 7.70052H17.8182C16.6303 7.70052 15.8668 8.12529 15.4001 9.69738L12.1336 19.8509Z" fill="white"/>
              <defs>
                <linearGradient id="paint0_linear_2_10188" x1="10.5426" y1="6.54426" x2="10.5426" y2="22.4936" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0"/>
                  <stop offset="0.33" stopColor="white" stopOpacity="0"/>
                  <stop offset="0.76" stopColor="#0E1513"/>
                  <stop offset="1" stopColor="#0E1513"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span
            style={{
              color: 'var(--Text-Primary, #303030)',
              fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", sans-serif',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '140%',
              letterSpacing: '-1.2px',
            }}
          >
            VedaAI
          </span>
        </div>
  
        {/* 3. Desktop Right Side Icons & Profile */}
        <div className="hidden md:flex items-center gap-4">
          {/* Notification Bell */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 rounded-full transition-colors text-gray-600 ${showNotifications ? 'bg-gray-150' : 'hover:bg-gray-150'}`}
            >
              <Bell className="w-5 h-5" />
              {/* Red notification dot */}
              {unreadCount > 0 && (
                <Badge 
                  count={unreadCount} 
                  className="absolute -top-0.5 -right-0.5" 
                />
              )}
            </button>
  
            {showNotifications && (
              <NotificationPanel onClose={() => setShowNotifications(false)} />
            )}
          </div>
  
          {/* Desktop Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2.5 hover:bg-gray-50 p-1.5 rounded-lg transition-all"
            >
              {/* Custom Yellow Avatar or Clerk User Image */}
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 flex items-center justify-center bg-gray-50">
                {user?.imageUrl ? (
                  <img src={user.imageUrl} alt={userName} className="w-full h-full object-cover" />
                ) : (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="16" fill="#FDE68A" />
                    <circle cx="16" cy="15" r="7" fill="#D97706" />
                    <circle cx="13" cy="14" r="2.5" fill="#FEE2E2" />
                    <circle cx="19" cy="14" r="2.5" fill="#FEE2E2" />
                    <circle cx="13" cy="14" r="0.75" fill="#111111" />
                    <circle cx="19" cy="14" r="0.75" fill="#111111" />
                    <rect x="11" y="12.5" width="4.5" height="3" rx="1" stroke="#111111" strokeWidth="1" fill="transparent" />
                    <rect x="16.5" y="12.5" width="4.5" height="3" rx="1" stroke="#111111" strokeWidth="1" fill="transparent" />
                    <line x1="15.5" y1="14" x2="16.5" y2="14" stroke="#111111" strokeWidth="1" />
                    <path d="M14 18C14 18 15 19 16 19C17 19 18 18 18 18" stroke="#111111" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              
              <span className="text-sm font-semibold text-veda-text-primary">{userName}</span>
              <ChevronDown className="w-4 h-4 text-veda-text-secondary" />
            </button>
  
            {/* Simple Dropdown Menu */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-veda-card-border rounded-xl shadow-lg py-2 z-50">
                <Link href="/settings" className="block px-4 py-2 text-sm text-veda-text-primary hover:bg-gray-50" onClick={() => setShowUserDropdown(false)}>My Profile</Link>
                <Link href="/billing" className="block px-4 py-2 text-sm text-veda-text-primary hover:bg-gray-50" onClick={() => setShowUserDropdown(false)}>Billing</Link>
                <div className="border-t border-veda-card-border my-1"></div>
                <button 
                  onClick={async () => {
                    setShowUserDropdown(false);
                    setIsLoggingOut(true);
                    await signOut();
                    router.push('/sign-in');
                  }}
                  className="w-full text-left block px-4 py-2 text-sm text-veda-orange-red hover:bg-gray-50 font-medium"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
  
        {/* 4. Mobile Right Side Icons & Profile (Bell icon, User avatar, Hamburger icon) */}
        <div className="flex md:hidden items-center gap-4">
          {/* Mobile Notification Bell */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex-shrink-0 relative p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 flex-shrink-0">
                <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {/* Red notification dot */}
              {unreadCount > 0 && (
                <Badge 
                  dot={true} 
                  className="absolute -top-0.5 -right-0.5" 
                />
              )}
            </button>
  
            {showNotifications && (
              <NotificationPanel onClose={() => setShowNotifications(false)} />
            )}
          </div>
  
          {/* Mobile User Avatar */}
          <div className="flex w-8 h-8 rounded-full overflow-hidden border border-gray-200 bg-[#F6F6F6] justify-center items-center gap-[10px] aspect-square flex-shrink-0">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#FDE68A" />
                <circle cx="12" cy="11.25" r="5.25" fill="#D97706" />
                <circle cx="9.75" cy="10.5" r="1.875" fill="#FEE2E2" />
                <circle cx="14.25" cy="10.5" r="1.875" fill="#FEE2E2" />
                <circle cx="9.75" cy="10.5" r="0.56" fill="#111111" />
                <circle cx="14.25" cy="10.5" r="0.56" fill="#111111" />
                <rect x="8.25" y="9.375" width="3.375" height="2.25" rx="0.75" stroke="#111111" strokeWidth="0.75" fill="transparent" />
                <rect x="12.375" y="9.375" width="3.375" height="2.25" rx="0.75" stroke="#111111" strokeWidth="0.75" fill="transparent" />
                <line x1="11.625" y1="10.5" x2="12.375" y2="10.5" stroke="#111111" strokeWidth="0.75" />
                <path d="M10.5 13.5C10.5 13.5 11.25 14.25 12 14.25C12.75 14.25 13.5 13.5 13.5 13.5" stroke="#111111" strokeWidth="0.75" strokeLinecap="round" />
              </svg>
            )}
          </div>
  
          {/* Hamburger Menu (Mobile Only) */}
          <button 
            onClick={onMenuToggle}
            className="p-1 rounded hover:bg-gray-100 transition-colors text-veda-text-primary flex-shrink-0"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {isLoggingOut && (
        <div 
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center transition-all duration-300 animate-in fade-in"
          style={{
            background: 'linear-gradient(176deg, rgba(234, 234, 234, 0.00) 3.17%, #DADADA 81.22%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex flex-col items-center gap-6 animate-pulse">
            <div className="w-16 h-16 bg-[#303030] rounded-2xl flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 28 28" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.9091 19.8507C15.9091 19.8507 16.4184 21.2101 16.885 21.2952H10.988C9.80005 21.2952 8.7397 20.6155 8.40001 19.3409L4.96371 9.14447C4.96371 9.14447 4.66688 7.91238 4.2002 7.7H10.2245C11.4125 7.74254 12.2185 8.16731 12.6852 9.7394L15.9091 19.8507Z" fill="white"/>
                <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M15.9091 19.8507C15.9091 19.8507 16.4184 21.2101 16.885 21.2952H10.988C9.80005 21.2952 8.7397 20.6155 8.40001 19.3409L4.96371 9.14447C4.96371 9.14447 4.66688 7.91238 4.2002 7.7H10.2245C11.4125 7.74254 12.2185 8.16731 12.6852 9.7394L15.9091 19.8507Z" fill="url(#paint0_linear_2_10188_logout)"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M12.1336 19.8509C12.1336 19.8509 11.6244 21.2103 11.1577 21.2954H17.0547C18.2427 21.2954 19.303 20.6157 19.6427 19.3411L23.0368 9.14499C23.0368 9.14499 23.3336 7.9129 23.8003 7.70052H17.8182C16.6303 7.70052 15.8668 8.12529 15.4001 9.69738L12.1336 19.8509Z" fill="white"/>
                <defs>
                  <linearGradient id="paint0_linear_2_10188_logout" x1="10.5426" y1="6.54426" x2="10.5426" y2="22.4936" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0"/>
                    <stop offset="0.33" stopColor="white" stopOpacity="0"/>
                    <stop offset="0.76" stopColor="#0E1513"/>
                    <stop offset="1" stopColor="#0E1513"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl font-bold text-gray-800">Logging out</span>
              <span className="text-sm text-gray-500">Securing your session...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
