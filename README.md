# Find My Movie - Frontend

Find my movie is a barebones movie explorer built leveraging the TMDB API and a [custom backend](https://github.com/ruvindiiii/find-my-movie-backend/). The webapp allows you to search, view and maintain your watchlists. It also provides information about where you can watch the movie (providers like Amazon Prime, Netflix, etc).

# Screenshots

## Search Page

![alt landing-page](https://raw.githubusercontent.com/ruvindiiii/find-my-movie/refs/heads/main/preview/search-page-sc.png)

## Movie Info Page

![alt landing-page](https://raw.githubusercontent.com/ruvindiiii/find-my-movie/refs/heads/main/preview/movie-info-page-sc.png)

## Landing Page

![alt landing-page](https://raw.githubusercontent.com/ruvindiiii/find-my-movie/refs/heads/main/preview/landing-page-sc.png)

## Watchlist Page

![alt landing-page](https://raw.githubusercontent.com/ruvindiiii/find-my-movie/refs/heads/main/preview/watchlist-page-sc.png)

# Live Demo

Currently there is a [live version hosted on S3](http://findmymovieapp.s3-website.eu-west-3.amazonaws.com) which communicates with the [backend](<(https://github.com/ruvindiiii/find-my-movie-backend/)>) hosted on an EC2 instance.

# Getting started

In order to develop or run, clone the repository and then create an .env file based on the .env.sample file in the root. Then you will be able to run the project using `npm run dev`

Tailwind should also be run separately using `npm run tailwind` which will run in watch mode.

The project uses a standard Vite + React + TS setup.

# Functionalities

- Search movies
- Search by genre
- View trailers / description
- View movie providers
- View movie rating
- Create watchlist
- User login
- User register
