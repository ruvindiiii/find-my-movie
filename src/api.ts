import type { MovieWithProviders } from "./types";

const bearer =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNThkZDVjOTUxZGU3NDgxMmQ0N2VhYWM1Nzc1NGQ0NiIsIm5iZiI6MTY5NTk4NjU2My45MjMsInN1YiI6IjY1MTZiMzgzOTY3Y2M3MDBhY2I4NjZiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sYLz8lc9f6Wzx3VIDSVSfLYOhTgPClAOEpPVhO8jIAM";
const baseUrl = "https://api.themoviedb.org/3";
const backendUrl = "http://35.180.209.175:3000";

export const getGenreObjArr = async () => {
  let url = `${baseUrl}/genre/movie/list?language=en`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: bearer,
    },
  });
  let result = await response.json();

  return result;
};

export const getMovieData = async (id: any) => {
  let url = `${baseUrl}/movie/${id}`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: bearer,
    },
  });
  let result = await response.json();
  return result;
};

export const getMovieDataUrl = async (id: any) => {
  let movieInfoUrl = `${baseUrl}/movie/${id}/videos`;
  let response = await fetch(movieInfoUrl, {
    method: "GET",
    headers: {
      Authorization: bearer,
    },
  });
  let result = await response.json();
  return result;
};

export const genreMovies = async (id: any) => {
  let url = `${baseUrl}/discover/movie?with_genres=${id}`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: bearer,
    },
  });
  let result = await response.json();
  return result;
};

export const getLandingMovies = async () => {
  let url = `${baseUrl}/discover/movie`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: bearer,
    },
  });
  let result = await response.json();
  return result;
};

export const findMovies = async () => {
  let url = `${baseUrl}/search/movie?&query=${inputValue}`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: bearer,
    },
  });
  let movieResults = await response.json();
  return movieResults;
};

export const movieProviders = async (id: string | undefined) => {
  let url = `${baseUrl}/movie/${id}/watch/providers`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: bearer,
    },
  });
  let result = await response.json();
  return result;
};

export const persistListToDb = async (
  movies: MovieWithProviders[],
  token: string
) => {
  let url = `${backendUrl}/watch-list/persist-list`;
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      movies: JSON.stringify(movies).replaceAll("'", ""),
    }),
  });
};

export const getWatchList = async (
  token: string
): Promise<MovieWithProviders[]> => {
  let url = `${backendUrl}/watch-list?token=${token}`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let result: MovieWithProviders[] = await response.json();
  return result;
};

export const getCountryList = async () => {
  let url = "https://api.themoviedb.org/3/configuration/countries";
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: bearer,
    },
  });
  let result = await response.json();
  console.log(result);
  return result;
};
