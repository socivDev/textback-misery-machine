
import { useState } from "react";
import { Languages, ShoppingCart, Award, Cookie, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Switch } from "@/components/ui/switch";

export function Navbar({ 
  showShop, 
  showAchievements, 
  cookies = 0,
  coins = 0
}: { 
  showShop: () => void;
  showAchievements: () => void;
  cookies: number;
  coins: number;
}) {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-amber-800/95 to-amber-700/95 backdrop-blur-lg z-50 py-3 px-4 border-b border-amber-500/30 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-amber-700/60 backdrop-blur-md p-2 rounded-full shadow-inner">
            <Cookie className="w-5 h-5 text-amber-200" />
            <span className="text-sm text-amber-100 whitespace-nowrap font-medium">
              {language === 'zh' ? '饼干点击器' : 'Cookie Clicker'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Cookie counter */}
          <div className="flex items-center gap-1 bg-amber-700/40 px-3 py-1.5 rounded-full border border-amber-500/30">
            <Cookie className="w-4 h-4 text-amber-200" />
            <span className="text-sm font-semibold text-amber-100">{cookies}</span>
          </div>
          
          {/* Coin counter */}
          <div className="flex items-center gap-1 bg-amber-700/40 px-3 py-1.5 rounded-full border border-amber-500/30">
            <Coins className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-semibold text-amber-100">{coins}</span>
          </div>
          
          {/* Nav buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={showShop}
            className="bg-amber-700/40 hover:bg-amber-600/60 text-amber-100"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="sr-only md:not-sr-only md:ml-2">
              {language === 'zh' ? '商店' : 'Shop'}
            </span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={showAchievements}
            className="bg-amber-700/40 hover:bg-amber-600/60 text-amber-100"
          >
            <Award className="w-5 h-5" />
            <span className="sr-only md:not-sr-only md:ml-2">
              {language === 'zh' ? '成就' : 'Achievements'}
            </span>
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="bg-amber-700/40 hover:bg-amber-600/60 border border-amber-500/50 hover:border-amber-400/70 transition-all duration-300 text-amber-100 shadow-md group"
          >
            <Languages className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium">
              {language === 'zh' ? 'EN' : '中文'}
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
