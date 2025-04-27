
import { useState, useEffect } from "react";
import { Cookie, ShoppingCart, Award, BarChart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { Navbar } from "./Navbar";
import { FortuneCookie } from "./FortuneCookie";
import { AchievementTracker } from "./AchievementTracker";
import { Shop } from "./Shop";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Progress } from "./ui/progress";

// Cookie clicker achievements
export const COOKIE_ACHIEVEMENTS = [
  { 
    id: "first_cookie", 
    count: 1, 
    icon: Cookie, 
    nameEn: "First Bite", 
    nameZh: "第一口",
    descriptionEn: "Click your first cookie",
    descriptionZh: "点击你的第一块饼干",
    colorClass: "from-amber-100 to-yellow-200 text-amber-700 border-amber-300"
  },
  { 
    id: "cookie_rookie", 
    count: 10, 
    icon: Cookie, 
    nameEn: "Cookie Rookie", 
    nameZh: "饼干新手",
    descriptionEn: "Click 10 cookies",
    descriptionZh: "点击10块饼干",
    colorClass: "from-amber-200 to-yellow-300 text-amber-700 border-amber-400"
  },
  { 
    id: "cookie_enthusiast", 
    count: 50, 
    icon: Cookie, 
    nameEn: "Cookie Enthusiast", 
    nameZh: "饼干爱好者",
    descriptionEn: "Click 50 cookies",
    descriptionZh: "点击50块饼干",
    colorClass: "from-amber-300 to-yellow-400 text-amber-800 border-amber-500"
  },
  { 
    id: "cookie_addict", 
    count: 100, 
    icon: Award, 
    nameEn: "Cookie Addict", 
    nameZh: "饼干成瘾者",
    descriptionEn: "Click 100 cookies",
    descriptionZh: "点击100块饼干",
    colorClass: "from-amber-400 to-orange-300 text-amber-900 border-amber-500"
  },
  { 
    id: "cookie_tycoon", 
    count: 500, 
    icon: Award, 
    nameEn: "Cookie Tycoon", 
    nameZh: "饼干大亨",
    descriptionEn: "Click 500 cookies",
    descriptionZh: "点击500块饼干",
    colorClass: "from-orange-300 to-amber-400 text-orange-800 border-orange-500"
  },
  { 
    id: "first_purchase", 
    count: 0, 
    special: "first_purchase",
    icon: ShoppingCart, 
    nameEn: "Smart Shopper", 
    nameZh: "聪明的购物者",
    descriptionEn: "Make your first upgrade purchase",
    descriptionZh: "进行第一次升级购买",
    colorClass: "from-blue-200 to-sky-300 text-blue-800 border-blue-300"
  },
];

// Shop items
export const SHOP_ITEMS = [
  {
    id: "cursor",
    nameEn: "Extra Cursor",
    nameZh: "额外的鼠标",
    descriptionEn: "Gives you +1 cookie per click",
    descriptionZh: "每次点击+1个饼干",
    basePrice: 10,
    priceMultiplier: 1.15,
    value: 1,
    icon: "cursor"
  },
  {
    id: "auto_clicker",
    nameEn: "Auto Clicker",
    nameZh: "自动点击器",
    descriptionEn: "Automatically clicks once per second",
    descriptionZh: "每秒自动点击一次",
    basePrice: 50,
    priceMultiplier: 1.2,
    value: 1,
    icon: "auto-clicker"
  },
  {
    id: "grandma",
    nameEn: "Grandma",
    nameZh: "奶奶",
    descriptionEn: "Bakes 5 cookies per second",
    descriptionZh: "每秒烤5个饼干",
    basePrice: 200,
    priceMultiplier: 1.3,
    value: 5,
    icon: "grandma"
  },
  {
    id: "farm",
    nameEn: "Cookie Farm",
    nameZh: "饼干农场",
    descriptionEn: "Grows 10 cookies per second",
    descriptionZh: "每秒生长10个饼干",
    basePrice: 500,
    priceMultiplier: 1.4,
    value: 10,
    icon: "farm"
  }
];

