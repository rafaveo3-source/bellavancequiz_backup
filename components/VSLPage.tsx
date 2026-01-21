
import Player from '@vimeo/player';
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, ShieldCheck, Play, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, MapPin, X, Clock, Sparkles, Smartphone, Instagram, ChevronLeft, Flame, Timer, Lock, AlertOctagon, Volume2, VolumeX } from 'lucide-react';
import { VSL_SCRIPT, REVIEWS, FAQ, OFFER_DETAILS, CTA_DELAY_MS, CLINIC_INFO, DRA_BIO, BEFORE_AFTER_IMAGES } from '../constants';

interface VSLPageProps {
  userName?: string;
  onBack: () => void;
}

const VSLPage: React.FC<VSLPageProps> = ({ userName, onBack }) => {
  const [showCTA, setShowCTA] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentTriggered, setExitIntentTriggered] = useState(false);
  const [showBonusAnimation, setShowBonusAnimation] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [bioVisible, setBioVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isMuted, setIsMuted] = useState(true); // Track mute state
  const [soundButtonVisible, setSoundButtonVisible] = useState(false); // Track button visibility
  const bioRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const vimeoPlayerRef = useRef<Player | null>(null);

  useEffect(() => {
    const handleScroll = () => {
        requestAnimationFrame(() => {
            setScrollY(window.scrollY);
        });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Timer Countdown Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (showCTA && timeLeft > 0) {
        interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
    }
    return () => clearInterval(interval);
  }, [showCTA, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBioVisible(true);
        }
      },
      { threshold: 0.2 } 
    );
    if (bioRef.current) {
      observer.observe(bioRef.current);
    }
    return () => {
      if (bioRef.current) observer.unobserve(bioRef.current);
    };
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isVideoPlaying) {
        timer = setTimeout(() => {
            setShowCTA(true);
            setShowBonusAnimation(true);
        }, CTA_DELAY_MS);
    }
    return () => {
        if (timer) clearTimeout(timer);
    };
  }, [isVideoPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Vimeo Player Initialization
  useEffect(() => {
  if (!iframeRef.current) return;

  vimeoPlayerRef.current = new Player(iframeRef.current, {
    muted: true,
    autopause: false,
  });

  return () => {
    vimeoPlayerRef.current?.destroy();
    vimeoPlayerRef.current = null;
  };
}, []);

  // Exit Intent Logic
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent && !exitIntentTriggered) {
        setShowExitIntent(true);
        setExitIntentTriggered(true);
      }
    };
    
    // History push state trick for mobile back button
    window.history.pushState(null, "", window.location.href);
    const handlePopState = (e: PopStateEvent) => {
        if (!showExitIntent && !exitIntentTriggered) {
             window.history.pushState(null, "", window.location.href);
             setShowExitIntent(true);
             setExitIntentTriggered(true);
        }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
        document.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('popstate', handlePopState);
    };
  }, [showExitIntent, exitIntentTriggered]);

  const handleWhatsappClick = (origin: string) => {
    const phone = "5521987288581";
    const text = `Olá Dra. Luana! Assisti ao vídeo sobre Hidrolipoclasia e gostaria de garantir minha condição especial de R$ ${OFFER_DETAILS.newPrice} (Origem: ${origin}).`;
    const message = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleStartVideo = async () => {
  setIsVideoPlaying(true);
  setSoundButtonVisible(true);
  setIsMuted(true);

  try {
    await vimeoPlayerRef.current?.ready();
    await vimeoPlayerRef.current?.play();
  } catch (e) {
    console.error('Erro ao iniciar vídeo:', e);
  }
};

  const handleUnmute = async (e: React.MouseEvent) => {
  e.stopPropagation();

  try {
    const player = vimeoPlayerRef.current;
    if (!player) return;

    await player.ready();

    // Safari/iOS exige essa ordem
    await player.play();
    await player.setMuted(false);
    await player.setVolume(1);

    setIsMuted(false);

    setTimeout(() => {
      setSoundButtonVisible(false);
    }, 1500);
  } catch (e) {
    console.error('Erro ao ativar som:', e);
  }
};

  const closeExitIntent = () => {
    setShowExitIntent(false);
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-32 animate-fade-in font-sans relative overflow-x-hidden scroll-smooth selection:bg-bellavance-teal/20">
      
      {/* EXIT INTENT MODAL */}
      {showExitIntent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden border-4 border-red-500 relative animate-fade-in-up">
                <button onClick={closeExitIntent} className="absolute top-2 right-2 p-1 bg-stone-100 rounded-full text-stone-500 hover:text-stone-800">
                    <X className="w-5 h-5" />
                </button>
                <div className="bg-red-500 p-4 text-center">
                    <AlertOctagon className="w-12 h-12 text-white mx-auto mb-2 animate-bounce" />
                    <h2 className="text-white font-bold text-xl uppercase tracking-wider">Espere!</h2>
                </div>
                <div className="p-6 text-center">
                    <p className="text-stone-800 font-bold text-lg mb-2">Você vai perder sua vaga?</p>
                    <p className="text-stone-600 text-sm mb-6">A condição especial de <span className="text-red-500 font-bold line-through">R$ 450</span> por <span className="text-green-600 font-bold">R$ 150</span> é válida apenas para essa sessão.</p>
                    <div className="flex flex-col gap-3">
                        <button onClick={closeExitIntent} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95">
                            SIM! QUERO APROVEITAR AGORA
                        </button>
                        <button onClick={onBack} className="text-stone-400 text-xs hover:text-stone-500 underline">
                            Não, quero perder o desconto
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #2A9D8F 1px, transparent 0)`,
                backgroundSize: '30px 30px',
                transform: `translateY(${scrollY * 0.05}px)`
            }}
         ></div>
      </div>

      <div className="bg-stone-900 py-3 px-6 sticky top-0 z-40 shadow-md flex justify-between items-center transition-all duration-300 backdrop-blur-sm bg-opacity-95">
        <div className="flex items-center gap-4">
            <button 
                onClick={onBack}
                className="text-stone-400 hover:text-white transition-colors active:scale-95"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-bellavance-teal" /> 
                <span className="text-white text-xs font-bold tracking-wide uppercase">
                    {userName ? `Análise de ${userName}` : 'Análise Concluída'}
                </span>
            </div>
        </div>
        <a href="https://www.instagram.com/bellavanceestetica/" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors">
            <Instagram className="w-5 h-5" />
        </a>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-6 md:pt-8 relative z-10">
        <div className="text-center mb-6 md:mb-8">
            <div className="inline-block bg-red-50 border border-red-100 rounded-full px-4 py-1 mb-4 animate-bounce">
                <span className="text-red-600 text-[10px] md:text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3" /> Atenção: Vídeo Exclusivo
                </span>
            </div>
            <h1 className="text-xl md:text-4xl font-bold text-stone-900 font-serif mb-4 leading-tight">
            {VSL_SCRIPT.headline}
            </h1>
            <p className="text-stone-600 text-sm md:text-xl leading-relaxed max-w-xl mx-auto font-light">
            {VSL_SCRIPT.subheadline}
            </p>
        </div>

        {/* VIMEO VIDEO SECTION */}
        <div className="relative aspect-video bg-black rounded-xl shadow-2xl overflow-hidden mb-8 border-4 border-white ring-1 ring-stone-200 group transform transition-all">
          
          {/* Iframe is now always rendered to allow API control, but sits behind cover until clicked */}
          <iframe 
            ref={iframeRef}
            src="https://player.vimeo.com/video/1156096923?api=1&autoplay=0&controls=0&title=0&byline=0&portrait=0&branding=0&badge=0&autopause=0&player_id=vsl_player&app_id=58479&playsinline=1"
            width="100%" 
            height="100%" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
            title="Hidrolipo Bellavance"
            className="absolute inset-0 w-full h-full z-0"
            />
          {/* Cover Overlay - Fades out on click */}
          {!isVideoPlaying && (
             <div className="absolute inset-0 cursor-pointer z-10 group" onClick={handleStartVideo}>
              {/* Cover Image & Dark Overlay */}
              <div className="absolute inset-0 z-0">
                 <img src="https://vumbnail.com/1156096923_large.jpg" alt="Capa" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px]"></div>
              </div>
              
              {/* Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <div className="relative group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-bellavance-teal rounded-full animate-ping opacity-20"></div>
                    <div className="relative bg-bellavance-teal/95 hover:bg-bellavance-teal rounded-full border-4 border-white shadow-[0_0_40px_rgba(42,157,143,0.6)] flex items-center gap-3 px-6 py-4 md:px-8 md:py-5">
                        <Play className="w-8 h-8 md:w-8 md:h-8 text-white fill-white" />
                        <div className="flex flex-col border-l border-white/20 pl-4">
                            <span className="text-white font-bold text-sm md:text-base uppercase tracking-widest leading-none mb-1">Assistir Vídeo</span>
                            <div className="flex items-center gap-1.5 text-white/90">
                                <Volume2 className="w-4 h-4" />
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Com Som Ativado</span>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          )}

          {/* Persistent Sound Button - Appears when video is playing */}
          {isVideoPlaying && soundButtonVisible && (
            <div className="absolute top-4 right-4 z-20 animate-fade-in">
                <button 
                    onClick={handleUnmute}
                    className="bg-black/50 hover:bg-bellavance-teal/90 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all border border-white/20 shadow-lg group"
                >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-green-400" />}
                    <span className="text-xs font-bold uppercase tracking-wide">
                        {isMuted ? "Toque para Ativar Som" : "Som Ativado"}
                    </span>
                </button>
            </div>
          )}
        </div>

        {/* OFFER SECTION - STRICTLY BELOW VIDEO AT 70% TIME */}
        {showCTA && (
            <div className="bg-white rounded-2xl shadow-xl border-t-4 border-bellavance-gold overflow-hidden mb-12 relative animate-fade-in-up transform transition-transform hover:-translate-y-1 duration-500">
                <div className="bg-stone-900 text-bellavance-gold text-center py-3 font-bold text-xs md:text-sm tracking-widest uppercase flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" /> Oferta Especial Liberada
                </div>
                
                {/* COUNTDOWN TIMER */}
                <div className="bg-red-50 border-b border-red-100 p-2 flex justify-center items-center gap-2 text-red-600 animate-pulse">
                    <Timer className="w-4 h-4" />
                    <span className="font-bold text-sm tracking-wide">A oferta expira em: {formatTime(timeLeft)}</span>
                </div>

                <div className="p-4 md:p-6 text-center">
                    <h3 className="text-stone-800 font-bold text-xl md:text-2xl mb-1 font-serif">{OFFER_DETAILS.title}</h3>
                    <div className="flex justify-center items-center gap-3 my-4">
                        <span className="text-stone-400 line-through text-base md:text-lg">R$ {OFFER_DETAILS.oldPrice.toFixed(2)}</span>
                        <span className="text-bellavance-teal font-bold text-3xl md:text-4xl animate-pulse">R$ {OFFER_DETAILS.newPrice.toFixed(2)}</span>
                    </div>
                    <div className="text-stone-600 text-xs md:text-sm mb-6 font-medium bg-stone-50 inline-block px-4 py-2 rounded-lg border border-stone-100">
                        ou <span className="font-bold text-stone-900">{OFFER_DETAILS.installments}x de R$ {OFFER_DETAILS.installmentValue.toFixed(2)}</span> sem juros
                    </div>
                    <ul className="text-left space-y-3 mb-8 bg-stone-50 p-4 md:p-6 rounded-xl border border-stone-100">
                        {OFFER_DETAILS.items.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm text-stone-700 font-medium">
                                <CheckCircle2 className="w-5 h-5 text-bellavance-teal flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => handleWhatsappClick('Oferta Hidrolipo')} className="w-full bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white font-bold py-4 rounded-xl shadow-lg transition-all animate-pulse flex items-center justify-center gap-2">
                        GARANTIR MINHA VAGA COM DESCONTO
                    </button>
                    <div className="mt-3 flex items-center justify-center gap-1 text-stone-400 text-[10px] uppercase tracking-wide">
                        <Lock className="w-3 h-3" /> Pagamento Seguro na Clínica
                    </div>
                </div>
            </div>
        )}

        <div className="mb-12">
            <h3 className="text-lg md:text-xl font-bold text-center text-stone-900 font-serif mb-6 flex items-center justify-center gap-2">
                <CheckCircle2 className="text-bellavance-teal" /> Resultados Reais
            </h3>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
                {BEFORE_AFTER_IMAGES.map((img, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden shadow-md group border border-stone-200">
                        <img src={img} alt={`Antes e Depois ${idx + 1}`} className="w-full h-32 md:h-48 object-cover" />
                        <div className="absolute bottom-0 inset-x-0 bg-bellavance-teal/90 text-white text-[10px] md:text-xs py-1 text-center backdrop-blur-sm">Resultado Bellavance</div>
                    </div>
                ))}
            </div>
        </div>

        <div ref={bioRef} className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-stone-100 mb-12 relative overflow-hidden transform transition-all duration-1000 ease-out ${bioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 relative z-10">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                    <img src="https://i.ibb.co/6RPkzvJK/005-181x300.webp" alt="Dra. Luana" className="w-full h-full object-cover object-top" />
                </div>
                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-stone-800 font-serif mb-1 text-center md:text-left">Dra. Luana Paiva</h3>
                    <p className="text-bellavance-teal font-bold text-xs md:text-sm mb-4 uppercase tracking-wider text-center md:text-left">Biomédica Esteta</p>
                    <p className="text-stone-600 text-sm leading-relaxed text-justify font-light">{DRA_BIO}</p>
                </div>
            </div>
        </div>

        {/* FAQ & CLINIC INFO */}
        <div id="faq" className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-stone-900 font-serif mb-6 text-center">Dúvidas Frequentes</h3>
            <div className="space-y-3">
                {FAQ.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <button onClick={() => toggleFaq(index)} className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-stone-50 transition-colors">
                            <span className="font-medium text-stone-800 text-sm pr-4">{item.question}</span>
                            {openFaqIndex === index ? <ChevronUp className="w-5 h-5 text-bellavance-gold" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
                        </button>
                        <div className={`px-5 text-stone-600 text-sm leading-relaxed overflow-hidden transition-all duration-500 ${openFaqIndex === index ? 'max-h-[500px] py-4 border-t border-stone-100 opacity-100' : 'max-h-0 opacity-0'}`}>{item.answer}</div>
                    </div>
                ))}
            </div>
        </div>

        <div className="text-center pt-8 border-t border-stone-200 bg-white p-6 md:p-8 rounded-2xl shadow-sm mb-8 flex flex-col items-center">
            <h4 className="font-serif font-bold text-stone-900 mb-6 text-xl">Onde estamos</h4>
            <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mb-4"><MapPin className="w-6 h-6 text-bellavance-teal" /></div>
            <p className="text-stone-600 text-sm font-medium max-w-xs mb-6">{CLINIC_INFO.address}</p>
            <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mb-4"><Smartphone className="w-6 h-6 text-stone-800" /></div>
            <p className="text-stone-900 text-lg font-bold mb-8">{CLINIC_INFO.phone}</p>
        </div>
      </div>

      {/* STICKY CTA */}
      <div className={`fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] transition-transform duration-500 z-50 ${showCTA ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-md mx-auto">
          <button onClick={() => handleWhatsappClick('Floating Button')} className="w-full bg-[#25D366] text-white font-bold py-3.5 px-6 rounded-full shadow-lg flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" /> QUERO GARANTIR MINHA SESSÃO
          </button>
        </div>
      </div>

      {/* BONUS OVERLAY */}
      {showBonusAnimation && (
        <div className="fixed top-20 right-4 z-40 w-48 animate-fade-in-up pointer-events-none">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-3 border border-bellavance-gold/50 transform rotate-2">
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce shadow-md">SÓ HOJE!</div>
                <div className="bg-orange-50 rounded h-20 flex items-center justify-center mb-2 border border-orange-100">
                    <Flame className="w-8 h-8 text-orange-500 animate-pulse" />
                </div>
                <p className="text-xs font-bold text-center text-stone-800 leading-tight">Bônus Exclusivo: <br/> <span className="text-bellavance-teal">Manta Térmica Inclusa</span></p>
            </div>
        </div>
      )}
    </div>
  );
};

export default VSLPage;
