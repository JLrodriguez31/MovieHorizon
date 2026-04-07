import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchActorDetails, fetchActorMovies } from "@/config/tmdb";
import Navbar from "@/features/header/components/navbar/Navbar";
import cardPlaceholder from "@/assets/card-placeholder.svg";

interface ActorDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  profile_path: string;
  known_for_department: string;
  gender: number;
  also_known_as: string[];
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  character: string;
}

export default function ActorDetailsPage() {
  const { id } = useParams();
  const [actor, setActor] = useState<ActorDetails | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      try {
        setLoading(true);
        const [actorData, moviesData] = await Promise.all([
          fetchActorDetails(id),
          fetchActorMovies(id),
        ]);
        setActor(actorData);
        setMovies(moviesData.slice(0, 10));
      } catch (error) {
        console.error("Error loading actor details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#050608] text-white">
        <Navbar />
        <div className="relative flex items-center justify-center px-6 py-24">
          <div className="absolute -left-16 top-20 h-48 w-48 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute -right-12 bottom-20 h-56 w-56 rounded-full bg-sky-300/15 blur-3xl" />
          <div className="relative rounded-2xl border border-white/15 bg-white/5 px-10 py-8 backdrop-blur-sm">
            <p className="text-xl tracking-wide">Loading actor profile...</p>
          </div>
        </div>
      </div>
    );

  if (!actor)
    return (
      <div className="min-h-screen bg-[#050608] text-white">
        <Navbar/>
        <div className="flex min-h-[80vh] items-center justify-center px-6">
          <div className="rounded-2xl border border-red-300/40 bg-red-400/10 px-8 py-6 text-center">
            <p className="text-xl font-semibold">Actor not found</p>
            <p className="mt-2 text-sm text-red-100/80">
              We could not load this profile. Please try another actor.
            </p>
          </div>
        </div>
      </div>
    );

  const getAge = () => {
    if (!actor.birthday) return "N/A";
    const birthDate = new Date(actor.birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getGender = () => {
    return actor.gender === 1 ? "Female" : actor.gender === 2 ? "Male" : "N/A";
  };

  const getReleaseYear = (dateString: string) => {
    if (!dateString) return "TBA";
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[url('@/assets/03.png')] bg-cover bg-no-repeat bg-center text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,8,0.9)_0%,rgba(5,6,8,0.3)_50%,rgba(5,6,8,1.8)_100%)]"
        aria-hidden="true"
      />
      <Navbar />
      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-md sm:p-8 lg:p-10">
          <div className="grid gap-8 sm:gap-12 sm:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-28 lg:self-start ">
              <div className="overflow-hidden rounded-2xl border m-auto max-w-[300px] md:w-80 ring-1 ring-white/20 border-white/20 bg-black/40 shadow-xl">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : cardPlaceholder
                  }
                  alt={actor.name}
                  className="object-cover"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = cardPlaceholder;
                  }}
                />
              </div>

              <div className="mt-5 rounded-2xl">
                <h3 className="text-2xl font-semibold">Personal Info</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-1 lg:grid-cols-1">
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">
                      Gender
                    </p>
                    <p className="mt-2 text-sm text-white/90">{getGender()}</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">
                      Birthday
                    </p>
                    <p className="mt-2 text-sm text-white/90">
                      {formatDate(actor.birthday)} ({getAge()} years old)
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">
                      Place of Birth
                    </p>
                    <p className="mt-2 text-sm text-white/90">
                      {actor.place_of_birth || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <main className="min-w-0">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                {actor.name}
              </h1>
              <p className="mt-3 text-sm uppercase tracking-[0.28em] text-amber-200/80">
                {actor.known_for_department || "Performer"}
              </p>

              <section className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6">
                <h2 className="text-2xl font-semibold">Biography</h2>
                <div
                  className="mt-4 max-h-52 overflow-y-auto pr-1 "
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(255, 255, 255, 0.35) transparent",
                  }}
                >
                  <p className="leading-relaxed text-white/85">
                    {actor.biography || "No biography available."}
                  </p>
                </div>
              </section>

              <section className="mt-8">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold">Known For</h2>
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-amber-200/80">
                    Top {movies.length} appearances
                  </p>
                </div>

                <div
                  className="mt-4 pt-1 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 "
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(255, 255, 255, 0.35) transparent",
                    WebkitMaskImage:
                      "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(100% - 56px), rgba(0,0,0,0) 100%)",
                    maskImage:
                      "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(100% - 56px), rgba(0,0,0,0) 100%)",
                  }}
                >
                  {movies.map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/movie/${movie.id}`}
                      className="group min-w-[165px] snap-start"
                    >
                      <article className="overflow-hidden rounded-xl border border-white/15 bg-white/5 transition duration-300 group-hover:-translate-y-1 group-hover:border-amber-200/80 group-hover:shadow-lg group-hover:shadow-amber-300/20">
                        <img
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                              : cardPlaceholder
                          }
                          alt={movie.title}
                          className="h-52 w-full object-cover"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = cardPlaceholder;
                          }}
                        />
                        <div className="space-y-1 p-3 h-18">
                          <p className="line-clamp-2 text-sm font-semibold leading-tight">
                            {movie.title}
                          </p>
                          <p className="text-xs text-white/70">
                            {getReleaseYear(movie.release_date)}
                            {movie.character ? ` • ${movie.character}` : ""}
                          </p>
                        </div>
                      </article>
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
