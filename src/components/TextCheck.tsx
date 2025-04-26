import { useState, useEffect } from "react";
import { excuses, responses } from "@/data/excuses";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { Navbar } from "./Navbar";
import { FortuneCookie } from "./FortuneCookie";
import { ShareInstructions } from "./ShareInstructions";

export function TextCheck() {
  const { language } = useLanguage();

  const [excuse, setExcuse] = useState(() => excuses[Math.floor(Math.random() * excuses.length)]);
  const [response, setResponse] = useState(() => responses[Math.floor(Math.random() * responses.length)]);
  const [autoPainMode, setAutoPainMode] = useState(false);

  const [refreshCount, setRefreshCount] = useState(() => Number(localStorage.getItem("refreshCount")) || 0);
  const [streak, setStreak] = useState(() => Number(localStorage.getItem("streak")) || 0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<number[]>(
    () => JSON.parse(localStorage.getItem("unlockedAchievements") || "[]")
  );
  const [popupOpen, setPopupOpen] = useState(false);

  // Auto pain mode effect
  useEffect(() => {
    let timer: number | undefined;
    if (autoPainMode) {
      timer = window.setInterval(refreshContent, 3000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [autoPainMode]);

  // Persist data
  useEffect(() => localStorage.setItem("refreshCount", refreshCount.toString()), [refreshCount]);
  useEffect(() => localStorage.setItem("streak", streak.toString()), [streak]);
  useEffect(() => localStorage.setItem("unlockedAchievements", JSON.stringify(unlockedAchievements)), [unlockedAchievements]);

  // Unlock achievements
  useEffect(() => {
    const achievementMap = {
      10: { title: "Simp🐶", zh: "舔狗🐶" },
      20: { title: "Certified Clown🤡", zh: "官方小丑🤡" },
      30: { title: "Pain Collector👜", zh: "痛苦收集者👜" },
      50: { title: "Hopeless Romantic💔", zh: "绝望的浪漫主义者💔" },
      100: { title: "God of Ghosted🥶", zh: "被冷神🥶" }
    };

    if (achievementMap[refreshCount] && !unlockedAchievements.includes(refreshCount)) {
      const achievement = achievementMap[refreshCount];
      toast({
        title: language === "zh" ? "成就解锁！" : "Achievement Unlocked!",
        description: language === "zh" ? achievement.zh : achievement.title
      });
      setUnlockedAchievements((prev) => [...prev, refreshCount]);
    }
  }, [refreshCount, language, unlockedAchievements]);

  const refreshContent = () => {
    setRefreshCount((prev) => prev + 1);
    setStreak((prev) => prev + 1);

    if (refreshCount === 25) {
      setResponse({
        text: { en: "Ur too ugly! (just kidding)", zh: "你太丑了！（开玩笑的）" },
        emoji: "🤡"
      });

      setTimeout(() => {
        const newResponse = responses[Math.floor(Math.random() * responses.length)];
        setResponse(newResponse);
      }, 2000);
    } else {
      const newExcuse = excuses[Math.floor(Math.random() * excuses.length)];
      const newResponse = responses[Math.floor(Math.random() * responses.length)];
      setExcuse(newExcuse);
      setResponse(newResponse);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-[Poppins] bg-gradient-to-b from-white to-pink-50">
      <Navbar autoPainMode={autoPainMode} setAutoPainMode={setAutoPainMode} />

      <div className="flex-1 pt-32 pb-12 px-4"> {/* Increased top padding here */}
        <div className="space-y-8 text-center max-w-2xl mx-auto">
          <div className={`space-y-6 animate-fade-in ${autoPainMode ? 'animate-pulse' : ''}`}>
            <div className={`text-8xl sm:text-9xl ${autoPainMode ? 'animate-bounce' : ''}`}>
              {response.emoji}
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text transition-all duration-300">
              {response.text[language]}
            </h2>

            <p className="text-xl sm:text-2xl text-gray-600 font-medium leading-relaxed max-w-xl mx-auto">
              {excuse[language]}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative">
            <Button
              onClick={refreshContent}
              size="lg"
              className="text-lg font-semibold px-8 py-6 h-auto gap-2 hover:scale-110 transition-transform bg-gradient-to-r from-pink-500 to-violet-500 hover:from-violet-500 hover:to-pink-500 shadow-lg hover:shadow-xl relative"
            >
              <RefreshCw className={`w-5 h-5 ${autoPainMode ? 'animate-spin' : 'animate-spin-slow'}`} />
              {language === 'zh' ? '刷新我的借口' : 'Refresh My Pain'}

              {/* Fire badge with streak count */}
              <div
                className="absolute -top-2 -right-2 bg-orange-100 text-orange-600 border border-orange-300 text-xs px-2 py-1 rounded-full shadow-sm cursor-pointer hover:scale-105 transition"
                onClick={() => setPopupOpen(true)}
              >
                🔥 {streak}
              </div>
            </Button>

            <FortuneCookie />
          </div>

          {popupOpen && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
              onClick={() => setPopupOpen(false)}
            >
              <div
                className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-5xl">🔥</div>
                <h2 className="text-2xl font-bold">
                  {language === "zh" ? "当前连刷数" : "Current Streak"}
                </h2>
                <p className="text-xl font-semibold">{streak}</p>

                <div className="pt-4">
                  <h3 className="font-bold text-lg mb-2">
                    {language === "zh" ? "已解锁的成就" : "Unlocked Achievements"}
                  </h3>
                  {unlockedAchievements.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      {language === "zh" ? "暂无" : "None yet"}
                    </p>
                  ) : (
                    <ul className="space-y-1 text-sm text-left">
                      {unlockedAchievements.map((count) => {
                        const achievementMap = {
                          10: { title: "Simp", zh: "添狗" },
                          20: { title: "Certified Clown", zh: "官方小丑" },
                          30: { title: "Pain Collector", zh: "痛苦收集者" },
                          50: { title: "Hopeless Romantic", zh: "绝望的浪漫主义者" },
                          100: { title: "God of Ghosted", zh: "被冷神" }
                        };
                        const data = achievementMap[count];
                        return (
                          <li key={count}>
                            ✅ {language === "zh" ? data.zh : data.title} ({count})
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          <ShareInstructions />
        </div>
      </div>

      <footer className="w-full py-8 px-4 border-t bg-white/50 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <a
            href="https://www.instagram.com/wsdrm.lol/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-pink-100 to-violet-100 hover:from-pink-200 hover:to-violet-200 text-gray-700 font-medium transition-all hover:scale-105"
          >
            {language === 'zh' ? '关注我们的IG' : 'Follow Our Instagram'}
          </a>
          <p className="text-sm text-gray-500">
            {language === 'zh' ? '自2025年起每日提供被冷漠的痛苦' : 'Daily doses of ghosted since 2025'}
          </p>
        </div>
      </footer>
    </div>
  );
}
