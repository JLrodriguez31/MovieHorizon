import Navbar from "@/features/header/components/navbar/Navbar";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

export default function Main() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen text-white">
      <Navbar />

      {/* Overlay to improve text readability */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.3),rgba(0,0,0,0.01),rgba(0,0,0,0.01),rgba(0,0,0,0.01),rgba(0,0,0,1))]"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center text-center mt-22 px-4 max-w-3xl">
        <h1 className="font-light text-4xl sm:text-5xl md:text-7xl leading-tight">
          <span className="font-light">Millions of movies</span>
          <br />
          <span className="italic font-serif font-medium">
            and actors to discover
          </span>
        </h1>
        <p className="mt-6 text-base font-normal sm:text-lg text-white/85 max-w-2xl">
          Explore the vast amount of information you didn't know about your
          favorite movies and actors.
        </p>
        <div className="mt-10">
          {user ? (
            <Button variant="secondary" onClick={() => navigate("/movies")}>
              Explore Movies
            </Button>
          ) : (
            <Button variant="primary" onClick={() => navigate("/login")}>
              Start the Journey
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
