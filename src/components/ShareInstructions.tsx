
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ShareInstructions() {
  const { language } = useLanguage();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ToggleGroup type="single" className="justify-center mt-6">
          <ToggleGroupItem value="share" className="data-[state=on]:bg-pink-100">
            {language === 'zh' ? '分享你的痛苦' : 'Share Your Pain'}
          </ToggleGroupItem>
        </ToggleGroup>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {language === 'zh' ? '如何分享' : 'How to Share'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <ol className="list-decimal list-inside space-y-3 text-left">
            <li>{language === 'zh' ? '截取你的痛苦时刻' : 'Take a screenshot of your pain'}</li>
            <li>
              {language === 'zh' 
                ? '在社交媒体上发布并标记 @didtheytextback' 
                : 'Post it and tag us @didtheytextback'}
            </li>
            <li>
              {language === 'zh'
                ? '让我们一起分享这份痛苦'
                : "Join our community of ghosted souls"}
            </li>
          </ol>
          <p className="text-sm text-gray-500 mt-4">
            {language === 'zh' 
              ? '提示：使用系统截图功能或浏览器截图工具来捕捉你的痛苦时刻'
              : 'Tip: Use your system screenshot tool or browser extension to capture your moment of pain'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
