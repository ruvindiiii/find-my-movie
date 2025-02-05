import { Button, Dropdown, Space } from "antd";
import { useEffect } from "react";
import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { setGenres } from "./redux/genres";
import { useSelector } from "react-redux";
import { getGenreObjArr } from "./api";

const DropDown = () => {
  const dispatch = useDispatch();

  const { genres } = useSelector((state) => state.genre);

  useEffect(() => {
    const GetGenres = async () => {
      let result = await getGenreObjArr();
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
