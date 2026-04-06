import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "@/config/tmdb";
import Navbar from "@/features/header/components/navbar/Navbar";
import logo2 from "@/assets/white-logo.svg";
import cardPlaceholder from "@/assets/card-placeholder.svg";
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
      <div className="min-h-screen bg-[#050608] text-white">
        <Navbar logo={logo2} />
        <div className="relative flex items-center justify-center px-6 py-24">
          <div className="absolute -left-16 top-20 h-48 w-48 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute -right-12 bottom-20 h-56 w-56 rounded-full bg-sky-300/15 blur-3xl" />
          <div className="relative rounded-2xl border border-white/15 bg-white/5 px-10 py-8 backdrop-blur-sm">
            <p className="text-xl tracking-wide">Loading movie details...</p>
          </div>
        </div>
      </div>
    );

  if (!movie)
    return (
      <div className="min-h-screen bg-[#050608] text-white">
        <Navbar logo={logo2} />
        <div className="flex min-h-[80vh] items-center justify-center px-6">
          <div className="rounded-2xl border border-red-300/40 bg-red-400/10 px-8 py-6 text-center">
            <p className="text-xl font-semibold">Movie not found</p>
            <p className="mt-2 text-sm text-red-100/80">
              We could not load this movie. Please try another title.
            </p>
          </div>
        </div>
      </div>
    );

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

  const formatMoney = (value: number) => {
    if (!value) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const releaseYear = movie.release_date?.split("-")[0];
  const userScore = Math.round(movie.vote_average * 10);
  const donutAngle = Math.round((userScore / 100) * 360);
  const backdropImage = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : cardPlaceholder;

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden text-white"
      style={{
        backgroundImage: backdropImage ? `url(${backdropImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,6,8,0.36) 0%, rgba(5,6,8,0.88) 46%, rgba(5,6,8,0.8) 100%)",
        }}
        aria-hidden="true"
      />

      <Navbar logo={logo2} />
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-md sm:p-8 lg:p-10">
          <div className="grid gap-8 sm:gap-12 sm:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="overflow-hidden rounded-2xl m-auto max-w-[300px] md:w-80 border border-white/20 bg-black/40 shadow-xl">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : cardPlaceholder
                  }
                  alt={movie.title}
                  className="h-full w-full object-cover "
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = cardPlaceholder;
                  }}
                />
              </div>
              <div className="rounded-2xl mt-5">
                <h3 className="text-2xl font-semibold">Movie Info</h3>
                <div className="mt-6 space-y-3">
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">
                      Release Date
                    </p>
                    <p className="mt-2 text-sm text-white/90">
                      {formatDate(movie.release_date)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">
                      Runtime
                    </p>
                    <p className="mt-2 text-sm text-white/90">
                      {formatRuntime(movie.runtime)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">
                      Revenue
                    </p>
                    <p className="mt-2 text-sm text-white/90">
                      {formatMoney(movie.revenue)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">
                      Revenue
                    </p>
                    <p className="mt-2 text-sm text-white/90">
                      {formatMoney(movie.revenue)}
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <main className="min-w-0">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {movie.title}
                <span className="ml-2 text-white/65 font-normal">
                  ({releaseYear})
                </span>
              </h1>
              <p className="mt-3 text-xs sm:text-sm uppercase tracking-[0.28em] text-amber-200/80">
                {movie.status}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <span className="rounded border border-amber-200/35 bg-amber-300/10 px-2 py-1 text-amber-100/90">
                  {movie.status === "Released" ? "PG-13" : "NR"}
                </span>
                <span className="text-white/80">
                  {formatDate(movie.release_date)}
                </span>
                <span className="text-white/40 hidden sm:inline">•</span>
                <div className="flex flex-wrap gap-2">
                  {movie.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                <span className="text-white/40 hidden sm:inline">•</span>
                <span className="text-white/80">
                  {formatRuntime(movie.runtime)}
                </span>
              </div>

              <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div
                    className="relative h-16 w-16 rounded-full p-1"
                    style={{
                      background: `conic-gradient(#cbb96c ${donutAngle}deg, rgba(255,255,255,0.14) 0deg)`,
                    }}
                  >
                    <div className="absolute inset-1 rounded-full bg-black/70 flex items-center justify-center ring-1 ring-white/10">
                      <span className="text-white font-semibold text-sm">
                        {userScore}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-semibold leading-none">
                      User Score
                    </p>
                    <p className="text-white/60 text-xs leading-none mt-1">
                      Average Score
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    aria-label="Add to list"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center hover:bg-amber-300/25 hover:ring-amber-200/60 transition backdrop-blur-sm"
                  >
                    <List size={18} />
                  </button>
                  <button
                    aria-label="Mark as favorite"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center hover:bg-amber-300/25 hover:ring-amber-200/60 transition backdrop-blur-sm"
                  >
                    <Heart size={18} />
                  </button>
                  <button
                    aria-label="Bookmark"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center hover:bg-amber-300/25 hover:ring-amber-200/60 transition backdrop-blur-sm"
                  >
                    <Bookmark size={18} />
                  </button>
                </div>
              </div>

              {movie.tagline && (
                <p className="mt-6 text-amber-100/90 italic text-base sm:text-lg">
                  “{movie.tagline}”
                </p>
              )}

              <section className="mt-6 rounded-2xl border border-white/10 bg-black/30 px-5 pb-5 pt-4">
                <h3 className="text-2xl font-semibold">Overview</h3>
                <div className="mt-4 max-h-44 overflow-y-auto pr-1">
                  <p className="text-white/90 leading-relaxed text-sm sm:text-base">
                    {movie.overview}
                  </p>
                </div>
              </section>
              <section className="rounded-2xl  py-5 ">
                <div className="flex justify-between flex-wrap items-center mb-4 gap-2">
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    Top Billed Cast
                  </h2>
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-amber-200/80">
                    Top {Math.min(movie.credits?.cast?.length || 0, 10)} cast members
                  </p>
                </div>
                <div
                  className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pl-2 pt-3"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(255, 255, 255, 0.5) transparent",
                    WebkitMaskImage:
                      "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(100% - 56px), rgba(0,0,0,0) 100%)",
                    maskImage:
                      "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(100% - 56px), rgba(0,0,0,0) 100%)",
                  }}
                >
                  {movie.credits?.cast?.slice(0, 10).map((castMember) => (
                    <Link
                      key={castMember.id}
                      to={`/actor/${castMember.id}`}
                      className="group min-w-[150px] sm:min-w-[155px] max-w-[155px] snap-start overflow-hidden rounded-xl border border-white/15 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200/80 hover:bg-white/15 hover:shadow-lg hover:shadow-amber-300/20"
                    >
                      <img
                        src={
                          castMember.profile_path
                            ? `https://image.tmdb.org/t/p/w185${castMember.profile_path}`
                            : cardPlaceholder
                        }
                        alt={castMember.name}
                        className="w-full h-50 object-cover"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = cardPlaceholder;
                        }}
                      />
                      <div className="p-3 space-y-1 h-18">
                        <p className="font-semibold text-white text-sm leading-tight line-clamp-2">
                          {castMember.name}
                        </p>
                        <p className="text-xs text-white/70">
                          {castMember.character}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
