import { Button, Dropdown, Space } from "antd";
import { useEffect } from "react";
import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { setGenres } from "./redux/genres";
import { useSelector } from "react-redux";

const bearer =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNThkZDVjOTUxZGU3NDgxMmQ0N2VhYWM1Nzc1NGQ0NiIsIm5iZiI6MTY5NTk4NjU2My45MjMsInN1YiI6IjY1MTZiMzgzOTY3Y2M3MDBhY2I4NjZiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sYLz8lc9f6Wzx3VIDSVSfLYOhTgPClAOEpPVhO8jIAM";

const DropDown = () => {
  const dispatch = useDispatch();

  const { genres } = useSelector((state) => state.genre);

  useEffect(() => {
    const GetGenres = async () => {
      let url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
      let response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: bearer,
        },
      });
      let result = await response.json();
      let genreObjArr = result.genres.map((genreObj: any) => {
        return {
          key: genreObj.id + "",
          label: (
            <NavLink to={`/genre/${genreObj.id}`}>{genreObj.name}</NavLink>
          ),
        };
      });
      dispatch(setGenres(genreObjArr));
    };
    GetGenres();
  }, []);
  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown
          menu={{
            items: genres,
          }}
          placement="bottom"
          arrow={{
            pointAtCenter: true,
          }}
        >
          <Button>Genres</Button>
        </Dropdown>
      </Space>
      <Space wrap></Space>
    </Space>
  );
};
export default DropDown;
