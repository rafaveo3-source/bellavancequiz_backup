import React from 'react';

export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  INPUT_NUMBER = 'INPUT_NUMBER',
  LEAD_CAPTURE = 'LEAD_CAPTURE',
  INFO = 'INFO' // New type for scientific/educational interstitials
}

export interface Option {
  id: string;
  label: string;
  icon?: React.ReactNode;
  image?: string;
  description?: string; // Context for Info Modal
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string; // Used as Headline for INFO
  subtext?: string; // Used as Body Text for INFO
  infoImage?: string; // Specific image for INFO screens
  options?: Option[];
  inputPlaceholder?: string;
  inputUnit?: string;
  min?: number;
  max?: number;
}

export interface QuizState {
  answers: Record<string, any>;
  currentStepIndex: number;
  isCalculating: boolean;
  showVSL: boolean;
  userName?: string;
}