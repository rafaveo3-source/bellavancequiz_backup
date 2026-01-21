
import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { QuizState, QuestionType } from './types';
import QuizStep from './components/QuizStep';
import ProgressBar from './components/ProgressBar';
import LoadingScreen from './components/LoadingScreen';
import VSLPage from './components/VSLPage';
import { ChevronLeft } from 'lucide-react';

// Logo SVG Component
const Logo: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-2">
    <div className="text-2xl font-serif text-stone-800 tracking-widest font-bold">
      Bellavance
    </div>
    <div className="text-[0.6rem] tracking-[0.3em] text-bellavance-gold uppercase mt-1">
      Estética Facial • Corporal
    </div>
  </div>
);

const STORAGE_KEY = 'bellavance_quiz_progress';

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>(() => {
    // Initialize from local storage if available
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
    return {
      answers: {},
      currentStepIndex: 0,
      isCalculating: false,
      showVSL: false,
      userName: ''
    };
  });

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const currentQuestion = QUESTIONS[state.currentStepIndex];
  const progress = ((state.currentStepIndex + 1) / QUESTIONS.length) * 100;

  const handleAnswer = (value: any) => {
    const isLastQuestion = state.currentStepIndex === QUESTIONS.length - 1;
    
    // Check if we captured a user name (from Lead Capture step)
    let updatedName = state.userName;
    if (currentQuestion.type === QuestionType.LEAD_CAPTURE && typeof value === 'object') {
        updatedName = value.name;
    }

    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [currentQuestion.id]: value },
      userName: updatedName
    }));

    if (isLastQuestion) {
      setState((prev) => ({ ...prev, isCalculating: true, userName: updatedName }));
    } else {
      // Small delay for visual feedback before transition
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          currentStepIndex: prev.currentStepIndex + 1,
        }));
      }, 300);
    }
  };

  const handleBack = () => {
    if (state.currentStepIndex > 0) {
        setState(prev => ({
            ...prev,
            currentStepIndex: prev.currentStepIndex - 1
        }));
    }
  };

  const handleLoadingComplete = () => {
    setState((prev) => ({
      ...prev,
      isCalculating: false,
      showVSL: true,
    }));
  };

  const handleBackToQuiz = () => {
    setState(prev => ({
      ...prev,
      showVSL: false,
      isCalculating: false
    }));
  };

  // If showing VSL, render only VSL page
  if (state.showVSL) {
    return <VSLPage userName={state.userName} onBack={handleBackToQuiz} />;
  }

  // If calculating, show loading screen
  if (state.isCalculating) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col relative animate-fade-in my-8">
          <header className="p-4 bg-white border-b border-stone-100 flex justify-center rounded-t-2xl">
            <Logo />
          </header>
          <div className="flex-1">
            <LoadingScreen onComplete={handleLoadingComplete} />
          </div>
        </div>
      </div>
    );
  }

  // Quiz Interface
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-2 md:p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden min-h-[500px] md:min-h-[600px] flex flex-col relative animate-fade-in">
        
        {/* Header */}
        <header className="px-4 md:px-6 py-4 bg-white border-b border-stone-100 z-10 relative">
          {state.currentStepIndex > 0 && (
              <button 
                onClick={handleBack}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-bellavance-teal transition-colors rounded-full hover:bg-stone-50"
              >
                  <ChevronLeft className="w-6 h-6" />
              </button>
          )}
          <Logo />
          <div className="mt-4">
            <ProgressBar progress={progress} />
            <div className="flex justify-between mt-2 text-xs text-stone-400 font-medium">
              <span>Passo {state.currentStepIndex + 1}</span>
              <span>de {QUESTIONS.length}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 flex flex-col justify-center">
          <QuizStep 
            key={state.currentStepIndex} // Force re-render on step change for animation
            question={currentQuestion}
            onAnswer={handleAnswer}
            allAnswers={state.answers}
          />
        </main>

        {/* Footer Info */}
        <footer className="p-4 text-center">
          <p className="text-[10px] text-stone-300 uppercase tracking-wider flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Ambiente Seguro e Privado
          </p>
        </footer>

        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-bellavance-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-bellavance-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      </div>
    </div>
  );
};

export default App;
