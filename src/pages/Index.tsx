
import { TextCheck } from "@/components/TextCheck";
import { ShareButtons } from "@/components/ShareButtons";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between py-12 sm:py-16 font-[Inter]">
      <header className="text-center px-4 mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
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
          className="block text-center mt-8 text-gray-600 hover:text-gray-900 transition-colors"
        >
          Need therapy? Or a t-shirt? →
        </a>
      </footer>
    </div>
  );
};

export default Index;
