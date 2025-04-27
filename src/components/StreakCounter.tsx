
import { useEffect, useState } from "react";
import { Bell, Star, Award, Flame, Trophy, Gift, Sparkles, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

// Define all possible achievements
const ACHIEVEMENTS = [
  { 
    id: "beginner", 
    days: 3, 
    icon: Star, 
    nameEn: "Pain Beginner", 
    nameZh: "初级痛苦",
    colorClass: "from-orange-100 to-yellow-200 text-orange-700 border-orange-300"
  },
  { 
    id: "expert", 
    days: 5, 
    icon: Flame, 
    nameEn: "Pain Expert", 
    nameZh: "痛苦专家",
    colorClass: "from-orange-200 to-red-200 text-orange-700 border-orange-300" 
  },
  { 
    id: "master", 
    days: 10, 
    icon: Trophy, 
    nameEn: "Pain Master", 
    nameZh: "痛苦大师",
    colorClass: "from-yellow-200 to-amber-300 text-amber-700 border-yellow-400" 
  },
  { 
    id: "legend", 
    days: 15, 
    icon: Gift, 
    nameEn: "Pain Legend", 
    nameZh: "痛苦传奇",
    colorClass: "from-purple-200 to-pink-200 text-purple-700 border-purple-300" 
  },
  { 
    id: "immortal", 
    days: 30, 
    icon: BadgeCheck, 
    nameEn: "Pain Immortal", 
    nameZh: "不朽痛苦",
    colorClass: "from-blue-200 to-purple-200 text-blue-700 border-blue-300" 
  }
];

export function StreakCounter({ streak }: { streak: number }) {
  const { language } = useLanguage();
  const [showDialog, setShowDialog] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);
  const [newAchievement, setNewAchievement] = useState<string | null>(null);
  const [dialogEntering, setDialogEntering] = useState(false);

  useEffect(() => {
    const lastVisit = localStorage.getItem('lastVisitDate');
    const lastStreak = Number(localStorage.getItem('lastStreak') || '0');
    const today = new Date().toDateString();
    
    if (lastVisit !== today) {
      setShowDialog(true);
      setIsNew(true);
      
      // Check if any new achievement was unlocked
      ACHIEVEMENTS.forEach(achievement => {
        if (streak >= achievement.days && lastStreak < achievement.days) {
          setNewAchievement(achievement.id);
          // Show toast notification for new achievement
          toast({
            title: language === 'zh' ? "新成就解锁!" : "New Achievement Unlocked!",
            description: language === 'zh' ? achievement.nameZh : achievement.nameEn,
          });
        }
      });
      
      // Save current streak for future comparison
      localStorage.setItem('lastStreak', streak.toString());
    }
    
    // Add periodic subtle animation to the streak button
    const interval = setInterval(() => {
      setAnimateButton(true);
      setTimeout(() => setAnimateButton(false), 2000);
    }, 20000); // Much less frequent animation (every 20 seconds)
    
    return () => clearInterval(interval);
  }, [streak, language]);

  // Handle dialog open/close animations
  useEffect(() => {
    if (showDialog) {
      setDialogEntering(true);
      const timer = setTimeout(() => setDialogEntering(false), 500);
      return () => clearTimeout(timer);
    }
  }, [showDialog]);

  const getStreakEmoji = () => {
    if (streak >= 30) return "👑";
    if (streak >= 15) return "🎁";
    if (streak >= 10) return "🏆";
    if (streak >= 5) return "🔥";
    if (streak >= 3) return "⭐";
    return "🌟";
  };

  // Get all unlocked achievements
  const unlockedAchievements = ACHIEVEMENTS.filter(achievement => 
    streak >= achievement.days
  );

  return (
    <Button
      variant="outline"
      onClick={() => setShowDialog(true)}
      className={`group relative bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white border-2 border-orange-300 shadow-lg hover:shadow-xl transition-all duration-500 ${animateButton ? 'animate-pulse' : ''} py-4 px-6 overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 animate-[pulse_4s_ease-in-out_infinite]" />
      <div className="relative flex items-center gap-2">
        <Flame className={`w-5 h-5 text-yellow-300 ${
          animateButton ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'
        }`} />
        <span className="font-bold group-hover:scale-105 transition-transform">
          {language === 'zh' ? `连续: ${streak} 天` : `${streak} Day Streak`}
        </span>
        {streak >= 3 && (
          <Star className="w-4 h-4 text-yellow-300 animate-[pulse_3s_ease-in-out_infinite]" />
        )}
        {streak >= 7 && (
          <Trophy className="w-4 h-4 text-yellow-300 animate-[pulse_4s_ease-in-out_infinite] opacity-80" />
        )}
      </div>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-gradient-to-b from-orange-50 to-red-50 border-2 border-orange-200 max-w-md w-[90vw] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              {isNew ? (
                language === 'zh' ? "今日登录奖励！" : "Daily Login Reward!"
              ) : (
                language === 'zh' ? "你的连续记录" : "Your Streak Stats"
              )}
              <Bell className="w-6 h-6 text-orange-500 animate-pulse" />
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              {language === 'zh' 
                ? "持续的痛苦会带来成就" 
                : "Consistent pain brings achievements"}
            </DialogDescription>
          </DialogHeader>
          
          <div className={`space-y-6 p-4 transition-all duration-500 ${dialogEntering ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <div className="flex justify-center">
              <div className="text-6xl relative">
                <span className={`absolute -inset-1 rounded-full bg-orange-300/30 blur-md ${isNew ? 'animate-pulse' : ''}`}></span>
                <span className="relative">{getStreakEmoji()}</span>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
                {language === 'zh' 
                  ? `已连续沉浸在痛苦中 ${streak} 天`
                  : `${streak} Days of Consistent Pain`}
              </h3>
              
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-orange-100">
                <p className="text-gray-700 mb-3 font-medium">
                  {language === 'zh'
                    ? "继续保持，让痛苦成为日常！"
                    : "Keep going, make the pain a daily routine!"}
                </p>
                
                <h4 className="font-semibold text-orange-800 mb-3 flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4 text-orange-500" />
                  {language === 'zh' ? "已解锁成就" : "Unlocked Achievements"}
                  <Sparkles className="h-4 w-4 text-orange-500" />
                </h4>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {unlockedAchievements.length > 0 ? (
                    unlockedAchievements.map((achievement) => {
                      const Icon = achievement.icon;
                      const isNewlyUnlocked = newAchievement === achievement.id;
                      
                      return (
                        <Badge 
                          key={achievement.id}
                          className={`bg-gradient-to-r ${achievement.colorClass} px-3 py-1 
                            transition-all duration-300 hover:scale-105 
                            ${isNewlyUnlocked ? 'ring-2 ring-yellow-400 ring-offset-1 animate-[pulse_1s_ease-in-out_infinite]' : ''}`}
                        >
                          <Icon className={`w-3 h-3 mr-1 ${isNewlyUnlocked ? 'animate-spin' : ''}`} />
                          {language === 'zh' ? achievement.nameZh : achievement.nameEn}
                        </Badge>
                      );
                    })
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      {language === 'zh' 
                        ? "继续坚持以解锁成就" 
                        : "Keep going to unlock achievements"}
                    </p>
                  )}
                </div>
                
                {/* Show locked achievements */}
                {ACHIEVEMENTS.some(achievement => streak < achievement.days) && (
                  <div className="mt-4 border-t border-orange-200 pt-3">
                    <h4 className="font-medium text-gray-600 mb-2 text-sm">
                      {language === 'zh' ? "即将解锁" : "Coming Soon"}
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {ACHIEVEMENTS.filter(achievement => streak < achievement.days)
                        .map((achievement) => {
                          const Icon = achievement.icon;
                          return (
                            <Badge 
                              key={achievement.id}
                              className="bg-gray-100 text-gray-500 border border-gray-300 px-3 py-1 opacity-60"
                            >
                              <Icon className="w-3 h-3 mr-1" />
                              {language === 'zh' 
                                ? `${achievement.nameZh} (${achievement.days}天)` 
                                : `${achievement.nameEn} (${achievement.days} days)`}
                            </Badge>
                          );
                      })}
                    </div>
                  </div>
                )}
              </div>
              
              {isNew && (
                <div className="mt-4 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg border border-orange-200 animate-[pulse_2s_ease-in-out_infinite] shadow-md">
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
    </Button>
  );
}
