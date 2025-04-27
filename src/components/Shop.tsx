
import { useState } from "react";
import { ShoppingCart, Cookie, Coins, MousePointer, MousePointerClick, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { SHOP_ITEMS } from "./CookieClicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";

export function Shop({
  isOpen,
  onClose,
  onPurchase,
  coins,
  inventory
}: {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (itemId: string) => void;
  coins: number;
  inventory: Record<string, number>;
}) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("upgrades");

  // Function to get the appropriate icon
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "cursor":
        return <MousePointer className="w-5 h-5" />;
      case "auto-clicker":
        return <MousePointerClick className="w-5 h-5" />;
      case "grandma":
        return <Cookie className="w-5 h-5" />;
      case "farm":
        return <Zap className="w-5 h-5" />;
      default:
        return <Cookie className="w-5 h-5" />;
    }
  };

  // Calculate the price for an item based on how many the user already owns
  const calculatePrice = (item: typeof SHOP_ITEMS[0], owned: number) => {
    return Math.floor(item.basePrice * Math.pow(item.priceMultiplier, owned));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-200 max-w-lg w-[95vw] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            {language === 'zh' ? "饼干商店" : "Cookie Shop"}
            <ShoppingCart className="w-6 h-6 text-amber-600" />
          </DialogTitle>
          <DialogDescription className="text-center text-amber-700 flex items-center justify-center gap-2">
            <Coins className="w-4 h-4 text-yellow-500" />
            {language === 'zh' 
              ? `你有 ${coins} 金币可以使用` 
              : `You have ${coins} coins to spend`}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="upgrades" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="upgrades" className="data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900">
              {language === 'zh' ? "升级" : "Upgrades"}
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900">
              {language === 'zh' ? "库存" : "Inventory"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upgrades" className="space-y-4">
            {SHOP_ITEMS.map(item => {
              const owned = inventory[item.id] || 0;
              const price = calculatePrice(item, owned);
              const canAfford = coins >= price;
              
              return (
                <div 
                  key={item.id} 
                  className={`bg-white/70 backdrop-blur-sm rounded-lg p-4 border transition-all
                    ${canAfford 
                      ? 'border-amber-300 hover:border-amber-400 hover:shadow-md' 
                      : 'border-gray-200 opacity-70'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                      ${canAfford 
                        ? 'bg-gradient-to-br from-amber-200 to-amber-300 text-amber-900' 
                        : 'bg-gray-200 text-gray-500'}`}
                    >
                      {getIcon(item.icon)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-amber-900">
                          {language === 'zh' ? item.nameZh : item.nameEn}
                        </h3>
                        <Badge variant={owned > 0 ? "secondary" : "outline"} className={owned > 0 
                          ? "bg-amber-200 text-amber-900 border-amber-300" 
                          : "bg-gray-100 text-gray-500 border-gray-200"}>
                          {owned > 0 
                            ? (language === 'zh' ? `已拥有: ${owned}` : `Owned: ${owned}`) 
                            : (language === 'zh' ? "未拥有" : "Not owned")}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-amber-700 mt-1">
                        {language === 'zh' ? item.descriptionZh : item.descriptionEn}
                      </p>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-1">
                          <Coins className={`w-4 h-4 ${canAfford ? 'text-yellow-500' : 'text-gray-400'}`} />
                          <span className={`font-medium ${canAfford ? 'text-amber-800' : 'text-gray-500'}`}>
                            {price}
                          </span>
                        </div>
                        
                        <Button
                          size="sm"
                          onClick={() => onPurchase(item.id)}
                          disabled={!canAfford}
                          className={canAfford 
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white" 
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"}
                        >
                          {language === 'zh' ? "购买" : "Buy"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </TabsContent>
          
          <TabsContent value="inventory" className="space-y-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-amber-200">
              <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2 justify-center">
                <ShoppingCart className="w-4 h-4" />
                {language === 'zh' ? "已购买物品" : "Purchased Items"}
              </h3>
              
              {Object.keys(inventory).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(inventory).map(([itemId, count]) => {
                    const item = SHOP_ITEMS.find(i => i.id === itemId);
                    if (!item || count <= 0) return null;
                    
                    return (
                      <div key={itemId} className="flex items-center justify-between bg-amber-50 p-3 rounded-lg border border-amber-100">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center text-amber-900">
                            {getIcon(item.icon)}
                          </div>
                          <div>
                            <p className="font-medium text-amber-900">
                              {language === 'zh' ? item.nameZh : item.nameEn}
                            </p>
                            <p className="text-xs text-amber-700">
                              {item.id === "cursor" 
                                ? (language === 'zh' ? `每次点击 +${item.value * count}` : `+${item.value * count} per click`)
                                : (language === 'zh' ? `每秒 +${item.value * count}` : `+${item.value * count} per second`)}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-amber-200 text-amber-900 border-amber-300">
                          {count}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-amber-700 italic">
                  {language === 'zh' ? "你还没有购买任何物品" : "You haven't purchased any items yet"}
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
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
