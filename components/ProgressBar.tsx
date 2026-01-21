import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden shadow-inner">
      <div 
        className="h-full bg-gradient-to-r from-bellavance-teal to-bellavance-tealDark transition-all duration-700 ease-out shadow-[0_0_10px_rgba(42,157,143,0.4)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;