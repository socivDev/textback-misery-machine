
import { useState } from "react";
import { RefreshCw, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";

// Array of meme images
const memes = [
  "https://i.imgur.com/KEEPM6V.jpeg",
  "https://i.imgur.com/TDKjNRE.jpeg",
  "https://i.imgur.com/Y7fbEzE.jpeg",
  "https://i.imgur.com/xGS5qvK.jpeg",
  "https://i.imgur.com/lnKPOJH.jpeg",
  "https://i.imgur.com/w1oXxGM.jpeg",
  "https://i.imgur.com/JV9pSqk.jpeg",
  "https://i.imgur.com/sY0KxoW.jpeg"
];

export function MemesViewer() {
  const { language } = useLanguage();
  const [currentMemeIndex, setCurrentMemeIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const refreshMeme = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentMemeIndex((prev) => (prev + 1) % memes.length);
      setIsLoading(false);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-20 left-4 z-50 bg-gradient-to-r from-pink-600/90 to-violet-600/90 text-white border-white/20 hover:bg-gradient-to-r hover:from-pink-700/90 hover:to-violet-700/90 hover:border-white/40 shadow-lg"
        >
          <Images className="w-5 h-5 mr-2" />
          {language === 'zh' ? '治愈模因' : 'Comfort Memes'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-gradient-to-b from-pink-50 to-violet-50 border-2 border-pink-200/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            {language === 'zh' ? '治愈模因' : 'Comfort Memes'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-2">
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
            <img 
              src={memes[currentMemeIndex]} 
              alt="Comfort meme" 
              className={`object-contain max-h-[60vh] transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-pink-500 animate-spin" />
              </div>
            )}
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={refreshMeme}
              size="lg" 
              className="gap-2 px-6 py-5 h-auto text-lg font-medium hover:scale-105 transition-transform bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-md"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : 'animate-pulse'}`} />
              {language === 'zh' ? '刷新模因' : 'New Meme'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
