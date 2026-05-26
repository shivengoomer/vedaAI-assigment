// src/components/assignments/EmptyState.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export function EmptyState() {
  const router = useRouter();

  return (
    <div className="w-full bg-white border border-veda-card-border rounded-2xl p-8 md:p-16 flex flex-col items-center justify-center min-h-[70vh] text-center shadow-sm">
      <div className="flex flex-col items-center gap-8 max-w-[420px]">
        {/* Figma Illustration */}
        <div data-illustration-type="Illustration found" data-theme="Accent" style={{width: 220, height: 220, position: 'relative', overflow: 'hidden'}} className="mx-auto select-none">
          <div style={{width: 176, height: 176, left: 22, top: 21.27, position: 'absolute', background: 'linear-gradient(180deg, #F2F2F2 0%, #EFEFEF 100%)'}} />
          <div style={{width: 91.33, height: 113.69, left: 65.27, top: 46.61, position: 'absolute', background: 'white', boxShadow: '0px 14.666666984558105px 22px rgba(145.56, 145.56, 145.56, 0.19)', borderRadius: 11.73}} />
          <div style={{width: 73.33, height: 88.73, left: 73.33, top: 61.27, position: 'absolute', borderRadius: 11.73, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 13.20, display: 'inline-flex'}}>
            <div style={{width: 36.67, flex: '1 1 0', background: '#011625', borderRadius: 73.33}} />
            <div style={{alignSelf: 'stretch', flex: '1 1 0', background: '#D4D4D4', borderRadius: 73.33}} />
            <div style={{alignSelf: 'stretch', flex: '1 1 0', background: '#D4D4D4', borderRadius: 73.33}} />
            <div style={{alignSelf: 'stretch', flex: '1 1 0', background: '#D4D4D4', borderRadius: 73.33}} />
            <div style={{alignSelf: 'stretch', flex: '1 1 0', background: '#D4D4D4', borderRadius: 73.33}} />
          </div>
          <div style={{width: 51.49, height: 29.62, left: 163.53, top: 34.04, position: 'absolute', background: 'white', boxShadow: '4.400000095367432px 2.933333396911621px 9.533333778381348px rgba(26.68, 118.73, 139.19, 0.09)'}} />
          <div style={{width: 8.80, height: 8.80, left: 170.13, top: 44.73, position: 'absolute', background: '#CCC6D9'}} />
          <div style={{width: 23.47, height: 8.80, left: 184.80, top: 44.73, position: 'absolute', background: '#D4D4D4', borderRadius: 73.33}} />
          <div style={{width: 79.93, height: 79.20, left: 96.07, top: 79.93, position: 'absolute', background: 'rgba(255, 255, 255, 0.30)', backdropFilter: 'blur(2.93px)'}} />
          <div style={{width: 36.67, height: 36.67, left: 117.33, top: 101.20, position: 'absolute', background: '#FF4040'}} />
          <div style={{width: 20.19, height: 6.91, left: 191.11, top: 188.89, position: 'absolute', transform: 'rotate(-49deg)', transformOrigin: 'top left', background: '#E1DCEB'}} />
          <div style={{width: 60.13, height: 54.02, left: 5.13, top: 44.42, position: 'absolute', background: '#011625'}} />
          <div style={{width: 8.80, height: 8.80, left: 204.60, top: 130.53, position: 'absolute', background: '#417BA4', borderRadius: 9999}} />
          <div style={{width: 16.78, height: 18.34, left: 40.78, top: 157.10, position: 'absolute', background: '#417BA4'}} />
        </div>

        {/* Text Area */}
        <div className="flex flex-col gap-3">
          <h3 className="text-center text-[#303030] text-[20px] font-bold leading-7 font-sans">
            No assignments yet
          </h3>
          <p className="text-center text-[#5E5E5E] text-[16px] font-normal leading-relaxed font-sans">
            Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => router.push('/create')}
          className="pl-6 pr-6 pt-3 pb-3 bg-[#181818] text-white rounded-[48px] flex items-center justify-center gap-2 border-[1.5px] border-white hover:bg-black active:scale-95 transition-all shadow-sm"
          style={{ outline: '1.50px white solid', outlineOffset: '-1.50px' }}
        >
          <div className="w-5 h-5 relative">
            <div className="w-[15px] h-[1.67px] left-[2.5px] top-[9.17px] absolute bg-white" />
            <div className="w-[15px] h-[1.67px] left-[10.83px] top-[2.5px] absolute origin-top-left rotate-90 bg-white" />
          </div>
          <span className="text-[16px] font-medium font-sans">
            Create Your First Assignment
          </span>
        </button>
      </div>
    </div>
  );
}
