
import { TextCheck } from "@/components/TextCheck";
import { ShareButtons } from "@/components/ShareButtons";
import { LanguageProvider } from "@/context/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col justify-between py-12 sm:py-16 font-[Inter] bg-gradient-to-b from-white to-pink-50">
        <header className="text-center px-4 mb-6 sm:mb-12 animate-bounce-slow relative">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
            Did They Text Back Yet?
          </h1>
          <p className="text-xl text-gray-600">Let's check the universe for signs...</p>
        </header>

        <main className="flex-grow flex items-center">
          <TextCheck />
        </main>

        <footer className="px-4">
          <ShareButtons />
          <div className="flex flex-col items-center mt-6 space-y-2">
            <a
              href="https://example.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-violet-100 hover:from-pink-200 hover:to-violet-200 text-gray-700 font-medium transition-all hover:scale-105"
            >
              Need therapy? Or a t-shirt? →
            </a>
            <p className="text-xs text-gray-500 mt-2">
              Daily doses of rejection since 2025
            </p>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
};

export default Index;
