import { useEffect, useRef, useState } from "react";
import { AudioLines, Pause, Play, SkipForward, X } from "lucide-react";
import lofi1 from "@/assets/audio/lofi1.mp3";
import lofi2 from "@/assets/audio/lofinastel.mp3";
import lofi3 from "@/assets/audio/Lofidreams.mp3";
import lofi4 from "@/assets/audio/lofi4.mp3";

const TRACKS = [
  { title: "Lofidreams", src: lofi3 },
  { title: "NastelBom", src: lofi2},
    { title: "FASSounds", src: lofi1 },
  { title: "NastelBom", src: lofi4 },
];

export default function LofiChillPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(8);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Audio playback blocked:", error);
      setIsPlaying(false);
    }
  };

  const switchTrack = async (nextIndex: number) => {
    if (!audioRef.current) return;

    const wasPlaying = isPlaying;
    audioRef.current.pause();
    setTrackIndex(nextIndex);

    if (!wasPlaying) return;

    setTimeout(async () => {
      if (!audioRef.current) return;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Audio playback blocked:", error);
        setIsPlaying(false); 
      }
    }, 0);
  };

  const nextTrack = () => {
    const nextIndex = (trackIndex + 1) % TRACKS.length;
    switchTrack(nextIndex);
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audioEl = audioRef.current;

    return () => {
      audioEl?.pause();
    };
  }, []);

  const currentTrack = TRACKS[trackIndex];

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="metadata"
        loop={TRACKS.length === 1}
        onEnded={nextTrack}
      />

      <button
        type="button"
        aria-label="Open music player"
        onClick={() => setIsCollapsed(false)}
        className={`fixed bottom-8 right-8 z-50 cursor-pointer flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/40 bg-[#0a0d14]/85 text-amber-100 shadow-xl backdrop-blur-md transition-all duration-300 ease-out hover:bg-amber-300/15 ${
          isCollapsed
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-75 opacity-0"
        }`}
      >
        <AudioLines size={20} className={isPlaying ? "animate-pulse" : ""} />
      </button>

      <div
        className={`fixed bottom-5 right-4 z-50 w-64 rounded-2xl border border-amber-200/30 bg-gradient-to-br from-[#111827]/90 via-[#0b1220]/90 to-[#0a0d14]/90 p-3 text-white shadow-xl backdrop-blur-md transition-all duration-300 ease-out ${
          isCollapsed
            ? "pointer-events-none translate-y-4 scale-95 opacity-0"
            : "translate-y-0 scale-100 opacity-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-amber-200/80">Music</p>
          </div>
          <button
            type="button"
            aria-label="Minimize music player"
            onClick={() => setIsCollapsed(true)}
            className="rounded-md border border-white/20 bg-white/10 p-1 text-white/80 transition hover:bg-white/20"
          >
            <X size={14} />
          </button>
        </div>

        <div className="mt-3 rounded-xl border border-amber-200/20 bg-white/[0.04] p-2.5">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/55">Now Playing</p>
          <p className="mt-1 truncate text-sm font-medium text-amber-100/90">{currentTrack.title}</p>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-200/45 bg-amber-300/15 text-amber-100 transition hover:bg-amber-300/25"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="translate-x-[1px]" />}
          </button>
          <button
            type="button"
            onClick={nextTrack}
            disabled={TRACKS.length < 2}
            aria-label="Next track"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <SkipForward size={16} />
          </button>
        </div>

        <div className="mt-3 border-t border-white/10 pt-3">
          <div className="flex items-center justify-between">
            <label className="text-xs text-white/80" htmlFor="lofi-volume">
              Volume
            </label>
            <span className="text-xs text-amber-100/85">{volume}%</span>
          </div>
        <input
          id="lofi-volume"
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          className="mt-1 w-full accent-amber-300"
        />
        </div>
      </div>
    </>
  );
}
