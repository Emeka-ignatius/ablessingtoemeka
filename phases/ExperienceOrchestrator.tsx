'use client';
import { useEffect, useState } from 'react';
import { usePhaseStore } from '@/hooks/usePhase';
import { CONFIG } from '@/constants/content';
import { audioManager } from '@/lib/audio';
import { AppCanvas } from '@/components/canvas/AppCanvas';
import { InvitationScene } from './Invitation/InvitationScene';
import { GateScene } from './Gate/GateScene';
import { RevealScene } from './Reveal/RevealScene';
import { JourneySceneManager } from './Journey/JourneySceneManager';
import { LetterScene } from './Letter/LetterScene';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExperienceOrchestrator() {
  const { 
    activePhase, 
    setPhase, 
    userInteracted, 
    setUserInteracted, 
    currentQuestionIndex, 
    nextQuestion,
    currentSceneIndex,
    nextScene,
    prevScene,
    unlockedNavigation,
    jumpToScene
  } = usePhaseStore();

  const [hintsShown, setHintsShown] = useState(0);
  const [selectedWrong, setSelectedWrong] = useState<number | null>(null);

  useEffect(() => {
    audioManager.init(CONFIG.letter.songUrl);
  }, []);

  const handleUserStart = () => {
    setUserInteracted();
    setPhase('invitation');
  };

  const handleQuizOption = (optIndex: number) => {
    const currentQ = CONFIG.quiz[currentQuestionIndex];
    if (optIndex === currentQ.correctIndex) {
      setSelectedWrong(null);
      setHintsShown(0);
      if (currentQuestionIndex < CONFIG.quiz.length - 1) {
        nextQuestion();
      } else {
        setPhase('reveal');
        audioManager.playSong();
      }
    } else {
      setSelectedWrong(optIndex);
      setHintsShown(prev => prev + 1);
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden select-none bg-space-black">
      {/* 3D Canvas Background */}
      <AppCanvas>
        {activePhase === 'invitation' && <InvitationScene />}
        {activePhase === 'gate' && <GateScene />}
        {activePhase === 'reveal' && <RevealScene />}
        {activePhase === 'journey' && <JourneySceneManager />}
        {activePhase === 'letter' && <LetterScene />}
      </AppCanvas>

      {/* HTML UI overlays */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-none p-6 md:p-12">
        {/* HUD Top Bar */}
        <div className="w-full flex justify-between items-center pointer-events-auto">
          <h1 className="font-serif italic text-lg tracking-widest text-space-gold-light">Fusco & Momo</h1>
          {activePhase === 'gate' && (
            <div className="w-48">
              <Progress value={((currentQuestionIndex) / CONFIG.quiz.length) * 100} />
            </div>
          )}
        </div>

        {/* Interactive Screen Center Content */}
        <div className="flex-1 flex items-center justify-center pointer-events-auto">
          <AnimatePresence mode="wait">
            {activePhase === 'loading' && (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="font-serif italic text-xl text-space-gold-light mb-6">Momo's Anniversary Journey</p>
                <Button onClick={handleUserStart}>Enter the stars</Button>
              </motion.div>
            )}

            {activePhase === 'invitation' && (
              <motion.div 
                key="inv"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="text-center max-w-md"
              >
                <h2 className="font-serif italic text-4xl mb-4 tracking-wider text-space-rose">Momo</h2>
                <p className="text-sm font-sans tracking-widest uppercase text-space-gold-light mb-8">Someone left something here for you.</p>
                <Button onClick={() => setPhase('gate')}>Open it 💕</Button>
              </motion.div>
            )}

            {activePhase === 'gate' && (
              <motion.div 
                key="quiz"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-space-black/80 border border-space-gold/30 rounded-2xl p-8 max-w-md w-full backdrop-blur-md shadow-2xl"
              >
                <p className="text-xs uppercase tracking-widest text-space-gold mb-2">Question {currentQuestionIndex + 1} of {CONFIG.quiz.length}</p>
                <h3 className="font-serif text-lg text-space-paper mb-6">{CONFIG.quiz[currentQuestionIndex].question}</h3>
                <div className="flex flex-col gap-3">
                  {CONFIG.quiz[currentQuestionIndex].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizOption(idx)}
                      className={`w-full py-3 px-4 rounded-xl text-left text-sm transition-all duration-300 border cursor-pointer ${
                        selectedWrong === idx 
                          ? 'border-red-500/50 bg-red-950/20 text-red-200' 
                          : 'border-white/10 hover:border-space-gold/50 bg-white/5 text-space-paper'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {hintsShown >= 2 && (
                  <p className="mt-4 text-xs italic text-space-rose/80 text-center transition-all duration-300">
                    Hint: {CONFIG.quiz[currentQuestionIndex].hint}
                  </p>
                )}
              </motion.div>
            )}

            {activePhase === 'reveal' && (
              <motion.div 
                key="reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center max-w-lg"
              >
                <h2 className="font-serif italic text-3xl md:text-5xl text-space-rose mb-4 animate-pulse">Happy Anniversary</h2>
                <p className="font-sans text-sm uppercase tracking-widest text-space-gold-light mb-10">Momo.</p>
                <Button onClick={() => setPhase('journey')}>Let's travel back... 🎞️</Button>
              </motion.div>
            )}

            {activePhase === 'journey' && (
              <motion.div 
                key="journey"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-between w-full h-full max-h-[80vh]"
              >
                <div className="bg-space-black/70 border border-white/5 rounded-2xl p-6 max-w-xl text-center backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-widest text-space-gold mb-1">{CONFIG.memories[currentSceneIndex].label}</p>
                  <p className="text-[10px] text-white/50 tracking-wider mb-3">{CONFIG.memories[currentSceneIndex].date}</p>
                  <h3 className="font-serif italic text-2xl text-space-paper mb-4">{CONFIG.memories[currentSceneIndex].title}</h3>
                  <p className="text-sm leading-relaxed text-space-paper/80 font-serif">{CONFIG.memories[currentSceneIndex].story}</p>
                </div>

                <div className="flex gap-4 mt-8 pointer-events-auto">
                  {currentSceneIndex > 0 && (
                    <Button variant="outline" onClick={prevScene}>Back</Button>
                  )}
                  {currentSceneIndex < CONFIG.memories.length - 1 ? (
                    <Button onClick={nextScene}>Next Moment</Button>
                  ) : (
                    <Button onClick={() => setPhase('letter')}>Read Letter →</Button>
                  )}
                </div>
              </motion.div>
            )}

            {activePhase === 'letter' && (
              <motion.div 
                key="letter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-space-paper border border-space-sepia/20 rounded-2xl p-8 max-w-xl max-h-[70vh] overflow-y-auto shadow-2xl pointer-events-auto"
              >
                <p className="font-serif text-space-sepia whitespace-pre-line leading-relaxed text-base italic">
                  {CONFIG.letter.body}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation/Menu Map and Sound toggler */}
        <div className="w-full flex justify-between items-center mt-auto">
          <div>
            {unlockedNavigation && (
              <div className="flex gap-2 pointer-events-auto">
                {CONFIG.memories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPhase('journey');
                      jumpToScene(idx);
                    }}
                    className={`w-8 h-8 rounded-full border border-space-gold/30 font-sans text-xs flex items-center justify-center cursor-pointer ${
                      currentSceneIndex === idx && activePhase === 'journey' 
                        ? 'bg-space-gold text-space-black' 
                        : 'bg-space-black/50 text-space-gold-light hover:bg-space-gold/25'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button 
                  onClick={() => setPhase('letter')}
                  className={`w-8 h-8 rounded-full border border-space-rose/30 font-sans text-xs flex items-center justify-center cursor-pointer ${
                    activePhase === 'letter' 
                      ? 'bg-space-rose text-white' 
                      : 'bg-space-black/50 text-space-rose hover:bg-space-rose/25'
                  }`}
                >
                  ✉️
                </button>
              </div>
            )}
          </div>
          {userInteracted && (
            <button
              onClick={() => {
                const muted = !audioManager.getVolume();
                audioManager.setMute(!muted);
              }}
              className="pointer-events-auto w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-space-black/40 hover:bg-white/5 transition-all text-lg cursor-pointer"
            >
              🔊
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
