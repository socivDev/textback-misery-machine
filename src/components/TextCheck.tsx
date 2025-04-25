
import { useState } from "react";
import { excuses, responses } from "@/data/excuses";
import { Button } from "@/components/ui/button";
import { RefreshCw, Language } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function TextCheck() {
  const { language, toggleLanguage } = useLanguage();
  const [excuse, setExcuse] = useState(() => excuses[Math.floor(Math.random() * excuses.length)]);
  const [response, setResponse] = useState(() => responses[Math.floor(Math.random() * responses.length)]);

  const refreshContent = () => {
    const newExcuse = excuses[Math.floor(Math.random() * excuses.length)];
    const newResponse = responses[Math.floor(Math.random() * responses.length)];
    setExcuse(newExcuse);
    setResponse(newResponse);
  };

  return (
    <div className="space-y-8 text-center max-w-lg mx-auto px-4">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleLanguage}
        className="absolute top-4 right-4 hover:bg-pink-100"
      >
        <Language className="w-5 h-5 mr-2" />
        {language === 'zh' ? 'EN' : '中文'}
      </Button>

      <div className="space-y-4 animate-fade-in">
        <div className="text-8xl sm:text-9xl animate-bounce">{response.emoji}</div>
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
          {response.text[language]}
        </h2>
        <p className="text-xl sm:text-2xl text-gray-600 font-medium leading-relaxed">
          {excuse[language]}
        </p>
      </div>
      
      <Button 
        onClick={refreshContent}
        size="lg"
        className="text-lg font-semibold px-8 py-6 h-auto gap-2 hover:scale-110 transition-transform bg-gradient-to-r from-pink-500 to-violet-500 hover:from-violet-500 hover:to-pink-500"
      >
        <RefreshCw className="w-5 h-5 animate-spin-slow" />
        {language === 'zh' ? '刷新我的痛苦' : 'Refresh My Pain'}
      </Button>
    </div>
  );
}
