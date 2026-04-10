import React, { useState } from 'react';
import { 
  CheckCircle2, ShieldCheck, Lock, Package, Zap, Calendar, 
  Star, Smile, Target, Users, Download, School, Clock, 
  BookOpen, RefreshCw, Printer, ChevronDown, ChevronUp,
  PlayCircle, Smartphone, ChevronLeft, ChevronRight, Volume2,
  Play, Clapperboard, Gift, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function AccordionItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg mb-3 bg-white overflow-hidden">
      <button 
        className="w-full flex justify-between items-center p-4 text-left font-medium text-slate-800 hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        {isOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50 text-gray-600 border-t border-gray-100">
          {answer}
        </div>
      )}
    </div>
  );
}

function TestimonialCarousel() {
  const images = [
    "https://i.imgur.com/9UUY4fC.png",
    "https://i.imgur.com/QfBAHjA.png",
    "https://i.imgur.com/UDgzs6V.png",
    "https://i.imgur.com/ahCQDQt.png",
    "https://i.imgur.com/suXI4RQ.png",
    "https://i.imgur.com/Nevh9B1.png",
    "https://i.imgur.com/hV8zzHA.png",
    "https://i.imgur.com/WhkjcpD.png",
    "https://i.imgur.com/cXKY643.png",
    "https://i.imgur.com/PxpXvvg.png",
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const nextStep = React.useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevStep = React.useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      nextStep();
    }, 3000);
    return () => clearInterval(timer);
  }, [nextStep, currentIndex]); // currentIndex in deps to reset timer on manual change

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="relative max-w-[320px] mx-auto flex items-center justify-center">
      {/* Ghost image to maintain natural height of the current slide */}
      <img 
        src={images[currentIndex]} 
        className="w-full h-auto opacity-0 pointer-events-none" 
        aria-hidden="true"
        referrerPolicy="no-referrer"
        loading="lazy"
        decoding="async"
      />

      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute top-0 left-0 w-full h-auto rounded-2xl shadow-xl border border-gray-100"
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
        />
      </AnimatePresence>

      {/* Navigation Arrows - Adjusted for the new layout */}
      <button 
        onClick={(e) => { e.stopPropagation(); prevStep(); }}
        className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-slate-900/10 hover:bg-slate-900/20 text-slate-900 p-2 rounded-full transition-colors hidden md:block"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); nextStep(); }}
        className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-slate-900/10 hover:bg-slate-900/20 text-slate-900 p-2 rounded-full transition-colors hidden md:block"
      >
        <ChevronRight size={24} />
      </button>

      {/* Mobile Arrows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:hidden pointer-events-none">
        <button 
          onClick={(e) => { e.stopPropagation(); prevStep(); }}
          className="pointer-events-auto bg-white/40 hover:bg-white/60 text-slate-900 p-2 rounded-full backdrop-blur-sm transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); nextStep(); }}
          className="pointer-events-auto bg-white/40 hover:bg-white/60 text-slate-900 p-2 rounded-full backdrop-blur-sm transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots Indicator - Moved outside to not overlap image content */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-yellow-500 w-3' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}

function BonusCarousel() {
  const bonuses = [
    {
      title: "50 Linhas do Tempo Ilustradas",
      desc: "O guia visual completo que resolve a confusão cronológica dos alunos de uma vez por todas.",
      icon: <Clock />,
      price: "R$ 67,00",
      color: "from-amber-400 to-orange-600"
    },
    {
      title: "30 Jogos Históricos Prontos",
      desc: "Tabuleiros, cartas e desafios que transformam a revisão da matéria em uma competição saudável.",
      icon: <Zap />,
      price: "R$ 47,00",
      color: "from-blue-500 to-indigo-700"
    },
    {
      title: "Apostila de Mapas Históricos",
      desc: "Mapas mudos e ilustrados para colorir e analisar, facilitando a compreensão espacial da história.",
      icon: <School />,
      price: "R$ 37,00",
      color: "from-emerald-500 to-teal-700"
    },
    {
      title: "40 Debates Históricos",
      desc: "Roteiros prontos para mediar discussões polêmicas e desenvolver o pensamento crítico da turma.",
      icon: <Users />,
      price: "R$ 45,00",
      color: "from-purple-500 to-violet-700"
    },
    {
      title: "Banco de Avaliações",
      desc: "Questões inéditas e contextualizadas para você montar suas provas em segundos.",
      icon: <BookOpen />,
      price: "R$ 45,00",
      color: "from-rose-500 to-red-700"
    },
    {
      title: "Garantia Estendida (15 Dias)",
      desc: "Um bônus de confiança: você tem o dobro do tempo legal para testar e aprovar todo o material.",
      icon: <ShieldCheck />,
      price: "R$ 27,00",
      color: "from-slate-700 to-slate-900"
    }
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const nextStep = React.useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % bonuses.length);
  }, [bonuses.length]);

  const prevStep = React.useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + bonuses.length) % bonuses.length);
  }, [bonuses.length]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      nextStep();
    }, 3000);
    return () => clearInterval(timer);
  }, [nextStep, currentIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="relative max-w-lg mx-auto px-4 py-4">
      <div className="relative h-[380px] flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full max-w-[260px] group bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-2xl"
          >
            <div className={`h-32 bg-gradient-to-br ${bonuses[currentIndex].color} flex items-center justify-center relative overflow-hidden`}>
              {/* Premium Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '15px 15px' }} />
              </div>
              
              {/* Floating Icon */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white/10 p-4 rounded-[20px] backdrop-blur-md border border-white/20 shadow-2xl relative z-10"
              >
                {React.cloneElement(bonuses[currentIndex].icon as React.ReactElement, { size: 40, className: "text-white" })}
              </motion.div>
              
              {/* Prominent Numbering Badge */}
              <div className="absolute top-3 left-3 bg-slate-900 text-yellow-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-2xl border border-yellow-400/30 z-20">
                BÔNUS {currentIndex + 1}
              </div>
              
              {/* Individual Price Tag */}
              <div className="absolute bottom-3 right-3 bg-white/90 text-red-600 text-[9px] font-black px-2.5 py-1 rounded-full line-through shadow-lg z-20">
                {bonuses[currentIndex].price}
              </div>
            </div>
            
            <div className="p-6 text-center">
              <h3 className="text-lg font-black font-display mb-2 leading-tight text-slate-900 uppercase tracking-tight">{bonuses[currentIndex].title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">{bonuses[currentIndex].desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={(e) => { e.stopPropagation(); prevStep(); }}
        className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl text-slate-900 p-3 rounded-full transition-all hover:scale-110 active:scale-95 border border-gray-100 hidden lg:block"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); nextStep(); }}
        className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl text-slate-900 p-3 rounded-full transition-all hover:scale-110 active:scale-95 border border-gray-100 hidden lg:block"
      >
        <ChevronRight size={32} />
      </button>

      {/* Mobile Arrows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-0 lg:hidden pointer-events-none">
        <button 
          onClick={(e) => { e.stopPropagation(); prevStep(); }}
          className="pointer-events-auto bg-white/80 shadow-lg text-slate-900 p-2 rounded-full backdrop-blur-sm transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); nextStep(); }}
          className="pointer-events-auto bg-white/80 shadow-lg text-slate-900 p-2 rounded-full backdrop-blur-sm transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {bonuses.map((_, i) => (
          <div 
            key={i} 
            className={`w-1 h-1 rounded-full transition-all ${i === currentIndex ? 'bg-yellow-500 w-2.5' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [isUpsellModalOpen, setIsUpsellModalOpen] = useState(false);
  const [isBonusExpanded, setIsBonusExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  // Timer logic
  React.useEffect(() => {
    if (!isUpsellModalOpen) return;
    
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isUpsellModalOpen, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    // Load Wistia main script
    const script = document.createElement('script');
    script.src = 'https://fast.wistia.net/assets/external/E-v1.js';
    script.async = true;
    document.body.appendChild(script);

    // Load Video-specific JSONP for faster initialization
    const jsonp = document.createElement('script');
    jsonp.src = 'https://fast.wistia.com/embed/medias/u9pll71p3f.jsonp';
    jsonp.async = true;
    document.body.appendChild(jsonp);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(jsonp);
    }
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    
    // @ts-ignore
    window._wq = window._wq || [];
    // @ts-ignore
    window._wq.push({
      id: "u9pll71p3f",
      onReady: (video: any) => {
        video.unmute();
        video.volume(1);
        video.play();
        // Force play again after a tiny delay to ensure it catches
        setTimeout(() => {
          video.play();
        }, 300);
      },
    });
  };

  const today = new Date().toLocaleDateString('pt-BR');

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900 selection:bg-yellow-200">
      {/* Top Bar */}
      <div className="bg-red-600 text-center py-2 text-sm font-bold text-white">
        OFERTA VÁLIDA SOMENTE HOJE: {today}
      </div>

      {/* Hero Section */}
      <section className="bg-white pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-black font-display text-slate-900 mb-10 leading-[1.1] uppercase max-w-3xl mx-auto">
            <span className="bg-yellow-400 px-4 py-1 rounded-xl inline-block mb-4 shadow-sm">+250 DINÂMICAS</span><br/>
            QUE TORNAM AULAS DE HISTÓRIA <span className="text-yellow-500">3X MAIS INTERESSANTE</span> PARA QUALQUER JOVEM
          </h1>

          <p className="text-lg md:text-xl text-slate-600 font-medium mb-8 max-w-2xl mx-auto">
            Clique no vídeo abaixo para assistir oque você vai receber 👇🎥
          </p>

          {/* Wistia Video Embed */}
          <div className="relative max-w-sm mx-auto aspect-[9/16] bg-slate-800 rounded-xl overflow-hidden shadow-2xl mb-8 border-4 border-yellow-400">
            <iframe 
              src="https://fast.wistia.net/embed/iframe/u9pll71p3f?videoFoam=true&autoPlay=false&silentAutoPlay=false&muted=false" 
              title="Demonstração do material" 
              allow="autoplay; fullscreen" 
              frameBorder="0" 
              scrolling="no" 
              className="wistia_embed w-full h-full" 
              name="wistia_embed" 
              id="wistia_u9pll71p3f"
              loading="lazy"
            />
          </div>

          <button 
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 w-full max-w-sm mx-auto flex items-center justify-center gap-2 mb-8"
          >
            👇 Quero acessar agora 👇
          </button>

          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-600 font-medium">
            <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-green-500"/> Acesso imediato</span>
            <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-green-500"/> Garantia 7 dias</span>
            <span className="flex items-center gap-1"><Lock size={16} className="text-green-500"/> Pagamento seguro</span>
          </div>
        </div>
      </section>

      {/* Problema Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-12 text-slate-900">
            O Problema <span className="text-yellow-500">não é você...</span>
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-red-50 p-6 rounded-xl border border-red-100 flex items-start gap-4 shadow-sm h-full">
              <span className="text-xl shrink-0">❌</span>
              <p className="font-medium text-slate-700">Tenta engajar a turma e sente que está falando sozinha</p>
            </div>
            <div className="bg-red-50 p-6 rounded-xl border border-red-100 flex items-start gap-4 shadow-sm h-full">
              <span className="text-xl shrink-0">❌</span>
              <p className="font-medium text-slate-700">Passa horas planejando uma aula diferente e o tempo não deixa</p>
            </div>
            <div className="bg-red-50 p-6 rounded-xl border border-red-100 flex items-start gap-4 shadow-sm h-full">
              <span className="text-xl shrink-0">❌</span>
              <p className="font-medium text-slate-700">Já tentou de tudo, mas História continua sendo "matéria chata" pra eles</p>
            </div>
            <div className="bg-red-50 p-6 rounded-xl border border-red-100 flex items-start gap-4 shadow-sm h-full">
              <span className="text-xl shrink-0">❌</span>
              <p className="font-medium text-slate-700">A coordenação cobra inovação e você não sabe por onde começar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Respira Section */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-100/30 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-7xl md:text-[120px] font-black font-display text-slate-900 mb-8 uppercase italic tracking-tighter leading-[0.85] select-none">
              Respira<span className="text-yellow-400">.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative inline-block"
          >
            <div className="absolute -left-8 -top-4 text-6xl text-yellow-200 font-serif opacity-50 hidden md:block">"</div>
            <p className="text-2xl md:text-3xl text-slate-700 font-medium leading-tight max-w-3xl mx-auto">
              Com <span className="relative inline-block">
                <span className="relative z-10 font-black text-slate-900">DINÂMICAS PRONTAS</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-400/60 -rotate-1 z-0" />
              </span> você vai fazer qualquer jovem falar, se envolver e participar da aula de história, <span className="italic">sem muito esforço.</span>
            </p>
            <div className="absolute -right-8 -bottom-4 text-6xl text-yellow-200 font-serif opacity-50 hidden md:block">"</div>
          </motion.div>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-24 h-1 bg-yellow-400 mx-auto mt-12 rounded-full"
          />
        </div>
      </section>

      {/* Bônus Section */}
      <section className="py-24 px-4 bg-white text-slate-900 overflow-hidden relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 shadow-lg">
              🎁 PRESENTES EXCLUSIVOS
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black font-display mb-6 tracking-tighter uppercase leading-[0.9]">
              TURBINE SUA <br className="hidden md:block" />
              <span className="text-yellow-500">EXPERIÊNCIA</span>
            </h2>
            
            <p className="text-slate-600 text-lg md:text-2xl max-w-2xl mx-auto font-medium mb-12">
              Garanta seu acesso agora e leve esses <span className="text-slate-900 font-black">6 BÔNUS PREMIUM</span> de presente.
            </p>
          </div>

          <BonusCarousel />

          <div className="text-center mt-12">
            <div className="inline-block bg-slate-50 border border-slate-100 px-10 py-6 rounded-[32px] shadow-sm">
              <p className="text-slate-500 text-sm font-bold mb-2">
                Total em Bônus: <span className="text-red-600 line-through ml-1">R$ 197,00</span>
              </p>
              <p className="text-2xl md:text-3xl font-black text-slate-900 font-display tracking-tight">
                HOJE: <span className="text-green-600">TUDO POR CUSTO ZERO</span>
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Oferta / Pricing */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black font-display mb-4">Escolha o <span className="text-green-600">pacote ideal</span> para as suas turmas</h2>
            <p className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold text-sm">
              ⚠️ Preço promocional válido somente hoje
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
            {/* Pacote Básico */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 relative shadow-sm">
              <h3 className="text-xl font-bold text-center mb-6 text-slate-600">Pacote Básico</h3>
              <ul className="space-y-4 mb-8 text-sm text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-gray-400" /> +100 Dinâmicas de Geografia</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-gray-400" /> Garantia de 7 dias</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-gray-400" /> Acesso vitalício</li>
              </ul>
              <div className="text-center mb-6">
                <p className="text-3xl font-black text-slate-900">R$ 10,00</p>
              </div>
              <button 
                onClick={() => setIsUpsellModalOpen(true)}
                className="w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm"
              >
                Quero apenas o básico
              </button>
            </div>

            {/* Pacote Premium */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-[40px] p-1.5 shadow-2xl transform md:-translate-y-6 relative group transition-all hover:scale-[1.02]">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 text-[10px] font-black px-8 py-2 rounded-full uppercase tracking-widest shadow-xl border-2 border-white z-20 whitespace-nowrap">
                OFERTA CUSTO BENEFÍCIO
              </div>
              
              <div className="bg-white rounded-[36px] p-8 md:p-10 h-full flex flex-col relative overflow-hidden">
                {/* Subtle background pattern for the whole card */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                <div className="text-center mb-6 relative z-10">
                  <h3 className="text-4xl font-black font-display text-slate-900 mb-1 uppercase tracking-tight">Pacote Premium</h3>
                  <p className="text-green-600 font-black text-[10px] uppercase tracking-[0.3em] mb-6">O Kit Completo do Professor</p>
                  
                  {/* Pricing Section Moved and Restyled */}
                  <div className="relative inline-block w-full">
                    <div className="bg-green-50/50 border-y-2 border-green-100 py-4 mb-2">
                      <p className="text-red-500 line-through text-xs font-black mb-1 opacity-80">De R$ 197,00</p>
                      <div className="flex flex-col items-center">
                        <span className="text-slate-500 text-[8px] font-black uppercase tracking-[0.2em] mb-1">por apenas</span>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-xl font-black text-slate-900 mt-1">R$</span>
                          <span className="text-6xl font-black text-green-600 tracking-tighter leading-none">27</span>
                          <span className="text-2xl font-black text-green-600 mt-1">,90</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8 mb-8 flex-grow relative z-10">
                  {/* Benefits List above Bonuses */}
                  <ul className="space-y-4 px-2">
                    {[
                      "+250 Dinâmicas Interativas de Geografia PDF",
                      "Acesso imediato após a compra",
                      "Compatível com BNCC",
                      "Acesso Vitalício",
                      "Garantia de 15 dias"
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                        <div className="mt-0.5 bg-green-100 p-0.5 rounded-full text-green-600 shrink-0">
                          <CheckCircle2 size={14} />
                        </div>
                        <span className="leading-tight">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Redesigned Bonus Area below Benefits */}
                  <div className="bg-yellow-50/50 rounded-[32px] p-6 border-2 border-dashed border-yellow-400/40 relative group/bonus transition-all hover:bg-yellow-50">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 text-[9px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-sm">
                      🎁 BÔNUS EXCLUSIVOS
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 mt-2">
                      {[
                        { name: "50 Linhas do Tempo", icon: <Calendar size={16} /> },
                        { name: "30 Jogos Históricos", icon: <Zap size={16} /> },
                        { name: "Apostila de Mapas", icon: <Target size={16} /> },
                        { name: "40 Debates Prontos", icon: <Users size={16} /> },
                        { name: "Banco de Provas", icon: <CheckCircle2 size={16} /> },
                        { name: "Garantia 15 Dias", icon: <ShieldCheck size={16} /> }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 group/item">
                          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-yellow-200 flex items-center justify-center text-yellow-600 shrink-0 group-hover/item:bg-yellow-400 group-hover/item:text-slate-900 transition-all">
                            {item.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black text-yellow-600 uppercase tracking-widest">Bônus {idx + 1}</span>
                            <span className="text-sm font-bold text-slate-800 leading-none">{item.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-auto relative z-10 px-2">
                  <motion.a 
                    href="https://ggcheckout.app/checkout/v5/TaOpUYFp1GBkElhrCw0A"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full bg-gradient-to-b from-[#00E676] to-[#00C853] hover:from-[#00C853] hover:to-[#00B248] text-white font-black py-5 px-4 rounded-full shadow-[0_6px_0_0_#009624,0_12px_24px_-8px_rgba(0,230,118,0.5)] text-base md:text-lg active:translate-y-[2px] active:shadow-[0_2px_0_0_#009624] flex items-center justify-center text-center uppercase tracking-tight transition-all leading-none"
                  >
                    GARANTIR O PLANO PREMIUM
                  </motion.a>
                  <p className="text-[9px] text-slate-400 font-black uppercase mt-4 text-center tracking-widest">Pagamento Único • Sem Mensalidades</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upsell Modal */}
      <AnimatePresence>
        {isUpsellModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[32px] shadow-2xl relative max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-hide"
            >
              {/* Top Timer Banner */}
              <div className="bg-red-600 text-white py-2 px-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <Clock size={14} />
                OFERTA EXPIRA EM: {formatTime(timeLeft)}
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setIsUpsellModalOpen(false)}
                className="absolute top-12 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-6 pt-8 text-center">
                <h2 className="text-3xl font-black italic text-yellow-500 leading-none mb-1">ESPERE!</h2>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">NÃO COMETA ESSE ERRO!</h3>
                
                <div className="w-12 h-1 bg-yellow-500 mx-auto rounded-full mb-4" />

                <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6 px-4">
                  Você está prestes a deixar <span className="text-yellow-600 font-black">6 bônus exclusivos</span> para trás por uma diferença mínima.
                </p>

                {/* Offer Card */}
                <div className="bg-yellow-50/30 rounded-[32px] p-6 border border-yellow-100 relative mb-5">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white text-[9px] font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow-md whitespace-nowrap">
                    OFERTA PREMIUM
                  </div>

                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-green-600 text-lg font-black">R$</span>
                    <span className="text-6xl font-black text-green-600 tracking-tighter">19</span>
                    <span className="text-2xl font-black text-green-600 mt-1">,90</span>
                  </div>
                  <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-2">(PAGAMENTO ÚNICO)</p>
                </div>

                {/* Bonus Accordion */}
                <div className="mb-6">
                  <button 
                    onClick={() => setIsBonusExpanded(!isBonusExpanded)}
                    className="w-full flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-white shadow-sm">
                        <Star size={16} fill="currentColor" />
                      </div>
                      <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight">VER 6 BÔNUS GRÁTIS INCLUSOS</span>
                    </div>
                    {isBonusExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </button>
                  
                  <AnimatePresence>
                    {isBonusExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-4 space-y-4 text-left bg-white border-x border-b border-gray-50 rounded-b-xl">
                          {[
                            { name: "50 Linhas do Tempo", icon: <Calendar size={14} /> },
                            { name: "30 Jogos Históricos", icon: <Zap size={14} /> },
                            { name: "Apostila de Mapas", icon: <Target size={14} /> },
                            { name: "40 Debates Prontos", icon: <Users size={14} /> },
                            { name: "Banco de Provas", icon: <CheckCircle2 size={14} /> },
                            { name: "Garantia 15 Dias", icon: <ShieldCheck size={14} /> }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-slate-50 rounded-lg border border-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                                {item.icon}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[7px] font-black text-yellow-600 uppercase tracking-widest">Bônus {idx + 1}</span>
                                <span className="text-xs font-bold text-slate-800 leading-none">{item.name}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.a 
                  href="https://ggcheckout.app/checkout/v5/hBABLoBBAFGjuQxTsVpb"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full bg-gradient-to-b from-[#00E676] to-[#00C853] hover:from-[#00C853] hover:to-[#00B248] text-white font-black py-4 px-4 rounded-full shadow-[0_5px_0_0_#009624,0_10px_20px_-5px_rgba(0,230,118,0.4)] text-sm md:text-base active:translate-y-[2px] active:shadow-[0_2px_0_0_#009624] flex items-center justify-center text-center uppercase tracking-tight transition-all leading-none"
                >
                  GARANTIR O PLANO PREMIUM
                </motion.a>
                
                <a 
                  href="https://ggcheckout.app/checkout/v5/vzCBYwQL3Wj5nBJL4xiv"
                  className="mt-6 text-slate-400 hover:text-slate-600 font-black text-[11px] uppercase tracking-[0.2em] transition-colors"
                >
                  GARANTIR APENAS O BÁSICO
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-yellow-100 shadow-sm"
          >
            <Star size={14} className="fill-current" /> APROVADO POR ESPECIALISTAS
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black font-display mb-16 tracking-tight leading-[0.95]">
            A REAÇÃO DE QUEM <br className="hidden md:block" />
            <span className="text-yellow-500 italic">JÁ TRANSFORMOU</span> SUAS AULAS
          </h2>

          <div className="relative">
            {/* Decorative background for carousel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-yellow-400/5 rounded-full blur-[100px] -z-10" />
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* Autora */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-gray-100 rounded-[40px] p-8 md:p-10 shadow-xl relative overflow-hidden text-center">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/5 rounded-full -mr-12 -mt-12 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/5 rounded-full -ml-12 -mb-12 blur-2xl" />

            <div className="relative z-10">
              <div className="w-28 h-28 mx-auto mb-6 relative">
                <img 
                  src="https://i.imgur.com/505s4aV.png" 
                  alt="Renata Andrade" 
                  className="w-full h-full rounded-full object-cover border-4 border-yellow-400 shadow-lg" 
                  referrerPolicy="no-referrer" 
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <span className="text-yellow-500 text-[9px] font-black uppercase tracking-[0.2em] mb-2 block">Sobre a Autora</span>
              <h3 className="text-3xl font-black font-display text-slate-900 mb-1 uppercase tracking-tight">Renata Andrade</h3>
              <p className="text-slate-400 font-bold text-xs mb-8">Professora de História • Especialista em Metodologias Ativas</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8 border-y border-gray-50 py-6">
                <div>
                  <p className="text-xl font-black text-slate-900 leading-none mb-1">15+</p>
                  <p className="text-[8px] text-slate-400 uppercase font-black tracking-widest">Anos de<br/>Exp.</p>
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900 leading-none mb-1">2.8k</p>
                  <p className="text-[8px] text-slate-400 uppercase font-black tracking-widest">Professores<br/>Impactados</p>
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900 leading-none mb-1">250</p>
                  <p className="text-[8px] text-slate-400 uppercase font-black tracking-widest">Dinâmicas<br/>Criadas</p>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed font-medium max-w-lg mx-auto">
                Com 15 anos de experiência em escolas federais, militares e privadas, Renata criou este material para transformar o ensino de História em algo leve, prático e altamente engajador para seus alunos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-green-50 border-2 border-green-500 rounded-3xl p-8 md:p-12 text-center shadow-lg">
          <ShieldCheck size={64} className="text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black font-display text-slate-900 mb-4"><span className="text-green-600">Risco Zero:</span> Teste na sua próxima aula</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Você tem <strong>7 dias de garantia incondicional</strong>. Baixe o material, imprima uma dinâmica e aplique com seus alunos. Se a turma não participar mais, ou se você achar que não economizou horas de planejamento, devolvemos 100% do seu dinheiro. Sem burocracia e sem questionamentos.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-10">Ainda tem <span className="text-yellow-500">dúvidas?</span></h2>
          <AccordionItem question="Para quem é esse material?" answer="Para professores de História do Ensino Fundamental e Médio que buscam aulas mais dinâmicas e querem economizar tempo de planejamento." />
          <AccordionItem question="Em quanto tempo recebo o acesso?" answer="O acesso é imediato logo após a confirmação do pagamento. Você receberá um e-mail com os dados de acesso." />
          <AccordionItem question="O material funciona em qual formato?" answer="Todo o material é entregue em formato digital (PDF), pronto para você baixar e imprimir." />
          <AccordionItem question="Como funciona a garantia?" answer="Você tem 7 dias para testar. Se não gostar, basta enviar um e-mail e devolvemos todo o seu dinheiro. Além disso, no pacote Premium, você ganha um bônus de garantia estendida para 15 dias." />
          <AccordionItem question="Posso usar com qualquer ano escolar?" answer="Sim! As dinâmicas são adaptáveis para turmas do Ensino Fundamental (anos finais) e Ensino Médio." />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 text-gray-400 text-center py-12 text-sm border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center gap-4 mb-6">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
              <ShieldCheck size={20} className="text-green-500" />
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
              <Lock size={20} className="text-yellow-500" />
            </div>
          </div>
          <p className="font-bold text-gray-600">© 2026 Dinâmicas de História. Todos os direitos reservados.</p>
          <p className="mt-2 text-xs opacity-60">Este produto é digital. Você receberá acesso por e-mail após o pagamento.</p>
        </div>
      </footer>
    </div>
  );
}
