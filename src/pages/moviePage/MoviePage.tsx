// src/pages/MovieListPage.tsx
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../../config/tmdb";
import MovieCard from "../../components/Card/MovieCard";
import FadeInOnScroll from "../../components/animations/FadeInOnScroll";
import { useEffect, useRef } from "react";
import type { Movie } from "../../types/movieTypes";
import Navbar from "../../features/header/components/navbar/Navbar";
import logo2 from "../../assets/white-logo.svg";

export default function MoviePage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["popular-movies"],
      initialPageParam: 1,
      queryFn: ({ pageParam = 1 }) => fetchPopularMovies(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.total_pages ? nextPage : undefined;
      },
    });

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      <div className="bg-[url('@/assets/bg-mj.png')] bg-cover bg-center h-full bg-fixed bg-no-repeat">
        <Navbar logo={logo2} />
        {/* Page header */}
        <div className="md:mx-16 mx-6 flex justify-center flex-col items-center">
          <h1 className="text-3xl md:text-5xl pb-4 font-semibold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Popular Movies
          </h1>
          <p className="text-white/70 text-sm md:text-base lg:text-lg pb-5">
            Explore the trends and hits of the moment. Enjoy the best cinema.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:mx-16 mx-6 gap-6 mt-4">
          {data?.pages.map((page) =>
            page.results.map((movie: Movie, idx: number) => (
              <FadeInOnScroll key={movie.id} delayMs={(idx % 10) * 50}>
                <MovieCard movie={movie} />
              </FadeInOnScroll>
            ))
          )}
          <div ref={loadMoreRef} className="h-10 col-span-full" />
          {isFetchingNextPage && (
            <p className="col-span-full text-center">Cargando más...</p>
          )}
        </div>
      </div>
    </>
  );
}
