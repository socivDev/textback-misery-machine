
import { TextCheck } from "@/components/TextCheck";
import { ShareButtons } from "@/components/ShareButtons";
import { LanguageProvider } from "@/context/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col justify-between py-12 sm:py-16 font-[Inter] bg-gradient-to-b from-white to-pink-50">
        <header className="text-center px-4 mb-12 animate-bounce-slow">
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
          <a
            href="https://example.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center mt-8 text-gray-600 hover:text-pink-500 transition-colors"
          >
            Need therapy? Or a t-shirt? →
          </a>
        </footer>
      </div>
    </LanguageProvider>
  );
};

export default Index;
