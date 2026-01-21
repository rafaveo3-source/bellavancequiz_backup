import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, ScanSearch, FileSearch, Fingerprint } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { text: "Conectando ao banco de dados...", icon: <Fingerprint className="w-5 h-5" /> },
    { text: "Analisando perfil metabólico...", icon: <ScanSearch className="w-5 h-5" /> },
    { text: "Identificando tipo de gordura...", icon: <FileSearch className="w-5 h-5" /> },
    { text: "Gerando protocolo personalizado...", icon: <CheckCircle2 className="w-5 h-5" /> }
  ];

  useEffect(() => {
    // Total duration approx 4 seconds
    const totalDuration = 4000;
    const intervalTime = 50;
    const stepsCount = steps.length;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (totalDuration / intervalTime));
        
        // Calculate which text step should be active based on progress
        const stepIndex = Math.floor((newProgress / 100) * stepsCount);
        if (stepIndex < stepsCount) {
          setCurrentStep(stepIndex);
        }
        
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Radius adjusted to 58 to prevent clipping (128 width/height, 8 stroke = 4px padding needed)
  // Circumference = 2 * PI * 58 ≈ 364.4 -> 365
  const circumference = 365;

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in w-full">
      
      {/* Circular Progress */}
      <div className="relative mb-10 w-32 h-32 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="58" stroke="#f5f5f4" strokeWidth="8" fill="none" />
            <circle 
                cx="64" cy="64" r="58" 
                stroke="#C5A059" 
                strokeWidth="8" 
                fill="none" 
                strokeDasharray={circumference} 
                strokeDashoffset={circumference - (circumference * progress) / 100}
                strokeLinecap="round"
                className="transition-all duration-200 ease-linear"
            />
        </svg>
        <div className="flex flex-col items-center justify-center text-bellavance-teal">
             <span className="text-2xl font-bold font-serif">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Dynamic Text */}
      <div className="h-16 flex flex-col items-center justify-center mb-8">
        <p className="text-lg font-bold text-stone-800 animate-pulse font-serif">
            {progress >= 100 ? "Concluído!" : steps[currentStep]?.text}
        </p>
      </div>

      {/* Checklist */}
      <div className="w-full max-w-xs space-y-3">
        {steps.map((step, idx) => (
            <div 
                key={idx} 
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-500 ${
                    idx < currentStep || progress >= 100
                        ? 'bg-green-50 border-green-100 text-stone-800 opacity-100' 
                        : idx === currentStep 
                            ? 'bg-white border-bellavance-gold text-stone-800 opacity-100 scale-105 shadow-sm'
                            : 'bg-stone-50 border-transparent text-stone-300 opacity-50'
                }`}
            >
                <div className={`transition-all duration-300 ${idx <= currentStep ? 'text-bellavance-teal' : 'text-stone-300'}`}>
                    {idx < currentStep || progress >= 100 ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : step.icon}
                </div>
                <span className="text-sm font-medium">{step.text}</span>
            </div>
        ))}
      </div>

    </div>
  );
};

export default LoadingScreen;