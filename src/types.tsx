export type MovieShape = {
  title: string;
  overview: string;
  image: string;
  id: number;
};

export type GenreShape = {
  key: string;
  label: JSX.IntrinsicElements;
};

export type MovieProviderShape = {
  provider: string;
  logo: string;
};
