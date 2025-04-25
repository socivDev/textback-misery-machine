
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

  const newFortune = () => {
    setFortune(fortunes[Math.floor(Math.random() * fortunes.length)]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="lg"
          className="text-lg font-semibold px-8 py-6 h-auto gap-2 hover:border-pink-300 border-2 hover:scale-110 transition-transform bg-white/50 backdrop-blur-sm"
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
          <div className="text-6xl animate-bounce-slow">
            🥠
          </div>
          <p className="text-xl text-center font-medium text-gray-700">
            {fortune[language]}
          </p>
          <Button 
            variant="outline" 
            onClick={newFortune}
            className="mt-4"
          >
            {language === 'zh' ? '再来一个' : 'Another Fortune'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
