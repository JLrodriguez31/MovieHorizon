import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "@/config/tmdb";
import Navbar from "@/features/header/components/navbar/Navbar";
import logo2 from "@/assets/white-logo.svg";
import { Bookmark } from "lucide-react";
import { List } from "lucide-react";
import { Heart } from "lucide-react";

interface Genre {
  id: number;
  name: string;
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Crew {
  id: number;
  name: string;
  job: string;
}

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  status: string;
  original_language: string;
  budget: number;
  revenue: number;
  vote_average: number;
  tagline: string;
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
}

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      try {
        setLoading(true);
        const details = await fetchMovieDetails(id);
        setMovie(details);
      } catch (error) {
        console.error("Error loading movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white">
        <p className="text-xl">Cargando...</p>
      </div>
    );

  if (!movie)
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white">
        <p className="text-xl">Película no encontrada</p>
      </div>
    );

  const getDirector = () =>
    movie.credits?.crew?.find((person) => person.job === "Director")?.name ||
    "N/A";

  const getWriter = () => {
    const writerJobs = [
      "Writer",
      "Screenplay",
      "Story",
      "Screenwriter",
      "Novel",
    ];
    const writer = movie.credits?.crew?.find((person) =>
      writerJobs.includes(person.job)
    );
    return writer?.name || "N/A";
  };

  const getProducer = () =>
    movie.credits?.crew?.find((person) => person.job === "Producer")?.name ||
    "N/A";

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const releaseYear = movie.release_date?.split("-")[0];
  const userScore = Math.round(movie.vote_average * 10);
  const donutAngle = Math.round((userScore / 100) * 360);

  return (
    <>
      <div
        className="h-dvh text-white relative"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.64) 100%), url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Navbar logo={logo2} />

        <div className="container mx-auto px-6 md:px-8 pb-16 pt-6">
          <div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-2xl shadow-2xl w-72 md:w-80 h-full ring-1 ring-white/20"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-semibold pb-6 bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent tracking-wide">
                  {movie.title}
                  <span className="ml-2 text-white/70 font-normal">
                    ({releaseYear})
                  </span>
                </h1>

                <div className="flex flex-wrap items-center gap-3 mb-5 text-sm">
                  <span className="rounded border border-white/20 bg-white/10 px-2 py-1 text-white/80 backdrop-blur-sm">
                    {movie.status === "Released" ? "PG-13" : "NR"}
                  </span>
                  <span className="text-white/80">{formatDate(movie.release_date)}</span>
                  <span className="text-white/40">•</span>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres?.map((genre) => (
                      <span
                        key={genre.id}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  <span className="text-white/40">•</span>
                  <span className="text-white/80">{formatRuntime(movie.runtime)}</span>
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="relative h-16 w-16 rounded-full p-1"
                      style={{
                        background: `conic-gradient(#22c55e ${donutAngle}deg, rgba(255,255,255,0.12) 0deg)`,
                      }}
                    >
                      <div className="absolute inset-1 rounded-full bg-black/70 flex items-center justify-center ring-1 ring-white/10">
                        <span className="text-white font-semibold text-sm">{userScore}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-semibold leading-none">User Score</p>
                      <p className="text-white/60 text-xs leading-none mt-1">Puntuación media</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      aria-label="Add to list"
                      className="w-10 h-10 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center hover:bg-white/20 transition backdrop-blur-sm"
                    >
                      <List size={18} />
                    </button>
                    <button
                      aria-label="Mark as favorite"
                      className="w-10 h-10 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center hover:bg-white/20 transition backdrop-blur-sm"
                    >
                      <Heart size={18} />
                    </button>
                    <button
                      aria-label="Bookmark"
                      className="w-10 h-10 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center hover:bg-white/20 transition backdrop-blur-sm"
                    >
                      <Bookmark size={18} />
                    </button>
                  </div>
                </div>

                {movie.tagline && (
                  <p className="text-white/80 italic text-lg mb-4">“{movie.tagline}”</p>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Overview</h3>
                  <div className="h-1 w-16 rounded-full bg-white mb-3" />
                  <p className="text-white/90 leading-relaxed">{movie.overview}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-lg bg-white/10 ring-1 ring-white/10 p-4">
                    <p className="font-semibold text-white">{getDirector()}</p>
                    <p className="text-white/60 text-sm">Director</p>
                  </div>
                  <div className="rounded-lg bg-white/10 ring-1 ring-white/10 p-4">
                    <p className="font-semibold text-white">{getWriter()}</p>
                    <p className="text-white/60 text-sm">Writer</p>
                  </div>
                  <div className="rounded-lg bg-white/10 ring-1 ring-white/10 p-4">
                    <p className="font-semibold text-white">{getProducer()}</p>
                    <p className="text-white/60 text-sm">Producer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">Top Billed Cast</h2>
            <div
              className="relative flex gap-4 overflow-x-auto pb-4 pl-2 pt-2"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255, 255, 255, 0.5) transparent",
              }}
            >
              {movie.credits?.cast?.slice(0, 10).map((actor) => (
                <Link
                  key={actor.id}
                  to={`/actor/${actor.id}`}
                  className="min-w-[150px] bg-white rounded-xl cursor-pointer hover:scale-105 transition-transform"
                >
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://via.placeholder.com/185x278?text=No+Image"
                    }
                    alt={actor.name}
                    className="w-full h-48 object-cover rounded-xl p-0.5"
                  />
                  <div className="p-3">
                    <p className="font-semibold text-black text-sm">
                      {actor.name}
                    </p>
                    <p className="text-gray-600 text-xs">{actor.character}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

