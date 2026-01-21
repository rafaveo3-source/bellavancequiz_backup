
import React, { useState } from 'react';
import { Question, QuestionType, Option } from '../types';
import { ChevronRight, User, Phone, Info, AlertCircle, Microscope, X, Sparkles, Scale, AlertTriangle } from 'lucide-react';

interface QuizStepProps {
  question: Question;
  onAnswer: (value: any) => void;
  allAnswers?: Record<string, any>;
}

const QuizStep: React.FC<QuizStepProps> = ({ question, onAnswer, allAnswers = {} }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', phone: '' });
  
  // Modal State
  const [selectedInfoOption, setSelectedInfoOption] = useState<Option | null>(null);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue) {
      onAnswer(parseFloat(inputValue));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone.length >= 14) {
      onAnswer(formData);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    // Mask logic for (DD) 9XXXX-XXXX
    if (value.length > 10) {
      // 11 digits: (XX) XXXXX-XXXX
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 6) {
      // 7-10 digits: (XX) XXXX-XXXX (Partial)
      value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else if (value.length > 2) {
      // 3-6 digits: (XX) ...
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const renderInfoStep = () => {
    // Dynamic BMI Calculation Logic
    if (question.id === 'bmi_diagnosis') {
        const weight = parseFloat(allAnswers['weight_current'] || 0);
        const height = parseFloat(allAnswers['height'] || 0);
        
        let bmi = 0;
        let diagnosis = "";
        let colorClass = "text-stone-800";
        let icon = <Scale className="w-12 h-12 text-bellavance-teal" />;

        if (weight > 0 && height > 0) {
            // Handle height input in cm (e.g., 165) vs meters (e.g., 1.65)
            const h = height > 3 ? height / 100 : height; 
            bmi = weight / (h * h);
            
            if (bmi < 18.5) {
                diagnosis = "Apesar do peso baixo, a gordura localizada persiste devido à sua estrutura compacta.";
                colorClass = "text-blue-600";
            } else if (bmi < 24.9) {
                diagnosis = "Seu peso está ideal, mas a 'pochete' ou gordura localizada distorce sua harmonia corporal.";
                colorClass = "text-green-600";
            } else if (bmi < 29.9) {
                diagnosis = "Você apresenta sobrepeso leve, com acúmulo de gordura focado na região abdominal.";
                colorClass = "text-yellow-600";
                icon = <AlertTriangle className="w-12 h-12 text-yellow-500" />;
            } else {
                diagnosis = "Seu metabolismo precisa de um estímulo potente para destravar a queima de gordura.";
                colorClass = "text-red-600";
                icon = <AlertCircle className="w-12 h-12 text-red-500" />;
            }
        }

        return (
            <div className="w-full max-w-md mx-auto flex flex-col items-center animate-fade-in px-2">
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-stone-100 mb-6 w-full text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-bellavance-teal to-bellavance-gold"></div>
                    
                    <div className="flex justify-center mb-4">{icon}</div>
                    
                    <h3 className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-2">Seu IMC Calculado</h3>
                    <div className="text-5xl font-serif font-bold text-stone-800 mb-2">{bmi.toFixed(1)}</div>
                    <div className={`text-sm font-bold uppercase tracking-wide mb-6 ${colorClass}`}>
                        {bmi < 18.5 ? "Abaixo do Peso" : bmi < 24.9 ? "Peso Normal" : bmi < 29.9 ? "Sobrepeso" : "Obesidade"}
                    </div>

                    <div className="bg-stone-50 rounded-xl p-4 border border-stone-100 text-left">
                        <p className="text-stone-800 font-bold mb-2 text-sm">Diagnóstico da Dra:</p>
                        <p className="text-stone-600 text-sm leading-relaxed">
                            {diagnosis} <span className="font-bold text-bellavance-teal">A Hidrolipo é indicada para o seu caso.</span>
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => onAnswer('viewed')}
                    className="w-full bg-bellavance-teal hover:bg-bellavance-tealDark text-white font-bold py-4 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 group transition-all active:scale-95 touch-manipulation"
                >
                    Entendi, continuar <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        );
    }

    // Layout 1: Comparison / Educational (Fat Types) -> "Did You Know?" Style
    if (question.id === 'info_fat_types') {
        return (
            <div className="w-full max-w-md mx-auto flex flex-col items-center animate-fade-in px-2">
                <div className="bg-gradient-to-br from-bellavance-teal/5 to-transparent border-l-4 border-bellavance-teal rounded-r-2xl rounded-l-sm p-6 md:p-8 mb-6 shadow-sm w-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                        <Microscope className="w-32 h-32 text-bellavance-teal" />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4 text-bellavance-teal font-bold uppercase text-xs tracking-widest relative z-10">
                        <div className="p-1 bg-bellavance-teal/10 rounded">
                            <Info className="w-3 h-3" />
                        </div>
                        Ciência Corporal
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-serif text-stone-800 mb-4 leading-tight relative z-10">{question.question}</h3>
                    
                    <div className="w-16 h-1 bg-bellavance-teal/20 mb-5 rounded-full"></div>

                    <p className="text-stone-600 text-sm md:text-base leading-relaxed font-light relative z-10">
                        {question.subtext}
                    </p>
                </div>
                
                {question.infoImage && (
                    <div className="w-full h-52 rounded-2xl overflow-hidden mb-8 shadow-lg ring-4 ring-white">
                        <img src={question.infoImage} alt="Info" loading="lazy" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[1.5s]" />
                    </div>
                )}
                
                <button
                    onClick={() => onAnswer('viewed')}
                    className="w-full bg-bellavance-teal hover:bg-bellavance-tealDark text-white font-medium py-4 px-6 rounded-full shadow-lg shadow-bellavance-teal/20 flex items-center justify-center gap-2 group transition-all active:scale-95 touch-manipulation hover:shadow-xl"
                >
                    Entendi a diferença <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        );
    }

    // Layout 2: Medical Alert / Urgency (Cortisol) -> Warning Card Style
    if (question.id === 'info_cortisol') {
        return (
            <div className="w-full max-w-md mx-auto flex flex-col items-center animate-fade-in px-2">
                <div className="bg-white rounded-3xl p-1.5 mb-6 w-full shadow-xl shadow-red-100/40 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    <div className="bg-gradient-to-b from-red-50/80 to-white rounded-[20px] p-6 border border-red-100 h-full">
                        <div className="flex items-center justify-between mb-5">
                             <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-xs tracking-wider bg-white px-3 py-1 rounded-full shadow-sm border border-red-100">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                Alerta Metabólico
                            </div>
                            <AlertCircle className="w-6 h-6 text-red-300" />
                        </div>
                       
                        <h3 className="text-xl font-bold text-stone-800 mb-4 font-serif leading-tight">{question.question}</h3>
                        
                        {question.infoImage && (
                            <div className="w-full h-40 rounded-xl overflow-hidden mb-5 border border-red-100 shadow-inner relative group">
                                <div className="absolute inset-0 bg-red-500/5 mix-blend-multiply pointer-events-none"></div>
                                <img src={question.infoImage} alt="Cortisol" loading="lazy" className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        )}
                        
                        <p className="text-stone-600 text-sm leading-relaxed border-l-2 border-red-200 pl-4 py-1 italic">
                            {question.subtext}
                        </p>
                    </div>
                </div>
                
                <button
                    onClick={() => onAnswer('viewed')}
                    className="w-full bg-stone-800 hover:bg-stone-900 text-white font-bold py-4 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 group transition-all active:scale-95 touch-manipulation ring-4 ring-stone-100 hover:ring-stone-200"
                >
                    Continuar Diagnóstico <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        );
    }

    // Layout 3: Scientific Solution / Tech (Mechanism) -> Dark Mode / Premium Style
    if (question.id === 'info_mechanism') {
         return (
            <div className="w-full max-w-md mx-auto flex flex-col items-center animate-fade-in px-2">
                <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl mb-8 group bg-stone-900 border border-stone-800">
                     {/* Background Image with Overlay */}
                     {question.infoImage && (
                        <>
                            <img src={question.infoImage} alt="Tech" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2.5s]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/70 to-stone-900/10"></div>
                        </>
                    )}
                    
                    <div className="relative z-10 p-6 md:p-8 flex flex-col h-full min-h-[380px] justify-end">
                        <div className="flex items-center gap-2 mb-3 self-start">
                            <div className="p-1.5 bg-bellavance-gold rounded-lg shadow-lg shadow-bellavance-gold/20">
                                <Microscope className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-bellavance-gold drop-shadow-md">Tecnologia Exclusiva</span>
                        </div>
                        
                        <h3 className="font-serif text-2xl text-white mb-4 leading-none drop-shadow-lg">{question.question}</h3>
                        
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 shadow-lg">
                            <p className="font-light text-stone-100 text-sm leading-relaxed">
                                {question.subtext}
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => onAnswer('viewed')}
                    className="w-full bg-bellavance-gold hover:bg-[#b08d4a] text-white font-bold py-4 px-6 rounded-full shadow-lg shadow-bellavance-gold/30 flex items-center justify-center gap-2 group transition-all active:scale-95 touch-manipulation hover:brightness-110"
                >
                    Ver meu resultado <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        );
    }

    // Default Fallback Layout
    return (
        <div className="w-full max-w-md mx-auto flex flex-col items-center animate-fade-in px-2">
            {question.infoImage && (
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 shadow-md border-4 border-white">
                <img src={question.infoImage} alt="Info" loading="lazy" className="w-full h-full object-cover" />
            </div>
            )}
            <div className="bg-white border border-stone-100 rounded-xl p-6 mb-8 text-center shadow-sm relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-stone-50 p-2 rounded-full border border-stone-100">
                     <Info className="w-6 h-6 text-bellavance-teal" />
                </div>
                <p className="text-stone-600 text-lg leading-relaxed font-light mt-2">
                    {question.subtext}
                </p>
            </div>
            <button
            onClick={() => onAnswer('viewed')}
            className="w-full bg-bellavance-teal hover:bg-bellavance-tealDark text-white font-bold py-4 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 touch-manipulation"
            >
            Entendi, continuar <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
  };

  const renderContent = () => {
    switch (question.type) {
      case QuestionType.SINGLE_CHOICE:
        return (
          <div className="grid grid-cols-1 gap-3 w-full max-w-md mx-auto animate-fade-in delay-100 px-1">
            {question.options?.map((option) => (
              <button
                key={option.id}
                onClick={() => onAnswer(option.id)}
                className="group relative flex items-center p-3 md:p-4 bg-white rounded-xl text-left transition-all duration-300 shadow-sm hover:shadow-lg border border-transparent hover:border-bellavance-teal/30 active:scale-95 hover:scale-105 touch-manipulation"
              >
                {/* Image Section - Optimized for clarity, responsiveness and interactivity */}
                {option.image && (
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden mr-4 shrink-0 bg-stone-100 border border-stone-200 group-hover:border-bellavance-teal/50 shadow-sm z-10 transition-all duration-300 group-hover:shadow-md">
                    <img 
                        src={option.image} 
                        alt={option.label} 
                        loading="lazy" 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                    />
                    {/* Subtle Sheen Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/30 transition-all duration-500 pointer-events-none mix-blend-overlay"></div>
                  </div>
                )}
                
                {/* Text Section */}
                <div className="flex-1 z-10 pr-2">
                  <span className="font-medium text-stone-700 text-base md:text-lg group-hover:text-bellavance-teal transition-colors">
                    {option.label}
                  </span>
                </div>
                
                {/* Info Icon - Render if description exists */}
                {option.description && (
                    <div 
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent selecting the answer
                            setSelectedInfoOption(option);
                        }}
                        className="relative z-20 p-2 mr-2 text-stone-300 hover:text-bellavance-teal hover:bg-stone-50 rounded-full transition-colors"
                        title="Ver detalhes"
                    >
                        <Info className="w-5 h-5" />
                    </div>
                )}

                {/* Icon/Selection Indicator */}
                {option.icon ? (
                  <div className="text-stone-300 ml-2 md:ml-4 transform group-hover:scale-110 group-hover:text-bellavance-teal transition-all duration-300 z-10">
                    {React.cloneElement(option.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5 md:w-6 md:h-6" })}
                  </div>
                ) : !option.image && (
                   <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-stone-300 ml-3 md:ml-4 flex items-center justify-center group-hover:border-bellavance-teal group-hover:bg-bellavance-teal/10 transition-colors z-10">
                       <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-bellavance-teal opacity-0 group-hover:opacity-100 transition-opacity transform scale-0 group-hover:scale-100 duration-200" />
                   </div>
                )}

                {/* Subtle Ripple/Background Effect */}
                <div className="absolute inset-0 bg-bellavance-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              </button>
            ))}
          </div>
        );

      case QuestionType.INPUT_NUMBER:
        return (
          <form onSubmit={handleInputSubmit} className="w-full max-w-xs mx-auto mt-8 animate-fade-in delay-100 px-4">
            <div className="relative flex items-center justify-center">
              <input
                type="number"
                step="0.01"
                min={question.min}
                max={question.max}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={question.inputPlaceholder}
                className="w-full text-center text-4xl md:text-5xl font-serif text-bellavance-teal border-b border-stone-200 focus:border-bellavance-gold outline-none py-4 md:py-6 bg-transparent placeholder:text-stone-200 transition-colors"
                autoFocus
              />
              {question.inputUnit && (
                <span className="absolute -right-2 md:-right-4 bottom-6 md:bottom-8 text-stone-400 font-medium text-lg">
                  {question.inputUnit}
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={!inputValue}
              className="mt-8 md:mt-10 w-full bg-bellavance-gold hover:bg-[#b08d4a] active:scale-95 disabled:bg-stone-200 disabled:text-stone-400 disabled:scale-100 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation"
            >
              Continuar <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        );

      case QuestionType.LEAD_CAPTURE:
        return (
           <form onSubmit={handleFormSubmit} className="w-full max-w-sm mx-auto mt-4 md:mt-6 space-y-4 md:space-y-5 animate-fade-in delay-100 px-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-stone-400 group-focus-within:text-bellavance-teal transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Seu primeiro nome"
                  className="block w-full pl-12 pr-4 py-4 border border-stone-200 rounded-xl bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-bellavance-teal focus:ring-1 focus:ring-bellavance-teal transition-all shadow-sm appearance-none"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-stone-400 group-focus-within:text-bellavance-teal transition-colors" />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="(21) 99999-9999"
                  className="block w-full pl-12 pr-4 py-4 border border-stone-200 rounded-xl bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-bellavance-teal focus:ring-1 focus:ring-bellavance-teal transition-all shadow-sm appearance-none"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  inputMode="numeric"
                  maxLength={15}
                />
              </div>

              <button
                type="submit"
                disabled={!formData.name || formData.phone.length < 14}
                className="w-full bg-[#25D366] hover:bg-[#1fb858] active:scale-95 disabled:bg-stone-200 disabled:text-stone-400 disabled:scale-100 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mt-4 touch-manipulation"
              >
                Ver Meu Resultado <ChevronRight className="w-5 h-5" />
              </button>
              
              <div className="flex items-center justify-center gap-2 text-stone-400 mt-4 opacity-70">
                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                 <p className="text-xs">Ambiente 100% Seguro</p>
              </div>
           </form>
        );

      case QuestionType.INFO:
        return renderInfoStep();

      default:
        return null;
    }
  };

  return (
    <>
        <div className="flex flex-col items-center animate-fade-in-up w-full">
            {/* Render Title/Subtext for Non-Info steps here. Info steps handle their own layout */}
            {question.type !== QuestionType.INFO && (
                <div className="px-4">
                    <h2 className="text-xl md:text-3xl font-bold text-stone-800 text-center mb-3 font-serif leading-tight">
                        {question.question}
                    </h2>
                    {question.subtext && (
                        <p className="text-stone-500 text-center mb-6 md:mb-8 max-w-md font-light leading-relaxed text-sm md:text-base mx-auto">
                        {question.subtext}
                        </p>
                    )}
                </div>
            )}
        
        {renderContent()}
        </div>

        {/* INFO MODAL */}
        {selectedInfoOption && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-fade-in-up">
                    <button 
                        onClick={() => setSelectedInfoOption(null)}
                        className="absolute top-3 right-3 p-1.5 bg-black/20 hover:bg-black/40 text-white rounded-full z-10 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    {selectedInfoOption.image && (
                        <div className="h-48 w-full bg-stone-100">
                             <img src={selectedInfoOption.image} alt={selectedInfoOption.label} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-stone-800 mb-2 font-serif">{selectedInfoOption.label}</h3>
                        <p className="text-stone-600 leading-relaxed text-sm font-light">
                            {selectedInfoOption.description || "Nenhuma descrição disponível."}
                        </p>
                        <button 
                            onClick={() => setSelectedInfoOption(null)}
                            className="w-full mt-6 bg-bellavance-teal hover:bg-bellavance-tealDark text-white py-3 rounded-xl font-bold text-sm transition-colors"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
  );
};

export default QuizStep;
