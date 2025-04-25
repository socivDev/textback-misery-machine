
import { useState, useEffect } from "react";
import { excuses, responses, fortunes } from "@/data/excuses";
import { Button } from "@/components/ui/button";
import { RefreshCw, Languages, GiftIcon, Fortune } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/hooks/use-toast";

export function TextCheck() {
  const { language, toggleLanguage } = useLanguage();
  const [excuse, setExcuse] = useState(() => excuses[Math.floor(Math.random() * excuses.length)]);
  const [response, setResponse] = useState(() => responses[Math.floor(Math.random() * responses.length)]);
  const [fortune, setFortune] = useState(() => fortunes[Math.floor(Math.random() * fortunes.length)]);
  const [autoPainMode, setAutoPainMode] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showFortune, setShowFortune] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

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
    // Update refresh count
    setRefreshCount(prev => prev + 1);
    
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
      const newFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      
      setExcuse(newExcuse);
      setResponse(newResponse);
      setFortune(newFortune);
      setShowFortune(false);
    }
  };

  const takeScreenshot = () => {
    // This is just a placeholder - in a real implementation
    // we would use html2canvas or a similar library to capture the content
    toast({
      title: language === 'zh' ? '截图功能' : 'Screenshot Feature',
      description: language === 'zh' ? 
        '截图功能将在完整版本中提供' : 
        'Screenshot feature will be available in the full version',
    });
  };

  const toggleFortune = () => {
    setShowFortune(prev => !prev);
  };

  const getStreakBadge = () => {
    if (streak >= 10) return language === 'zh' ? '幽灵猎人' : 'Ghost Hunter';
    if (streak >= 5) return language === 'zh' ? '被遗忘专家' : 'Forgotten Expert';
    if (streak >= 3) return language === 'zh' ? '坚持等待者' : 'Persistent Waiter';
    return language === 'zh' ? '新手等待者' : 'Novice Waiter';
  };

  return (
    <div className="space-y-8 text-center max-w-lg mx-auto px-4">
      <div className="flex justify-between items-center w-full absolute top-4 left-0 right-0 px-4">
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-600">
            {language === 'zh' ? '自动痛苦模式' : 'Auto-Pain Mode'}:
          </span>
          <Switch 
            checked={autoPainMode} 
            onCheckedChange={setAutoPainMode}
            className="data-[state=checked]:bg-pink-500"
          />
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleLanguage}
          className="hover:bg-pink-100"
        >
          <Languages className="w-5 h-5 mr-2" />
          {language === 'zh' ? 'EN' : '中文'}
        </Button>
      </div>
      
      {/* Streak counter */}
      <div className="absolute top-16 left-0 right-0 flex justify-center">
        <Badge variant="outline" className="bg-gradient-to-r from-pink-200 to-violet-200 px-3 py-1">
          <GiftIcon className="w-4 h-4 mr-1" />
          {language === 'zh' ? `连续: ${streak} 天` : `Streak: ${streak} days`}
          <span className="ml-2 text-xs">({getStreakBadge()})</span>
        </Badge>
      </div>

      <div className={`space-y-4 animate-fade-in ${autoPainMode ? 'animate-pulse' : ''}`}>
        <div className={`text-8xl sm:text-9xl ${autoPainMode ? 'animate-bounce' : 'animate-bounce-slow'}`}>
          {showFortune ? "🥠" : response.emoji}
        </div>
        
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text transition-all duration-300">
          {showFortune ? 
            (language === 'zh' ? '今日运势：' : 'Fortune says:') : 
            response.text[language]
          }
        </h2>
        
        <p className="text-xl sm:text-2xl text-gray-600 font-medium leading-relaxed">
          {showFortune ? fortune[language] : excuse[language]}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={refreshContent}
          size="lg"
          className="text-lg font-semibold px-8 py-6 h-auto gap-2 hover:scale-110 transition-transform bg-gradient-to-r from-pink-500 to-violet-500 hover:from-violet-500 hover:to-pink-500"
        >
          <RefreshCw className={`w-5 h-5 ${autoPainMode ? 'animate-spin' : 'animate-spin-slow'}`} />
          {language === 'zh' ? '刷新我的痛苦' : 'Refresh My Pain'}
        </Button>
        
        <Button
          onClick={toggleFortune}
          size="lg"
          variant="outline"
          className="text-lg font-semibold px-8 py-6 h-auto gap-2 hover:border-pink-300 border-2 hover:scale-110 transition-transform"
        >
          {language === 'zh' ? '打开幸运饼干' : 'Fortune Cookie'}
        </Button>
      </div>
      
      <ToggleGroup type="single" className="justify-center mt-6">
        <ToggleGroupItem value="screenshot" onClick={takeScreenshot}>
          {language === 'zh' ? '截图分享' : 'Screenshot & Share'}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
