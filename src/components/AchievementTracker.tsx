
import { useState } from "react";
import { Star, Award, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { COOKIE_ACHIEVEMENTS } from "./CookieClicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "./ui/progress";

export function AchievementTracker({
  isOpen,
  onClose,
  unlockedAchievements,
  currentValue
}: {
  isOpen: boolean;
  onClose: () => void;
  unlockedAchievements: string[];
  currentValue: number;
}) {
  const { language } = useLanguage();
  const [dialogEntering, setDialogEntering] = useState(false);
  
  // Calculate percentage of achievements unlocked
  const completionPercentage = (unlockedAchievements.length / COOKIE_ACHIEVEMENTS.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-200 max-w-md w-[90vw] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            {language === 'zh' ? "饼干成就" : "Cookie Achievements"}
            <Trophy className="w-6 h-6 text-amber-500" />
          </DialogTitle>
          <DialogDescription className="text-center text-amber-700">
            {language === 'zh' 
              ? `已完成 ${unlockedAchievements.length} 项，共 ${COOKIE_ACHIEVEMENTS.length} 项成就`
              : `${unlockedAchievements.length} of ${COOKIE_ACHIEVEMENTS.length} achievements unlocked`}
          </DialogDescription>
          
          <div className="mt-2">
            <Progress 
              value={completionPercentage} 
              className="h-2 bg-amber-100" 
              indicatorClassName="bg-gradient-to-r from-amber-500 to-orange-500"
            />
          </div>
        </DialogHeader>
        
        <div className="space-y-6 p-2 transition-all duration-500">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-amber-100">
            <h4 className="font-semibold text-amber-800 mb-3 flex items-center justify-center gap-2">
              <Star className="h-4 w-4 text-amber-500" />
              {language === 'zh' ? "已解锁成就" : "Unlocked Achievements"}
              <Star className="h-4 w-4 text-amber-500" />
            </h4>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {unlockedAchievements.length > 0 ? (
                COOKIE_ACHIEVEMENTS
                  .filter(achievement => unlockedAchievements.includes(achievement.id))
                  .map((achievement) => {
                    const Icon = achievement.icon;
                    
                    return (
                      <div 
                        key={achievement.id}
                        className="bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-300 rounded-lg p-2 w-full"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${achievement.colorClass} flex items-center justify-center`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-amber-900">
                              {language === 'zh' ? achievement.nameZh : achievement.nameEn}
                            </p>
                            <p className="text-xs text-amber-700">
                              {language === 'zh' ? achievement.descriptionZh : achievement.descriptionEn}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <p className="text-sm text-amber-500 italic">
                  {language === 'zh' 
                    ? "继续点击以解锁成就" 
                    : "Keep clicking to unlock achievements"}
                </p>
              )}
            </div>
          </div>
          
          {/* Show locked achievements */}
          {COOKIE_ACHIEVEMENTS.some(achievement => !unlockedAchievements.includes(achievement.id)) && (
            <div className="mt-4 border-t border-amber-200 pt-3">
              <h4 className="font-medium text-amber-600 mb-2 text-sm">
                {language === 'zh' ? "即将解锁" : "Coming Soon"}
              </h4>
              <div className="space-y-2">
                {COOKIE_ACHIEVEMENTS
                  .filter(achievement => !unlockedAchievements.includes(achievement.id))
                  .map((achievement) => {
                    const Icon = achievement.icon;
                    const progress = achievement.special !== "first_purchase" 
                      ? Math.min(100, (currentValue / achievement.count) * 100)
                      : 0;
                    
                    return (
                      <div 
                        key={achievement.id}
                        className="bg-gray-100 border border-gray-200 rounded-lg p-2 opacity-80"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium text-gray-600">
                                {language === 'zh' ? achievement.nameZh : achievement.nameEn}
                              </p>
                              {achievement.special !== "first_purchase" && (
                                <span className="text-xs text-gray-500">
                                  {currentValue}/{achievement.count}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">
                              {language === 'zh' ? achievement.descriptionZh : achievement.descriptionEn}
                            </p>
                            {achievement.special !== "first_purchase" && (
                              <Progress 
                                value={progress} 
                                className="h-1 bg-gray-200 mt-1" 
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button 
            onClick={onClose} 
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
          >
            {language === 'zh' ? "关闭" : "Close"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
