import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Music2, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define the song list
const songsList = [
  {
    title: "Lofi Study",
    artist: "Chill Beats",
    src: "https://stream.software/api/attachments/RAWOmV4oklrDsnV9lZY2/download",
  },
  {
    title: "Sad Piano",
    artist: "Melancholy",
    src: "https://stream.software/api/attachments/ZXs2w6qoaNop0Cpau6DW/download",
  },
  {
    title: "Ambient Dreams",
    artist: "Sleepwell",
    src: "https://stream.software/api/attachments/0oyrH0iDSx9gzOwfckw5/download",
  }
];

export function MusicPlayer() {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(50);
  const [expanded, setExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = songsList[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex, volume]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songsList.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => 
      prevIndex === 0 ? songsList.length - 1 : prevIndex - 1
    );
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80">
      <div className="bg-gradient-to-r from-pink-600/85 to-violet-600/85 backdrop-blur-md rounded-xl shadow-xl border border-white/20 overflow-hidden">
        <ScrollArea className="h-[300px]">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Music2 className={`w-5 h-5 text-white ${isPlaying ? 'animate-pulse' : ''}`} />
                <div className="text-white space-y-1">
                  <h3 className="font-semibold text-sm">{currentSong.title}</h3>
                  <p className="text-xs text-white/70">{currentSong.artist}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {songsList.map((song, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSongIndex(index);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ${
                    currentSongIndex === index 
                      ? 'bg-white/20 shadow-lg scale-[1.02]' 
                      : 'hover:bg-white/10'
                  } group`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-all ${
                      currentSongIndex === index && isPlaying ? 'animate-spin-slow' : ''
                    }`}>
                      {currentSongIndex === index && isPlaying ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{song.title}</p>
                      <p className="text-white/60 text-xs">{song.artist}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>

        <div className="border-t border-white/10 p-4 space-y-4 bg-black/20">
          <div className="flex justify-center items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={prevSong}
              className="text-white hover:bg-white/20 transition-transform hover:scale-110"
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={togglePlay}
              className="w-12 h-12 rounded-full border-2 border-white/30 text-white hover:bg-white/20 transition-transform hover:scale-105"
            >
              {isPlaying ? 
                <Pause className="w-6 h-6" /> : 
                <Play className="w-6 h-6 ml-0.5" />
              }
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={nextSong}
              className="text-white hover:bg-white/20 transition-transform hover:scale-110"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 px-1">
            <Volume2 className="w-4 h-4 text-white/80" />
            <Slider 
              value={[volume]} 
              max={100} 
              step={1}
              onValueChange={handleVolumeChange}
              className="cursor-pointer"
            />
          </div>
        </div>

        <audio 
          ref={audioRef}
          src={currentSong.src}
          onEnded={nextSong}
        />
      </div>
    </div>
  );
}
