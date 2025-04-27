
import { CookieClicker } from "@/components/CookieClicker";
import { LanguageProvider } from "@/context/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <CookieClicker />
    </LanguageProvider>
  );
};

export default Index;
