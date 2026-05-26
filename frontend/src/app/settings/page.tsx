// src/app/settings/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { PillButton } from '@/components/shared/PillButton';
import { Settings, User, School, Sparkles, Loader2 } from 'lucide-react';
import { useToastStore } from '@/store/toastStore';
import { useUser } from '@clerk/nextjs';
import { getUserProfile, updateUserProfile } from '@/lib/api';

export default function SettingsPage() {
  const { addToast } = useToastStore();
  const { user: clerkUser } = useUser();
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: ''
  });

  const [school, setSchool] = useState({
    name: '',
    branch: '',
    code: ''
  });

  const [model, setModel] = useState({
    selectedModel: 'gemini-1.5-flash',
    strictNCERT: true,
    creativity: 0.2
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        const fallbackName = clerkUser ? `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() : 'John Doe';
        const fallbackEmail = clerkUser?.emailAddresses[0]?.emailAddress || 'john.doe@dpsbokaro.edu.in';
        
        setProfile({
          name: `${data.firstName || ''} ${data.lastName || ''}`.trim() || fallbackName,
          email: data.email || fallbackEmail,
          role: data.role || 'Senior Science Teacher'
        });

        setSchool({
          name: data.schoolName || 'Delhi Public School',
          branch: data.schoolBranch || 'Bokaro Steel City, Sector-4',
          code: data.schoolCode || 'CBSE-3430015'
        });

        setModel({
          selectedModel: data.aiModel || 'gemini-1.5-flash',
          strictNCERT: data.aiStrictNCERT !== undefined ? data.aiStrictNCERT : true,
          creativity: data.aiCreativity !== undefined ? data.aiCreativity : 0.2
        });
      } catch (err) {
        console.error('Failed to fetch user settings:', err);
        // Fallback to clerk info if API call fails
        if (clerkUser) {
          setProfile({
            name: clerkUser.fullName || '',
            email: clerkUser.emailAddresses[0]?.emailAddress || '',
            role: 'Senior Science Teacher'
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (clerkUser) {
      fetchProfile();
    }
  }, [clerkUser]);

  const handleSaveProfile = async () => {
    try {
      const nameParts = profile.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      await updateUserProfile({
        firstName,
        lastName,
        role: profile.role
      });
      addToast('Successfully saved profile details.', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to save profile details.', 'error');
    }
  };

  const handleSaveSchool = async () => {
    try {
      await updateUserProfile({
        schoolName: school.name,
        schoolBranch: school.branch,
        schoolCode: school.code
      });
      addToast('Successfully saved school organization settings.', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to save school details.', 'error');
    }
  };

  const handleSaveTuning = async () => {
    try {
      await updateUserProfile({
        aiModel: model.selectedModel,
        aiStrictNCERT: model.strictNCERT,
        aiCreativity: model.creativity
      });
      addToast('Successfully saved AI model tuning configurations.', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to save AI configuration.', 'error');
    }
  };

  return (
    <AppShell>
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pb-16">
        
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-[20px] font-bold text-veda-text-primary flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-700" />
            <span>Settings</span>
          </h2>
          <p className="text-[13px] text-veda-text-secondary">
            Configure your personal profile details, school organization information, and AI generation parameters.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-veda-orange animate-spin" />
            <p className="text-sm text-veda-text-secondary font-medium">Loading settings profile...</p>
          </div>
        ) : (
          <>
            {/* Section 1: Teacher Profile Details */}
            <div className="bg-white border border-veda-card-border rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-gray-50 px-5 py-4 border-b border-veda-card-border flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-veda-text-primary">
                  Teacher Profile Details
                </h3>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-500">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="border border-veda-card-border p-2.5 rounded-lg text-veda-text-primary outline-none focus:border-gray-400 font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-500">Email Address (Managed by Clerk)</label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="border border-veda-card-border p-2.5 rounded-lg text-gray-400 bg-gray-50 outline-none cursor-not-allowed font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="font-semibold text-gray-500">Professional Role</label>
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="border border-veda-card-border p-2.5 rounded-lg text-veda-text-primary outline-none focus:border-gray-400 font-sans w-full"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end mt-2">
                  <PillButton
                    variant="primary"
                    className="text-xs !py-2"
                    onClick={handleSaveProfile}
                  >
                    Save Profile
                  </PillButton>
                </div>
              </div>
            </div>

            {/* Section 2: School Organization Settings */}
            <div className="bg-white border border-veda-card-border rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-gray-50 px-5 py-4 border-b border-veda-card-border flex items-center gap-2">
                <School className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-veda-text-primary">
                  School Organization settings
                </h3>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-500">School Identity Name</label>
                  <input
                    type="text"
                    value={school.name}
                    onChange={(e) => setSchool({ ...school, name: e.target.value })}
                    className="border border-veda-card-border p-2.5 rounded-lg text-veda-text-primary outline-none focus:border-gray-400 font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-500">Branch Location</label>
                  <input
                    type="text"
                    value={school.branch}
                    onChange={(e) => setSchool({ ...school, branch: e.target.value })}
                    className="border border-veda-card-border p-2.5 rounded-lg text-veda-text-primary outline-none focus:border-gray-400 font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="font-semibold text-gray-500">CBSE Affiliation / Accreditation Code</label>
                  <input
                    type="text"
                    value={school.code}
                    onChange={(e) => setSchool({ ...school, code: e.target.value })}
                    className="border border-veda-card-border p-2.5 rounded-lg text-veda-text-primary outline-none focus:border-gray-400 font-sans w-full"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end mt-2">
                  <PillButton
                    variant="primary"
                    className="text-xs !py-2"
                    onClick={handleSaveSchool}
                  >
                    Save School Info
                  </PillButton>
                </div>
              </div>
            </div>

            {/* Section 3: AI Generation & Model Tuning */}
            <div className="bg-white border border-veda-card-border rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-gray-50 px-5 py-4 border-b border-veda-card-border flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-veda-orange" />
                <h3 className="text-sm font-bold text-veda-text-primary">
                  AI Generation & Model Tuning
                </h3>
              </div>
              <div className="p-5 flex flex-col gap-5 font-sans text-xs">
                {/* Model select */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-500">Selected LLM Model Engine</label>
                  <select
                    value={model.selectedModel}
                    onChange={(e) => setModel({ ...model, selectedModel: e.target.value })}
                    className="border border-veda-card-border p-2.5 rounded-lg text-veda-text-primary outline-none focus:border-gray-400 bg-white"
                  >
                    <option value="gemini-1.5-flash">Gemini 1.5 Flash (Recommended - Fastest and cost-effective)</option>
                    <option value="gemini-1.5-pro">Gemini 1.5 Pro (Best reasoning for complex Science/Maths)</option>
                    <option value="gpt-4o">GPT-4o (Standard multimodal capabilities)</option>
                  </select>
                </div>

                {/* Strict NCERT Toggle */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex flex-col gap-0.5 max-w-md">
                    <span className="font-bold text-veda-text-primary">Strict NCERT Syllabus Constraint</span>
                    <p className="text-[11px] text-veda-text-secondary leading-relaxed">
                      When enabled, the AI will reject questions referencing terms or contexts not covered in class textbooks.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={model.strictNCERT}
                      onChange={(e) => setModel({ ...model, strictNCERT: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-veda-orange"></div>
                  </label>
                </div>

                {/* Creativity/Temperature slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-veda-text-primary">Model Temperature (Creativity)</span>
                      <span className="text-[11px] text-veda-text-secondary">Low temperature produces factual, standard exam structures.</span>
                    </div>
                    <span className="font-extrabold text-veda-orange">{model.creativity}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={model.creativity}
                    onChange={(e) => setModel({ ...model, creativity: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-veda-orange"
                  />
                </div>

                <div className="flex justify-end mt-2">
                  <PillButton
                    variant="primary"
                    className="text-xs !py-2"
                    onClick={handleSaveTuning}
                  >
                    Save Tuning Profile
                  </PillButton>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </AppShell>
  );
}
