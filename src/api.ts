import type { MovieShape, MovieWithProviders } from "./types";

const tmdbBearer = import.meta.env.VITE_TMDB_BEARER;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getGenreObjArr = async () => {
  let url = `${tmdbBaseUrl}/genre/movie/list?language=en`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: tmdbBearer,
    },
  });
  let result = await response.json();

  return result;
};

export const getMovieData = async (id: any) => {
  let url = `${tmdbBaseUrl}/movie/${id}`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: tmdbBearer,
    },
  });
  let result = await response.json();
  return result;
};

export const getMovieDataUrl = async (id: any) => {
  let movieInfoUrl = `${tmdbBaseUrl}/movie/${id}/videos`;
  let response = await fetch(movieInfoUrl, {
    method: "GET",
    headers: {
      Authorization: tmdbBearer,
    },
  });
  let result = await response.json();
  return result;
};

export const genreMovies = async (id: any) => {
  let url = `${tmdbBaseUrl}/discover/movie?with_genres=${id}`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: tmdbBearer,
    },
  });
  let result = await response.json();
  return result;
};

export const getLandingMovies = async () => {
  let url = `${tmdbBaseUrl}/discover/movie`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: tmdbBearer,
    },
  });
  let result = await response.json();
  return result;
};

export const findMovies = async (inputValue: string) => {
  let url = `${tmdbBaseUrl}/search/movie?&query=${inputValue}`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: tmdbBearer,
    },
  });
  let movieResults = await response.json();
  return movieResults;
};

export const movieProviders = async (id: string | undefined) => {
  let url = `${tmdbBaseUrl}/movie/${id}/watch/providers`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: tmdbBearer,
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
  let url = `${tmdbBaseUrl}/3/configuration/countries`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: tmdbBearer,
    },
  });
  let result = await response.json();
  return result;
};

export const getLandingPageTrailers = async (mappedMovies: MovieShape[]) => {
  let movieDetailFetchUrlArr = mappedMovies.map((listItem: any) => {
    return `${tmdbBaseUrl}/movie/${listItem.id}/videos`;
  });

  let trailerKeyArr = [];
  for (let i = 0; i < movieDetailFetchUrlArr.length; i++) {
    let response = await fetch(movieDetailFetchUrlArr[i], {
      method: "GET",
      headers: {
        Authorization: tmdbBearer,
      },
    });
    const result = await response.json();

    if (result.results.length) {
      trailerKeyArr.push(
        `https://www.youtube.com/embed/${result.results[0].key}`
      );
    }
  }

  return trailerKeyArr;
};
