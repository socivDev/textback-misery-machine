
import { useEffect, useState } from "react";
import { Bell, Star, Award } from "lucide-react";
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

  useEffect(() => {
    const lastVisit = localStorage.getItem('lastVisitDate');
    const today = new Date().toDateString();
    if (lastVisit !== today) {
      setShowDialog(true);
      setIsNew(true);
    }
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
        className="group relative bg-gradient-to-r from-pink-100 to-violet-100 hover:from-pink-200 hover:to-violet-200 border-2 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform" />
          <span className="font-semibold">
            {language === 'zh' ? `连续: ${streak} 天` : `${streak} Day Streak`}
          </span>
          {streak >= 3 && (
            <Star className="w-4 h-4 text-yellow-500 animate-pulse" />
          )}
        </div>
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-gradient-to-b from-white to-pink-50 border-2">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              {isNew ? (
                language === 'zh' ? "今日登录奖励！" : "Daily Login Reward!"
              ) : (
                language === 'zh' ? "你的连续记录" : "Your Streak Stats"
              )}
              <Bell className="w-6 h-6 text-pink-500 animate-bounce" />
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-4">
            <div className="flex justify-center">
              <div className="text-6xl animate-bounce-slow">{getStreakEmoji()}</div>
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
                {language === 'zh' 
                  ? `已连续沉浸在痛苦中 ${streak} 天`
                  : `${streak} Days of Consistent Pain`}
              </h3>
              <p className="text-gray-600">
                {language === 'zh'
                  ? "继续保持，让痛苦成为日常！"
                  : "Keep going, make the pain a daily routine!"}
              </p>
              {streak >= 5 && (
                <Badge variant="outline" className="bg-gradient-to-r from-yellow-100 to-yellow-200 px-3 py-1">
                  {language === 'zh' ? "痛苦大师" : "Pain Master"}
                </Badge>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
