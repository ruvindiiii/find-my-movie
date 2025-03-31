export type MovieShape = {
  title: string;
  overview: string;
  image: string;
  id: number;
  rating: number;
};

export type MovieWithProviders = {
  title: string;
  overview: string;
  image: string;
  id: number;
  providers: MovieProviderShape[];
};

export type GenreShape = {
  key: string;
  label: JSX.IntrinsicElements;
};

export type MovieProviderShape = {
  name: string;
  logo: string;
};

export type MovieWithToken = {
  movie: MovieWithProviders;
  token: string;
};

export type MovieIdWithToken = {
  movieId: number;
  token: string;
};
