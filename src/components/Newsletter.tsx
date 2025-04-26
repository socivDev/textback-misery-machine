
import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export function Newsletter() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Discord webhook URL (this would typically be stored server-side)
  const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/your-webhook-url-here";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: language === 'zh' ? '请输入电子邮件' : 'Please enter your email',
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // This is a simulation - in production, you'd use a serverless function or API route
      // to protect your Discord webhook URL
      console.log("Would send to webhook:", {
        email,
        suggestion,
        timestamp: new Date().toISOString()
      });
      
      // For demo purposes, we're simulating success
      setTimeout(() => {
        toast({
          title: language === 'zh' ? '提交成功！' : 'Submission received!',
          description: language === 'zh' ? '感谢您的反馈' : 'Thanks for your feedback',
        });
        
        setIsSubmitting(false);
        setEmail("");
        setSuggestion("");
        setIsOpen(false);
      }, 1000);
      
      // In a real implementation you'd use fetch:
      /*
      await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `New newsletter subscription:\n**Email:** ${email}\n**Suggestion:** ${suggestion || "N/A"}`,
        }),
      });
      */
    } catch (error) {
      console.error('Error sending to webhook:', error);
      toast({
        title: language === 'zh' ? '提交失败' : 'Submission failed',
        description: language === 'zh' ? '请稍后重试' : 'Please try again later',
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-36 left-4 z-50 bg-gradient-to-r from-pink-600/90 to-violet-600/90 text-white border-white/20 hover:bg-gradient-to-r hover:from-pink-700/90 hover:to-violet-700/90 hover:border-white/40 shadow-lg"
        >
          <Mail className="w-5 h-5 mr-2" />
          {language === 'zh' ? '订阅通讯' : 'Newsletter'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-pink-50 to-violet-50 border-2 border-pink-200/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {language === 'zh' ? '加入通讯' : 'Join Our Newsletter'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                {language === 'zh' ? '电子邮件' : 'Email'}
              </label>
              <Input
                id="email"
                type="email"
                placeholder={language === 'zh' ? '你的电子邮件' : 'your@email.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-pink-200 focus:border-pink-500 focus:ring-pink-500"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="suggestion" className="text-sm font-medium text-gray-700">
                {language === 'zh' ? '建议' : 'Suggestion (optional)'}
              </label>
              <Textarea
                id="suggestion"
                placeholder={language === 'zh' ? '你的建议...' : 'Your suggestion...'}
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                className="border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gap-2 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white"
            >
              {isSubmitting && <Mail className="w-4 h-4 animate-bounce" />}
              {language === 'zh' 
                ? (isSubmitting ? '提交中...' : '提交') 
                : (isSubmitting ? 'Submitting...' : 'Submit')
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
