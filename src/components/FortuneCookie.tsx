
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

  const newFortune = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setFortune(fortunes[Math.floor(Math.random() * fortunes.length)]);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="lg"
          className="text-lg font-semibold px-8 py-6 h-auto gap-2 hover:border-pink-300 border-2 hover:scale-110 transition-transform bg-white/50 backdrop-blur-sm shadow-md hover:shadow-lg"
        >
          <Cookie className="w-5 h-5" />
          {language === 'zh' ? '打开幸运饼干' : 'Open Fortune Cookie'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-2">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {language === 'zh' ? '今日运势' : 'Your Fortune Says...'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-6">
          <div className={`text-6xl transition-transform duration-500 ${isAnimating ? 'scale-150 rotate-180' : ''}`}>
            🥠
          </div>
          <p className="text-xl text-center font-medium text-gray-700 animate-fade-in">
            {fortune[language]}
          </p>
          <Button 
            variant="outline" 
            onClick={newFortune}
            className="mt-4 hover:scale-105 transition-transform"
          >
            {language === 'zh' ? '再来一个' : 'Another Fortune'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
