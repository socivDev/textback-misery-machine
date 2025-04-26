
import { useState, useEffect } from "react";
import { excuses, responses } from "@/data/excuses";
import { Button } from "@/components/ui/button";
import { RefreshCw, ZapOff, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { Navbar } from "./Navbar";
import { FortuneCookie } from "./FortuneCookie";
import { ShareInstructions } from "./ShareInstructions";
import { StreakCounter } from "./StreakCounter";
import { MusicPlayer } from "./MusicPlayer";
import { MemesViewer } from "./MemesViewer";
import { Newsletter } from "./Newsletter";

export function TextCheck() {
  const { language } = useLanguage();
  const [excuse, setExcuse] = useState(() => excuses[Math.floor(Math.random() * excuses.length)]);
  const [response, setResponse] = useState(() => responses[Math.floor(Math.random() * responses.length)]);
  const [autoPainMode, setAutoPainMode] = useState(false);
  const [streak, setStreak] = useState(0);
  const [refreshCount, setRefreshCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize streak from localStorage and update it
  useEffect(() => {
    // Check last visit date
    const lastVisit = localStorage.getItem('lastVisitDate');
    const today = new Date().toDateString();
    
    if (lastVisit) {
      if (lastVisit !== today) {
        // It's a new day
        const currentStreak = Number(localStorage.getItem('streak') || '0');
        
        // If yesterday, increase streak, otherwise reset
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isConsecutive = lastVisit === yesterday.toDateString();
        
        const newStreak = isConsecutive ? currentStreak + 1 : 1;
        setStreak(newStreak);
        localStorage.setItem('streak', newStreak.toString());
        
        // Show toast if streak increases
        if (newStreak > 1) {
          toast({
            title: language === 'zh' ? '连续来访！' : 'Streak Updated!',
            description: language === 'zh' 
              ? `你已连续 ${newStreak} 天沉浸在痛苦中` 
              : `You've been wallowing in pain for ${newStreak} days in a row!`,
          });
        }
      } else {
        // Same day visit, retrieve streak
        setStreak(Number(localStorage.getItem('streak') || '0'));
      }
    } else {
      // First visit ever
      setStreak(1);
      localStorage.setItem('streak', '1');
    }
    
    // Update last visit date
    localStorage.setItem('lastVisitDate', today);
  }, [language]);

  // Auto pain mode timer
  useEffect(() => {
    let timer: number | undefined;
    
    if (autoPainMode) {
      timer = window.setInterval(() => {
        refreshContent();
      }, 3000); // Refresh every 3 seconds
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [autoPainMode]);

  // Handle rewards based on refresh count
  useEffect(() => {
    if (refreshCount === 10) {
      toast({
        title: language === 'zh' ? '成就解锁！' : 'Achievement Unlocked!',
        description: language === 'zh' ? '痛苦大师' : 'Pain Master',
      });
    }
    
    if (refreshCount === 25) {
      toast({
        title: language === 'zh' ? '新表情解锁！' : 'New Emoji Unlocked!',
        description: language === 'zh' ? '点击刷新得到惊喜' : 'Click refresh for a surprise',
      });
    }
  }, [refreshCount, language]);

  const refreshContent = () => {
    // Start animation
    setIsAnimating(true);
    
    // Update refresh count
    setRefreshCount(prev => prev + 1);
    
    setTimeout(() => {
      // Special rewards for frequent refreshers
      if (refreshCount === 25) {
        // Special response (rare "yes" joke)
        setResponse({
          text: { en: "YES! (just kidding)", zh: "有！（开玩笑的）" },
          emoji: "🤡"
        });
        
        setTimeout(() => {
          // Reset after showing the joke
          setResponse(responses[Math.floor(Math.random() * responses.length)]);
        }, 2000);
      } else {
        // Normal random content
        const newExcuse = excuses[Math.floor(Math.random() * excuses.length)];
        const newResponse = responses[Math.floor(Math.random() * responses.length)];
        
        setExcuse(newExcuse);
        setResponse(newResponse);
      }
      
      // End animation
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col font-[Poppins] bg-gradient-to-b from-pink-50 to-violet-100">
      <Navbar autoPainMode={autoPainMode} setAutoPainMode={setAutoPainMode} streak={streak} />
      
      <div className="flex-1 pt-24 pb-12 px-4">
        <div className="space-y-8 text-center max-w-2xl mx-auto">
          <div className="flex justify-center">
            <StreakCounter streak={streak} />
          </div>

          <div className={`space-y-6 animate-fade-in ${isAnimating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
            <div className={`text-8xl sm:text-9xl transition-all duration-500 hover:scale-110 ${autoPainMode ? 'animate-bounce scale-110' : 'animate-[bounce_4s_ease-in-out_infinite]'}`}>
              {response.emoji}
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-600 to-violet-600 text-transparent bg-clip-text transition-all duration-300 hover:scale-105 transform">
              {response.text[language]}
            </h2>
            
            <p className="text-xl sm:text-2xl text-gray-700 font-medium leading-relaxed max-w-xl mx-auto">
              {excuse[language]}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={refreshContent}
              size="lg"
              className="text-xl font-bold px-10 py-8 h-auto gap-3 hover:scale-105 transform transition-transform bg-gradient-to-r from-pink-600 to-violet-600 hover:from-violet-600 hover:to-pink-600 shadow-xl hover:shadow-2xl border-2 border-white/20 rounded-2xl relative overflow-hidden group"
            >
              {autoPainMode ? (
                <Zap className="w-6 h-6 text-yellow-300 animate-pulse" />
              ) : (
                <RefreshCw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
              )}
              <span className="relative z-10">{language === 'zh' ? '刷新我的痛苦' : 'Refresh My Pain'}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-white/20 to-pink-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            </Button>
            
            <FortuneCookie />
          </div>
          
          <ShareInstructions />
        </div>
      </div>

      {/* Fixed positioned components */}
      <MusicPlayer />
      <MemesViewer />
      <Newsletter />

      <footer className="w-full py-8 px-4 bg-gradient-to-r from-pink-800/95 to-violet-800/95 backdrop-blur-md border-t border-white/10 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <a
            href="https://instagram.com/your-instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-pink-500/80 to-violet-500/80 hover:from-pink-500 hover:to-violet-500 text-white font-medium transition-all hover:scale-105 shadow-md hover:shadow-xl border border-white/20"
          >
            {language === 'zh' ? '购买我们的痛苦T恤 →' : 'Get our Pain T-shirts →'}
          </a>
          <p className="text-sm text-white/70">
            {language === 'zh' ? '自2025年起每日提供被拒绝的痛苦' : 'Daily doses of rejection since 2025'}
          </p>
        </div>
      </footer>
    </div>
  );
}
