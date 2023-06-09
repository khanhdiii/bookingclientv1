import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../../pages/loading/Loading";
import { newSearch } from "../../redux/searchSlice";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Đà Nẵng,Hội An,Hà Nội"
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDestinationClick = (name) => {
    const destination = name;
    const dates = [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ];
    const options = {
      adult: 2,
      children: 0,
      room: 1,
    };

    dispatch(newSearch({ destination, dates, options }));
    navigate("/hotels");
  };

  return (
    <div className="featured">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            className="featuredItem"
            onClick={() => handleDestinationClick("Đà Nẵng")}
          >
            <img
              src="https://cf.bstatic.com/xdata/images/city/600x600/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Đà Nẵng</h1>

              <h6>{data[0]}</h6>
            </div>
          </div>
          <div
            className="featuredItem"
            onClick={() => handleDestinationClick("Hội An")}
          >
            <img
              src="https://cf.bstatic.com/xdata/images/city/600x600/688866.jpg?k=fc9d2cb9fe2f6d1160e10542cd2b83f5a8008401d33e8750ee3c2691cf4d4f7e&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hội An</h1>
              <h6>{data[1]}</h6>
            </div>
          </div>
          <div
            className="featuredItem"
            onClick={() => handleDestinationClick("Hà Nội")}
          >
            <img
              src="https://cf.bstatic.com/xdata/images/city/600x600/688853.jpg?k=f6427c8fccdf777e4bbc75fcd245e7c66204280181bea23350388c76c57348d1&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hà Nội</h1>
              <h6>{data[2]}</h6>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
