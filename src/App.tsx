import LandingPage from "./LandingPage";
import SearchMovies from "./SearchMovies";
import Header from "./Header";
import { useSelector } from "react-redux";

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
