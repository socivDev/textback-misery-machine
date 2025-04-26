
import { useState } from "react";
import { Languages, Instagram, Bell, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Switch } from "@/components/ui/switch";

export function Navbar({ autoPainMode, setAutoPainMode, streak }: { 
  autoPainMode: boolean; 
  setAutoPainMode: (value: boolean) => void;
  streak: number;
}) {
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-pink-800/95 to-violet-800/95 backdrop-blur-lg z-50 py-4 px-4 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-full shadow-inner">
            <span className="text-sm text-white whitespace-nowrap font-medium">
              {language === 'zh' ? '自动痛苦' : 'Auto-Pain'}
            </span>
            <Switch 
              checked={autoPainMode} 
              onCheckedChange={setAutoPainMode}
              className="data-[state=checked]:bg-pink-500 shadow-sm"
            />
          </div>
          
          <Button 
            variant="outline"
            size="icon"
            onClick={() => window.open('https://instagram.com/your-instagram', '_blank')}
            className="relative bg-gradient-to-r from-pink-500/20 to-violet-500/20 hover:from-pink-500/40 hover:to-violet-500/40 text-white border-white/20 hover:border-white/40 hover:scale-105 transition-transform"
          >
            <Instagram className="w-5 h-5" />
            <span className="sr-only">Instagram</span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 transition-all duration-300 text-white shadow-md group"
          >
            <Languages className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium">
              {language === 'zh' ? 'EN' : '中文'}
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
