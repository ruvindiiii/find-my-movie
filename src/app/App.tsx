import LandingPage from "../pages/landingPage/LandingPage";
import SearchMovies from "../components/SearchMovies";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const { inputValue } = useSelector((state) => state.headerSearch);

  return (
    <>
      <div>
        <Header />
        {inputValue ? <SearchMovies /> : <LandingPage />}
      </div>
    </>
  );
}

export default App;
