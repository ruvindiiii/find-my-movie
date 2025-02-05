import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import MovieInfo from "./MovieInfoPage.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import GenreView from "./GenreView.tsx";
import UserLogIn from "./UserLogIn";
import SignUp from "./SignUpPage.tsx";
import WatchList from "./WatchList.tsx";
import store from "./redux/store.ts";
import { Provider } from "react-redux";

import "./output.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/user-login" element={<UserLogIn />} />
          <Route path="/movie-info/:id" element={<MovieInfo />} />
          <Route path="/genre/:id" element={<GenreView />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/watch-list" element={<WatchList />} />
        </Routes>
      </Provider>
    </StrictMode>
  </BrowserRouter>
);
