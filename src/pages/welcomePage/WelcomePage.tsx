import Main from "../../features/main/MainFeature";
import backgroundVideo from "../../assets/bgvideo4k2.mp4";
import grainTexture from "../../assets/grain.png";

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div
        className="animate-grain pointer-events-none absolute inset-0 z-[1] bg-repeat opacity-0 mix-blend-soft-light"
        style={{ backgroundImage: `url(${grainTexture})` }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <Main />
      </div>
    </div>
  );
}