export function CookieClicker() {
  const { language } = useLanguage();
  const [cookies, setCookies] = useState(() => {
    const saved = localStorage.getItem('cookies');
    return saved ? parseInt(saved) : 0;
  });
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('coins');
    return saved ? parseInt(saved) : 0;
  });
  const [clickPower, setClickPower] = useState(() => {
    const saved = localStorage.getItem('clickPower');
    return saved ? parseInt(saved) : 1;
  });
  const [autoClickRate, setAutoClickRate] = useState(() => {
    const saved = localStorage.getItem('autoClickRate');
    return saved ? parseInt(saved) : 0;
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : [];
  });
  const [inventory, setInventory] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('inventory');
    return saved ? JSON.parse(saved) : {};
  });
  const [lastSaved, setLastSaved] = useState(Date.now());
  
  // Auto-save game state
  useEffect(() => {
    const now = Date.now();
    if (now - lastSaved > 5000) { // Save every 5 seconds
      localStorage.setItem('cookies', cookies.toString());
      localStorage.setItem('coins', coins.toString());
      localStorage.setItem('clickPower', clickPower.toString());
      localStorage.setItem('autoClickRate', autoClickRate.toString());
      localStorage.setItem('achievements', JSON.stringify(unlockedAchievements));
      localStorage.setItem('inventory', JSON.stringify(inventory));
      setLastSaved(now);
    }
  }, [cookies, coins, clickPower, autoClickRate, unlockedAchievements, inventory, lastSaved]);

  // Auto clicker effect
  useEffect(() => {
    if (autoClickRate > 0) {
      const interval = setInterval(() => {
        setCookies(prev => prev + autoClickRate);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [autoClickRate]);

  // Check for achievements
  useEffect(() => {
    const newAchievements: string[] = [];
    
    COOKIE_ACHIEVEMENTS.forEach(achievement => {
      if (achievement.special !== "first_purchase" && 
          cookies >= achievement.count && 
          !unlockedAchievements.includes(achievement.id)) {
        newAchievements.push(achievement.id);
      }
    });
    
    if (newAchievements.length > 0) {
      setUnlockedAchievements(prev => [...prev, ...newAchievements]);
      
      // Show toast for new achievements
      newAchievements.forEach(id => {
        const achievement = COOKIE_ACHIEVEMENTS.find(a => a.id === id);
        if (achievement) {
          toast({
            title: language === 'zh' ? "新成就解锁!" : "New Achievement Unlocked!",
            description: language === 'zh' ? achievement.nameZh : achievement.nameEn,
          });
        }
      });
    }
  }, [cookies, unlockedAchievements, language]);

  const handleCookieClick = () => {
    setIsAnimating(true);
    setCookies(prev => prev + clickPower);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 100);
  };

  const handleSellCookies = (amount: number = 10) => {
    if (cookies >= amount) {
      setCookies(prev => prev - amount);
      setCoins(prev => prev + Math.floor(amount / 10));
      
      toast({
        title: language === 'zh' ? "饼干售出!" : "Cookies Sold!",
        description: language === 'zh' 
          ? `你卖出了${amount}块饼干获得${Math.floor(amount / 10)}金币` 
          : `You sold ${amount} cookies for ${Math.floor(amount / 10)} coins`,
      });
    } else {
      toast({
        title: language === 'zh' ? "饼干不足!" : "Not Enough Cookies!",
        description: language === 'zh' 
          ? `你需要至少${amount}块饼干` 
          : `You need at least ${amount} cookies`,
      });
    }
  };

  const purchaseItem = (itemId: string) => {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    
    const itemCount = inventory[itemId] || 0;
    const price = Math.floor(item.basePrice * Math.pow(item.priceMultiplier, itemCount));
    
    if (coins >= price) {
      // Update inventory
      const newInventory = { ...inventory, [itemId]: (inventory[itemId] || 0) + 1 };
      setInventory(newInventory);
      
      // Deduct coins
      setCoins(prev => prev - price);
      
      // Apply effects
      if (itemId === "cursor") {
        setClickPower(prev => prev + item.value);
      } else if (itemId === "auto_clicker" || itemId === "grandma" || itemId === "farm") {
        setAutoClickRate(prev => prev + item.value);
      }
      
      // Award achievement for first purchase if not already earned
      if (!unlockedAchievements.includes("first_purchase")) {
        setUnlockedAchievements(prev => [...prev, "first_purchase"]);
        toast({
          title: language === 'zh' ? "新成就解锁!" : "New Achievement Unlocked!",
          description: language === 'zh' 
            ? "聪明的购物者" 
            : "Smart Shopper",
        });
      }
      
      toast({
        title: language === 'zh' ? "购买成功!" : "Purchase Successful!",
        description: language === 'zh' 
          ? `你购买了 ${item.nameZh}` 
          : `You purchased ${item.nameEn}`,
      });
    } else {
      toast({
        title: language === 'zh' ? "金币不足!" : "Not Enough Coins!",
        description: language === 'zh' 
          ? `你需要${price}金币` 
          : `You need ${price} coins`,
      });
    }
  };

  // Find next achievement
  const nextAchievement = COOKIE_ACHIEVEMENTS
    .filter(a => a.special !== "first_purchase" && !unlockedAchievements.includes(a.id))
    .sort((a, b) => a.count - b.count)[0];

  return (
    <div className="min-h-screen flex flex-col font-[Poppins] bg-gradient-to-b from-amber-50 to-orange-100">
      <Navbar 
        showShop={() => setShowShop(true)}
        showAchievements={() => setShowAchievements(true)}
        cookies={cookies}
        coins={coins}
      />
      
      <div className="flex-1 pt-24 pb-12 px-4">
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          {/* Cookie Counter and Progress */}
          <div className="relative mb-8">
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-500 text-transparent bg-clip-text mb-3">
              {language === 'zh' ? `${cookies} 块饼干` : `${cookies} Cookies`}
            </h2>
            
            {nextAchievement && (
              <div className="max-w-xs mx-auto">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-amber-700">
                    {language === 'zh' ? "下一成就:" : "Next achievement:"}
                  </span>
                  <span className="text-amber-700 font-medium">
                    {cookies}/{nextAchievement.count}
                  </span>
                </div>
                <Progress 
                  value={(cookies / nextAchievement.count) * 100} 
                  className="h-2 bg-amber-100"
                  indicatorClassName="bg-gradient-to-r from-amber-400 to-orange-500"
                />
                <p className="text-xs text-amber-600 mt-1">
                  {language === 'zh' ? nextAchievement.nameZh : nextAchievement.nameEn}
                </p>
              </div>
            )}
          </div>

          {/* Main Cookie Button */}
          <div className="flex justify-center mb-8">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={handleCookieClick}
                    className="relative bg-transparent border-0 focus:outline-none transform transition-all"
                  >
                    <div className={`relative transition-transform duration-100 ${isAnimating ? 'scale-95' : 'hover:scale-105'}`}>
                      {/* Shadow */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[85%] h-[10%] bg-amber-900/30 rounded-full blur-md"></div>
                      
                      {/* Cookie */}
                      <div className="w-64 h-64 rounded-full bg-gradient-to-br from-amber-300 to-amber-700 relative overflow-hidden shadow-xl border-4 border-amber-400/50">
                        {/* Cookie texture - spots */}
                        <div className="absolute w-12 h-10 rounded-full bg-amber-900/40 top-[20%] left-[15%]"></div>
                        <div className="absolute w-10 h-8 rounded-full bg-amber-900/40 bottom-[30%] right-[25%]"></div>
                        <div className="absolute w-8 h-7 rounded-full bg-amber-900/40 top-[60%] left-[25%]"></div>
                        <div className="absolute w-9 h-8 rounded-full bg-amber-900/40 top-[30%] right-[20%]"></div>
                        <div className="absolute w-7 h-6 rounded-full bg-amber-900/40 bottom-[20%] left-[40%]"></div>
                      </div>
                      
                      {/* Click power indicator */}
                      <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-sm font-bold px-2 py-1 rounded-full shadow-lg border border-amber-300 animate-bounce">
                        +{clickPower}
                      </div>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-amber-100 border-amber-300 text-amber-800">
                  <p>{language === 'zh' ? "点击获取饼干!" : "Click for cookies!"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => handleSellCookies(10)}
              className="bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-6 py-3 h-auto shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              {language === 'zh' ? "卖出10块饼干" : "Sell 10 Cookies"}
            </Button>
            
            <Button 
              onClick={() => setShowShop(true)}
              variant="outline"
              className="bg-white/80 border-amber-300 hover:bg-amber-100 text-amber-800 font-bold px-6 py-3 h-auto shadow-md hover:shadow-lg transition-all transform hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {language === 'zh' ? "商店" : "Shop"}
            </Button>
            
            <Button 
              onClick={() => setShowAchievements(true)}
              variant="outline"
              className="bg-white/80 border-amber-300 hover:bg-amber-100 text-amber-800 font-bold px-6 py-3 h-auto shadow-md hover:shadow-lg transition-all transform hover:scale-105"
            >
              <Award className="w-5 h-5 mr-2" />
              {language === 'zh' 
                ? `成就 (${unlockedAchievements.length}/${COOKIE_ACHIEVEMENTS.length})` 
                : `Achievements (${unlockedAchievements.length}/${COOKIE_ACHIEVEMENTS.length})`}
            </Button>
          </div>
          
          {/* Stats */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-amber-100 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-amber-800 flex items-center justify-center gap-2 mb-3">
              <BarChart className="w-5 h-5 text-amber-600" />
              {language === 'zh' ? "饼干统计" : "Cookie Stats"}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                <p className="text-sm text-amber-700 font-medium">
                  {language === 'zh' ? "点击力量" : "Click Power"}
                </p>
                <p className="text-xl font-bold text-amber-900">{clickPower}</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                <p className="text-sm text-amber-700 font-medium">
                  {language === 'zh' ? "自动点击" : "Auto-Click"}
                </p>
                <p className="text-xl font-bold text-amber-900">
                  {autoClickRate}/s
                </p>
              </div>
            </div>
          </div>
          
          {/* Fortune Cookie */}
          <div className="mt-12">
            <FortuneCookie />
          </div>
        </div>
      </div>

      {/* Shop Modal */}
      <Shop 
        isOpen={showShop}
        onClose={() => setShowShop(false)}
        onPurchase={purchaseItem}
        coins={coins}
        inventory={inventory}
      />
      
      {/* Achievements Modal */}
      <AchievementTracker
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
        unlockedAchievements={unlockedAchievements}
        currentValue={cookies}
      />
      
      {/* Footer */}
      <footer className="w-full py-6 px-4 bg-gradient-to-r from-amber-800/90 to-orange-700/90 backdrop-blur-md border-t border-amber-300/20 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-amber-100/80">
            {language === 'zh' ? '饼干点击游戏 - 自2025年起每日烘焙' : 'Cookie Clicker - Daily baking since 2025'}
          </p>
        </div>
      </footer>
    </div>
  );
}
