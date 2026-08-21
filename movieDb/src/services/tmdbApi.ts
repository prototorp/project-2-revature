import type { MovieDetails,TMDBResponse } from "../types/movie";

const token = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
//import type { Movie } from "../types/movie";

export async function fetchTMDB(endpoint: string): Promise<TMDBResponse> {
  const response = await fetch(`https://api.themoviedb.org/3/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(` TMDB request failed : ${response.status}`);
  }
  const data: TMDBResponse = await response.json();
  console.log("TMDB endpoint:", endpoint);
console.log("TMDB response:", data);

  return data;
}

export const searchMovies =  async(query: string): Promise<TMDBResponse> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }
  );
  if(!response.ok){
        throw new Error(`TMDB search failed: ${response.status}`);
  }
  const data :TMDBResponse =await response.json();
   
  console.log("Search query:", query);
  console.log("TMDB response:", data);
  return data

};

export const getMovieDetails = async (
  id: number
): Promise<MovieDetails> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`TMDB details failed: ${response.status}`);
  }

  const data: MovieDetails = await response.json();
  console.log("Movie Details:" , data);
  return data;
};

/* 
fetchTMDB("movie/popular").then(data=>{
     console.log(data);

});

*/
