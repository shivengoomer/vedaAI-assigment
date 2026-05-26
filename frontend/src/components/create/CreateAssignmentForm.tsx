// src/components/create/CreateAssignmentForm.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStore } from '@/store/formStore';
import { useAssignmentStore } from '@/store/assignmentStore';
import { Assignment } from '@/types/assignment';
import { FileUploadZone } from './FileUploadZone';
import { DueDatePicker } from './DueDatePicker';
import { QuestionTypeTable } from './QuestionTypeTable';
import { ProgressBar } from '../shared/ProgressBar';
import { PillButton } from '../shared/PillButton';
import { validateAssignmentForm, ValidationError } from '@/lib/validators';
import { createAssignment } from '@/lib/api';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { useToastStore } from '@/store/toastStore';

export function CreateAssignmentForm() {
  const router = useRouter();
  const addAssignment = useAssignmentStore((state) => state.addAssignment);
  const { addToast } = useToastStore();
  
  // Zustand form state
  const {
    title,
    subject,
    grade,
    file,
    fileUrl,
    dueDate,
    questionRows,
    additionalInstructions,
    setTitle,
    setSubject,
    setGrade,
    setFile,
    setFileUrl,
    setDueDate,
    addRow,
    removeRow,
    updateRow,
    setInstructions,
    reset
  } = useFormStore();

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mobile step tracker (Step 1: Basic Info & File; Step 2: Questions & Instructions)
  const [mobileStep, setMobileStep] = useState(1);

  // Calculate form completion progress bar percentage
  const progressPercent = useMemo(() => {
    let score = 0;
    if (title.trim() !== '') score += 20;
    if (subject.trim() !== '') score += 20;
    if (grade.trim() !== '') score += 20;
    if (dueDate !== '') score += 20;
    if (file !== null || fileUrl !== null || additionalInstructions.trim() !== '') score += 20;
    return score;
  }, [title, subject, grade, dueDate, file, fileUrl, additionalInstructions]);

  // Question calculations from current rows
  const totalQuestions = useMemo(() => {
    return questionRows.reduce((acc, row) => acc + row.count, 0);
  }, [questionRows]);

  const totalMarks = useMemo(() => {
    return questionRows.reduce((acc, row) => acc + (row.count * row.marks), 0);
  }, [questionRows]);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      title,
      subject,
      grade,
      dueDate,
      questionRows,
      additionalInstructions,
      file,
      fileUrl: fileUrl || undefined,
    };

    const validationErrors = validateAssignmentForm(payload);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      // If there are errors in basic details and we are on mobile step 2, take them back to step 1
      const basicFields = ['title', 'subject', 'grade', 'dueDate'];
      const hasBasicError = validationErrors.some(err => basicFields.includes(err.field));
      if (hasBasicError && mobileStep === 2) {
        setMobileStep(1);
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createAssignment(payload);
      
      // If in simulated offline mode, it adds the pending item directly to assignments store
      if (result.jobId.startsWith('job-')) {
        // We'll read it from localStorage to sync the local Zustand assignment store
        const saved = localStorage.getItem('veda_assignments');
        if (saved) {
          const list: Assignment[] = JSON.parse(saved);
          const pendingItem = list.find((a) => a._id === result.assignmentId);
          if (pendingItem) {
            addAssignment(pendingItem);
          }
        }
      }

      // Reset form on success
      reset();
      
      // Redirect to generation status page
      router.push(`/status/${result.jobId}`);
    } catch (err) {
      console.error(err);
      addToast('Error initiating assignment creation. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getErrorForField = (field: string) => {
    return errors.find(err => err.field === field)?.message;
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5 pb-16 relative z-10">
      
      {/* Page Header (Desktop vs Mobile Figma match) */}
      <div className="md:flex flex-col gap-1 hidden">
        <h2 className="text-[20px] font-bold text-[#303030] font-sans">
          Create Assignment
        </h2>
        <p className="text-[13px] text-gray-500 font-sans">
          Set up a new assignment for your students.
        </p>
      </div>

      {/* Mobile Figma Header */}
      <div className="flex md:hidden items-center justify-between w-full px-1 py-1">
        <button
          type="button"
          onClick={() => {
            if (mobileStep === 2) {
              setMobileStep(1);
            } else {
              router.push('/assignments');
            }
          }}
          className="w-12 h-12 bg-white/25 rounded-full backdrop-blur-md flex items-center justify-center border border-white/25 active:scale-95 transition-all text-[#303030]"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <div className="flex-1 flex justify-center pr-12">
          <span className="text-[16px] font-bold text-[#303030] font-sans">
            Create Assignment
          </span>
        </div>
      </div>

      {/* Progress Bar (Thin, full width, dark, right below page header) */}
      <div className="w-full">
        <ProgressBar progress={progressPercent} className="h-1 bg-gray-200" />
      </div>

      {/* Form Container */}
      <form 
        onSubmit={handleSubmit}
        className="bg-white/50 backdrop-blur-md border border-veda-card-border rounded-[32px] shadow-sm p-6 md:p-8 flex flex-col gap-6"
      >
        
        {/* Validation Errors Header Alert */}
        {errors.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-veda-orange-red font-medium">
            Please correct the errors in the form before generating.
          </div>
        )}

        {/* --- STEP 1: Basic Info & File (Visible always on Desktop, Step 1 on Mobile) --- */}
        <div className={`${mobileStep === 1 ? 'flex' : 'hidden'} md:flex flex-col gap-6`}>
          
          <div className="border-b border-gray-150/50 pb-3 flex flex-col gap-0.5">
            <h3 className="text-[20px] font-bold text-[#303030] font-sans">
              Assignment Details
            </h3>
            <p className="text-[14px] text-gray-500 font-sans">
              Basic information about your assignment
            </p>
          </div>

          {/* Title Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[16px] font-bold text-[#303030] font-sans">
              Assignment Title
            </label>
            <input
              type="text"
              placeholder="e.g. Quiz on Electricity"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-[44px] px-4 text-[16px] font-medium text-[#303030] bg-white placeholder-[#A9A9A9] rounded-full outline-none transition-all font-sans"
              style={{ 
                outline: '1.25px #DADADA solid', 
                outlineOffset: '-1.25px' 
              }}
            />
            {getErrorForField('title') && (
              <span className="text-xs text-veda-orange-red">{getErrorForField('title')}</span>
            )}
          </div>

          {/* Subject & Grade Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Subject */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-bold text-[#303030] font-sans">
                Subject
              </label>
              <input
                type="text"
                placeholder="e.g. Science"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full h-[44px] px-4 text-[16px] font-medium text-[#303030] bg-white placeholder-[#A9A9A9] rounded-full outline-none transition-all font-sans"
                style={{ 
                  outline: '1.25px #DADADA solid', 
                  outlineOffset: '-1.25px' 
                }}
              />
              {getErrorForField('subject') && (
                <span className="text-xs text-veda-orange-red">{getErrorForField('subject')}</span>
              )}
            </div>

            {/* Class/Grade */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-bold text-[#303030] font-sans">
                Class / Grade
              </label>
              <input
                type="text"
                placeholder="e.g. 8th"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full h-[44px] px-4 text-[16px] font-medium text-[#303030] bg-white placeholder-[#A9A9A9] rounded-full outline-none transition-all font-sans"
                style={{ 
                  outline: '1.25px #DADADA solid', 
                  outlineOffset: '-1.25px' 
                }}
              />
              {getErrorForField('grade') && (
                <span className="text-xs text-veda-orange-red">{getErrorForField('grade')}</span>
              )}
            </div>
          </div>

          {/* File Upload Zone */}
          <FileUploadZone 
            selectedFile={file} 
            onFileSelect={setFile} 
            selectedFileUrl={fileUrl}
            onFileUrlSelect={setFileUrl}
          />

          {/* Due Date Picker */}
          <DueDatePicker 
            value={dueDate} 
            onChange={setDueDate} 
          />
          {getErrorForField('dueDate') && (
            <span className="text-xs text-veda-orange-red -mt-4">{getErrorForField('dueDate')}</span>
          )}

        </div>

        {/* --- STEP 2: Questions & Instructions (Visible always on Desktop, Step 2 on Mobile) --- */}
        <div className={`${mobileStep === 2 ? 'flex' : 'hidden'} md:flex flex-col gap-6`}>
          
          <div className="border-b border-gray-150/50 pb-3">
            <h3 className="text-[20px] font-bold text-[#303030] font-sans">
              Question Configuration
            </h3>
            <p className="text-[14px] text-gray-500 font-sans">
              Configure types, question count, and marks per question
            </p>
          </div>

          {/* Question Type Table */}
          <div className="flex flex-col gap-4">
            <QuestionTypeTable
              rows={questionRows}
              onAddRow={addRow}
              onRemoveRow={removeRow}
              onUpdateRow={updateRow}
            />
            {getErrorForField('questionRows') && (
              <span className="text-xs text-veda-orange-red">{getErrorForField('questionRows')}</span>
            )}
          </div>

          {/* Totals Summary */}
          <div className="flex flex-col items-end gap-1 w-full pr-1.5 mt-2 border-t border-gray-150/50 pt-3">
            <div className="text-[16px] font-semibold text-[#303030] font-sans">
              Total Questions :  {totalQuestions}
            </div>
            <div className="text-[16px] font-semibold text-[#303030] font-sans">
              Total Marks :  {totalMarks}
            </div>
          </div>

          {/* Additional Instructions */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center justify-between">
              <label className="text-[16px] font-bold text-[#303030] font-sans">
                Additional Information (For better output)
              </label>
              <span className="text-xs text-veda-text-hint font-sans">
                {additionalInstructions.length}/500 chars
              </span>
            </div>
            
            <div 
              className="w-full p-4 bg-white/25 rounded-[16px] flex flex-col justify-between items-end transition-all relative"
              style={{ 
                height: '102px',
                outline: '1.25px #DADADA solid', 
                outlineOffset: '-1.25px' 
              }}
            >
              <textarea
                placeholder="e.g. Generate a question paper for 3 hour exam duration..."
                maxLength={500}
                value={additionalInstructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full bg-transparent text-[14px] font-medium text-[#303030] placeholder-[#303030]/60 outline-none resize-none font-sans"
                style={{ height: '44px' }}
              />
              
              {/* Circular Send Button Indicator */}
              <div 
                className="w-9 h-9 bg-[#F0F0F0] rounded-full flex items-center justify-center text-[#303030] shadow-sm select-none"
                style={{ boxShadow: '0px 21.8px 32.7px rgba(0, 0, 0, 0.20), 0px 10.9px 32.7px rgba(0, 0, 0, 0.12)' }}
              >
                {/* Custom Send/Arrow SVG */}
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

        </div>

        {/* --- FOOTER NAVIGATION / SUBMIT ACTIONS --- */}
        
        {/* Mobile View Navigation Buttons (Step 1 vs Step 2) */}
        <div className="flex md:hidden items-center justify-center gap-3 border-t border-gray-150/50 pt-4 mt-2">
          {mobileStep === 1 ? (
            <>
              <button
                type="button"
                onClick={() => router.push('/assignments')}
                className="px-6 py-3 text-[16px] font-medium text-[#303030] bg-white rounded-[48px] border border-gray-200 shadow-sm active:scale-95 transition-all font-sans"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setMobileStep(2)}
                className="px-6 py-3 text-[16px] font-medium text-white bg-[#181818] rounded-[48px] active:scale-95 transition-all font-sans"
                style={{ outline: '1.50px white solid', outlineOffset: '-1.50px' }}
              >
                Next
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setMobileStep(1)}
                className="px-6 py-3 text-[16px] font-medium text-[#303030] bg-white rounded-[48px] border border-gray-200 shadow-sm active:scale-95 transition-all font-sans"
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 text-[16px] font-medium text-white bg-[#181818] rounded-[48px] active:scale-95 transition-all disabled:opacity-50 font-sans"
                style={{ outline: '1.50px white solid', outlineOffset: '-1.50px' }}
              >
                {isSubmitting ? 'Generating...' : 'Generate'}
              </button>
            </>
          )}
        </div>

        {/* Desktop View Buttons (Right Aligned) */}
        <div className="hidden md:flex items-center justify-end gap-3 border-t border-gray-100 pt-4 mt-2">
          <button
            type="button"
            onClick={() => router.push('/assignments')}
            className="px-5 py-2.5 text-sm font-semibold text-veda-text-secondary hover:text-veda-text-primary rounded-full transition-all"
          >
            Cancel
          </button>
          
          <PillButton
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            icon={<Sparkles className="w-4 h-4 text-veda-orange animate-pulse" />}
          >
            {isSubmitting ? 'Generating Question Paper...' : 'Generate Question Paper →'}
          </PillButton>
        </div>

      </form>
    </div>
  );
}
