
import { TextCheck } from "@/components/TextCheck";
import { LanguageProvider } from "@/context/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <TextCheck />
    </LanguageProvider>
  );
};

export default Index;
