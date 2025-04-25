
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ShareButtons() {
  const { language } = useLanguage();
  const shareText = encodeURIComponent(
    language === 'zh' 
      ? "还在等那条回信... 😭 在这里查看你的痛苦指数："
      : "Still waiting for that text back... 😭 Check your pain level at"
  );
  const url = encodeURIComponent("https://didtheytextbackyet.com");

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${url}`, "_blank");
    logShare("Twitter/X");
  };

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${shareText} ${url}`, "_blank");
    logShare("WhatsApp");
  };

  const shareToInstagram = () => {
    // Since Instagram doesn't have a web share API, we'll copy the URL to clipboard
    navigator.clipboard.writeText(`${decodeURIComponent(shareText)} ${decodeURIComponent(url)}`);
    toast({
      title: language === 'zh' ? '链接已复制！' : 'Link copied!',
      description: language === 'zh' 
        ? '在Instagram故事中分享你的痛苦 🥹' 
        : 'Share this pain on your Instagram Story 🥹',
    });
    logShare("Instagram");
  };

  const logShare = (platform: string) => {
    // In a real app, this could log analytics
    console.log(`Shared to ${platform}`);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700">
        {language === 'zh' ? '分享你的痛苦' : 'Share Your Pain'}
      </h3>
      
      <ToggleGroup type="multiple" className="justify-center">
        <ToggleGroupItem value="twitter" onClick={shareToTwitter} className="px-4 data-[state=on]:bg-blue-100">
          Twitter/X
        </ToggleGroupItem>
        <ToggleGroupItem value="whatsapp" onClick={shareToWhatsApp} className="px-4 data-[state=on]:bg-green-100">
          WhatsApp
        </ToggleGroupItem>
        <ToggleGroupItem value="instagram" onClick={shareToInstagram} className="px-4 data-[state=on]:bg-pink-100">
          Instagram
        </ToggleGroupItem>
      </ToggleGroup>
      
      <div className="text-xs text-gray-500 italic">
        {language === 'zh' 
          ? '在社交媒体上分享可以解锁特殊内容!' 
          : 'Sharing on social media unlocks special content!'}
      </div>
    </div>
  );
}
