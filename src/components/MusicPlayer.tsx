
import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Music2, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Slider } from "@/components/ui/slider";

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
    <div className={`fixed bottom-20 right-4 z-50 transition-all duration-300 ${expanded ? 'w-80' : 'w-14'}`}>
      <div className="bg-gradient-to-r from-pink-600/95 to-violet-600/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/20">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setExpanded(!expanded)}
            className="w-8 h-8 p-0 text-white hover:bg-white/20"
          >
            <Music2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
          </Button>
          
          {expanded && (
            <div className="flex-1 ml-3 space-y-1">
              <div className="text-white font-semibold text-sm truncate animate-fade-in">
                {currentSong.title}
              </div>
              <div className="text-white/70 text-xs truncate animate-fade-in">
                {currentSong.artist}
              </div>
            </div>
          )}
        </div>
        
        {expanded && (
          <div className="mt-4 space-y-4 animate-fade-in">
            <div className="flex justify-center items-center space-x-4 py-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={prevSong}
                className="w-8 h-8 p-0 text-white hover:bg-white/20 transition-transform hover:scale-110"
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={togglePlay}
                className="w-12 h-12 p-0 text-white hover:bg-white/20 rounded-full border-2 border-white/30 transition-transform hover:scale-105"
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
                className="w-8 h-8 p-0 text-white hover:bg-white/20 transition-transform hover:scale-110"
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 px-1">
              <Volume2 className="w-4 h-4 text-white/80" />
              <Slider 
                value={[volume]} 
                max={100} 
                step={1}
                onValueChange={handleVolumeChange}
                className="data-[state=active]:bg-white"
              />
            </div>
          </div>
        )}
        
        <audio 
          ref={audioRef}
          src={currentSong.src}
          onEnded={nextSong}
        />
      </div>
    </div>
  );
}
