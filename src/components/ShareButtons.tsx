
import { Button } from "@/components/ui/button";

export function ShareButtons() {
  const shareText = encodeURIComponent("Still waiting for that text back... 😭 Check your pain level at");
  const url = encodeURIComponent("https://didtheytextbackyet.com");

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${url}`, "_blank");
  };

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${shareText} ${url}`, "_blank");
  };

  const shareToInstagram = () => {
    // Since Instagram doesn't have a web share API, we'll copy the URL to clipboard
    navigator.clipboard.writeText(`${decodeURIComponent(shareText)} ${decodeURIComponent(url)}`);
    alert("Link copied! Share this pain on your Instagram Story 🥹");
  };

  return (
    <div className="flex gap-2 justify-center mt-8">
      <Button onClick={shareToTwitter} variant="outline" className="font-medium">
        Twitter/X
      </Button>
      <Button onClick={shareToWhatsApp} variant="outline" className="font-medium">
        WhatsApp
      </Button>
      <Button onClick={shareToInstagram} variant="outline" className="font-medium">
        Instagram
      </Button>
    </div>
  );
}
