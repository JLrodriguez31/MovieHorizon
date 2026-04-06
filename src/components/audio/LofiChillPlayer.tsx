import { useEffect, useRef, useState } from "react";
import { Music2, X } from "lucide-react";
import lofi1 from "@/assets/audio/lofi1.mp3";
import lofi2 from "@/assets/audio/lofi2.mp3";
import lofi3 from "@/assets/audio/lofi3.mp3";
import lofi4 from "@/assets/audio/lofi4.mp3";

const TRACKS = [
  { title: "Lofi 1", src: lofi1 },
  { title: "Lofi 2", src: lofi2 },
  { title: "Lofi 3", src: lofi3 },
  { title: "Lofi 4", src: lofi4 },
];

export default function LofiChillPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(32);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
        className={`fixed bottom-5 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/40 bg-[#0a0d14]/85 text-amber-100 shadow-xl backdrop-blur-md transition-all duration-300 ease-out hover:bg-amber-300/15 ${
          isCollapsed
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-75 opacity-0"
        }`}
      >
        <Music2 size={20} className={isPlaying ? "animate-pulse" : ""} />
      </button>

      <div
        className={`fixed bottom-5 right-4 z-50 w-56 rounded-2xl border border-amber-200/30 bg-[#0a0d14]/80 p-3 text-white shadow-xl backdrop-blur-md transition-all duration-300 ease-out ${
          isCollapsed
            ? "pointer-events-none translate-y-4 scale-95 opacity-0"
            : "translate-y-0 scale-100 opacity-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.18em] text-amber-200/80">Music</p>
          <button
            type="button"
            aria-label="Minimize music player"
            onClick={() => setIsCollapsed(true)}
            className="rounded-md border border-white/20 bg-white/10 p-1 text-white/80 transition hover:bg-white/20"
          >
            <X size={14} />
          </button>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlayback}
            className="rounded-lg border border-amber-200/45 bg-amber-300/15 px-3 py-1.5 text-xs font-semibold text-amber-100 transition hover:bg-amber-300/25"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={nextTrack}
            disabled={TRACKS.length < 2}
            className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
          <span className="text-xs text-white/75">{isPlaying ? "Ambient ON" : "Ambient OFF"}</span>
        </div>
        <p className="mt-2 truncate text-xs text-amber-100/80">{currentTrack.title}</p>

        <label className="mt-3 block text-xs text-white/80" htmlFor="lofi-volume">
          Volume
        </label>
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
    </>
  );
}
