import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileBottomNav } from './MobileBottomNav';
import { X, Home, Users, ClipboardList, Cpu, BookOpen, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfileStore } from '@/store/profileStore';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { profile, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const mobileDrawerItems = [
    { label: 'Home', path: '/home', icon: <Home className="w-5 h-5" /> },
    { label: 'My Groups', path: '/groups', icon: <Users className="w-5 h-5" /> },
    { label: 'Assignments', path: '/assignments', icon: <ClipboardList className="w-5 h-5" /> },
    { label: "AI Teacher's Toolkit", path: '/toolkit', icon: <Cpu className="w-5 h-5" /> },
    { label: 'My Library', path: '/library', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-veda-bg text-veda-text-primary overflow-auto font-sans">
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <div className="hidden md:flex h-full items-stretch pt-3 pl-3 pb-3 flex-shrink-0 relative z-30">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 h-full min-w-0 p-3 gap-3">
        <TopBar 
          onMenuToggle={() => setMobileMenuOpen(true)} 
        />
        
        <AnimatePresence mode="wait">
          <motion.main 
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex-1 overflow-y-auto no-scrollbar"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        {/* Mobile Bottom Navigation (Hidden on Desktop) */}
        <MobileBottomNav />

        {/* Mobile Menu Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity">
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-white p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-veda-card-border pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <rect width="28" height="28" rx="7" fill="#303030"/>
                        <path fill-rule="evenodd" clipRule="evenodd" d="M15.9091 19.8507C15.9091 19.8507 16.4184 21.2101 16.885 21.2952H10.988C9.80005 21.2952 8.7397 20.6155 8.40001 19.3409L4.96371 9.14447C4.96371 9.14447 4.66688 7.91238 4.2002 7.7H10.2245C11.4125 7.74254 12.2185 8.16731 12.6852 9.7394L15.9091 19.8507Z" fill="white"/>
                        <path opacity="0.2" fill-rule="evenodd" clipRule="evenodd" d="M15.9091 19.8507C15.9091 19.8507 16.4184 21.2101 16.885 21.2952H10.988C9.80005 21.2952 8.7397 20.6155 8.40001 19.3409L4.96371 9.14447C4.96371 9.14447 4.66688 7.91238 4.2002 7.7H10.2245C11.4125 7.74254 12.2185 8.16731 12.6852 9.7394L15.9091 19.8507Z" fill="url(#paint0_linear_2_10188)"/>
                        <path fill-rule="evenodd" clipRule="evenodd" d="M12.1336 19.8509C12.1336 19.8509 11.6244 21.2103 11.1577 21.2954H17.0547C18.2427 21.2954 19.303 20.6157 19.6427 19.3411L23.0368 9.14499C23.0368 9.14499 23.3336 7.9129 23.8003 7.70052H17.8182C16.6303 7.70052 15.8668 8.12529 15.4001 9.69738L12.1336 19.8509Z" fill="white"/>
                        <defs>
                          <linearGradient id="paint0_linear_2_10188" x1="10.5426" y1="6.54426" x2="10.5426" y2="22.4936" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" stop-opacity="0"/>
                            <stop offset="0.33" stop-color="white" stop-opacity="0"/>
                            <stop offset="0.76" stop-color="#0E1513"/>
                            <stop offset="1" stop-color="#0E1513"/>
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
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <X className="w-6 h-6 text-veda-text-secondary" />
                  </button>
                </div>
                
                <nav className="flex flex-col gap-3">
                  {mobileDrawerItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-veda-text-secondary hover:text-veda-text-primary py-2 text-sm font-medium transition-colors"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="border-t border-veda-card-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-veda-orange text-white flex items-center justify-center font-bold text-xs uppercase">
                    {profile?.schoolName ? profile.schoolName.substring(0, 2) : 'DP'}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-veda-text-primary truncate">
                      {profile?.schoolName || 'Delhi Public School'}
                    </span>
                    <span className="text-[10px] text-veda-text-secondary truncate">
                      {profile?.schoolBranch || 'Bokaro Steel City'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
