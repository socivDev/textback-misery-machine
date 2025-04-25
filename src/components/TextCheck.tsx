
import { useState } from "react";
import { excuses, responses } from "@/data/excuses";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function TextCheck() {
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
      <div className="space-y-4 animate-fade-in">
        <div className="text-8xl sm:text-9xl">{response.emoji}</div>
        <h2 className="text-4xl sm:text-5xl font-extrabold">{response.text}</h2>
        <p className="text-xl sm:text-2xl text-gray-600 font-medium leading-relaxed">
          {excuse}
        </p>
      </div>
      
      <Button 
        onClick={refreshContent}
        size="lg"
        className="text-lg font-semibold px-8 py-6 h-auto gap-2 hover:scale-105 transition-transform"
      >
        <RefreshCw className="w-5 h-5" />
        Refresh My Pain
      </Button>
    </div>
  );
}
