
import { useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import { fortunes } from "@/data/excuses";

export function FortuneCookie() {
  const { language } = useLanguage();
  const [fortune, setFortune] = useState(() => fortunes[Math.floor(Math.random() * fortunes.length)]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cracked, setCracked] = useState(false);

  const newFortune = () => {
    setIsAnimating(true);
    setCracked(false);
    
    setTimeout(() => {
      setFortune(fortunes[Math.floor(Math.random() * fortunes.length)]);
      setIsAnimating(false);
      
      // Crack the cookie after a short delay
      setTimeout(() => setCracked(true), 500);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          onClick={() => {
            // Reset the cracked state when opening
            setTimeout(() => setCracked(true), 1000);
          }}
          className="text-lg font-semibold px-8 py-6 h-auto gap-2 bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 border-2 border-amber-300 hover:border-amber-400 text-amber-900 hover:scale-105 transition-all shadow-md hover:shadow-lg"
        >
          <Cookie className="w-5 h-5 text-amber-700" />
          {language === 'zh' ? '打开幸运饼干' : 'Open Fortune Cookie'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-amber-50/95 backdrop-blur-sm border-2 border-amber-300 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-amber-700 to-orange-600 text-transparent bg-clip-text">
            {language === 'zh' ? '今日幸运' : 'Your Fortune Cookie Says...'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-6">
          <div 
            className={`relative transition-all duration-500 ${
              isAnimating ? 'scale-150 rotate-180' : ''
            } ${cracked ? 'opacity-100' : 'opacity-80'} cursor-pointer`}
            onClick={() => !cracked && setCracked(true)}
          >
            {/* Cookie plate */}
            <div className="w-32 h-8 rounded-full bg-amber-100 border border-amber-200 absolute -bottom-4 left-1/2 transform -translate-x-1/2 shadow-inner"></div>
            
            {/* Cookie */}
            <div className={`transition-all duration-500 ${cracked ? 'scale-100 opacity-100' : 'scale-110 opacity-90'}`}>
              <div className={`w-28 h-24 relative ${cracked ? 'animate-none' : 'animate-float'}`}>
                {/* Whole cookie - shown before crack */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${cracked ? 'opacity-0' : 'opacity-100'}`}>
                  🥠
                </div>
                
                {/* Cracked cookie - shown after crack */}
                <div className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${cracked ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="relative">
                    <span className="text-6xl">🥠</span>
                    
                    {/* Paper strip */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-6 bg-white/90 rounded-sm shadow-sm flex items-center justify-center text-xs text-amber-900 font-medium animate-pulse">
                      {language === 'zh' ? '你的幸运' : 'Your fortune'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`bg-white/80 backdrop-blur-sm p-5 rounded-lg border border-amber-200 shadow-md max-w-xs w-full transition-all duration-500 ${cracked ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <p className="text-xl text-center font-medium text-amber-900 animate-fade-in leading-relaxed">
              {fortune[language]}
            </p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={newFortune}
            className="mt-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white border-amber-300 hover:scale-105 transition-all shadow-md"
            disabled={isAnimating}
          >
            {language === 'zh' ? '再来一个' : 'Another Fortune'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
