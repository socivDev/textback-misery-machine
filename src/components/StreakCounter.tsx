
import { useEffect, useState } from "react";
import { Bell, Star, Award, Flame, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "./ui/button";

export function StreakCounter({ streak }: { streak: number }) {
  const { language } = useLanguage();
  const [showDialog, setShowDialog] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);

  useEffect(() => {
    const lastVisit = localStorage.getItem('lastVisitDate');
    const today = new Date().toDateString();
    if (lastVisit !== today) {
      setShowDialog(true);
      setIsNew(true);
    }
    
    // Add periodic animation to the streak button
    const interval = setInterval(() => {
      setAnimateButton(true);
      setTimeout(() => setAnimateButton(false), 2000);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const getStreakEmoji = () => {
    if (streak >= 10) return "🏆";
    if (streak >= 5) return "🔥";
    if (streak >= 3) return "⭐";
    return "🌟";
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setShowDialog(true)}
        className={`group relative bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white border-2 border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300 ${animateButton ? 'animate-[pulse_0.5s_ease-in-out_3]' : ''}`}
      >
        <div className="flex items-center gap-2">
          <Flame className={`w-5 h-5 text-yellow-300 ${animateButton ? 'animate-[bounce_0.5s_ease-in-out_infinite]' : 'group-hover:scale-110 transition-transform'}`} />
          <span className="font-bold">
            {language === 'zh' ? `连续: ${streak} 天` : `${streak} Day Streak`}
          </span>
          {streak >= 3 && (
            <Star className={`w-4 h-4 text-yellow-300 ${animateButton ? 'animate-spin' : 'animate-pulse'}`} />
          )}
          {streak >= 7 && (
            <Trophy className={`w-4 h-4 text-yellow-300 ${animateButton ? 'animate-bounce' : 'animate-pulse'}`} />
          )}
        </div>
        
        {animateButton && (
          <span className="absolute -inset-1 rounded-md bg-gradient-to-r from-orange-400/20 to-red-500/20 animate-ping"></span>
        )}
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-gradient-to-b from-orange-50 to-red-50 border-2 border-orange-200">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              {isNew ? (
                language === 'zh' ? "今日登录奖励！" : "Daily Login Reward!"
              ) : (
                language === 'zh' ? "你的连续记录" : "Your Streak Stats"
              )}
              <Bell className="w-6 h-6 text-orange-500 animate-bounce" />
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-4">
            <div className="flex justify-center">
              <div className={`text-6xl ${isNew ? 'animate-[bounce_1s_ease-in-out_infinite]' : 'animate-[bounce_2s_ease-in-out_infinite]'}`}>
                {getStreakEmoji()}
              </div>
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
                {language === 'zh' 
                  ? `已连续沉浸在痛苦中 ${streak} 天`
                  : `${streak} Days of Consistent Pain`}
              </h3>
              <p className="text-gray-700">
                {language === 'zh'
                  ? "继续保持，让痛苦成为日常！"
                  : "Keep going, make the pain a daily routine!"}
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {streak >= 3 && (
                  <Badge className="bg-gradient-to-r from-orange-100 to-yellow-200 text-orange-700 border border-orange-300 px-3 py-1">
                    <Star className="w-3 h-3 mr-1 text-yellow-500" />
                    {language === 'zh' ? "初级痛苦" : "Pain Beginner"}
                  </Badge>
                )}
                
                {streak >= 5 && (
                  <Badge className="bg-gradient-to-r from-orange-200 to-red-200 text-orange-700 border border-orange-300 px-3 py-1">
                    <Flame className="w-3 h-3 mr-1 text-orange-500" />
                    {language === 'zh' ? "痛苦专家" : "Pain Expert"}
                  </Badge>
                )}
                
                {streak >= 10 && (
                  <Badge className="bg-gradient-to-r from-yellow-200 to-amber-300 text-amber-700 border border-yellow-400 px-3 py-1">
                    <Trophy className="w-3 h-3 mr-1 text-amber-500" />
                    {language === 'zh' ? "痛苦大师" : "Pain Master"}
                  </Badge>
                )}
              </div>
              
              {isNew && (
                <div className="mt-4 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg border border-orange-200 animate-pulse">
                  <p className="font-medium text-orange-800">
                    {language === 'zh' 
                      ? "恭喜你今天又来体验痛苦了！" 
                      : "Congratulations on coming back for more pain today!"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
