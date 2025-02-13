import { useNavigate, useLocation } from "react-router-dom";
import filteringbtn from "./../assets/filteringbtn.png";
import backbtnimage from "./../assets/backbtnimage.png";
import "./../styles/Header.css";

const Header = ({ text }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const showFilterButton =
    location.pathname === "/consulting/offline" ||
    location.pathname === "/consulting/online";
  return (
    <div className="header">
      <div className="backbtn">
        <button onClick={() => navigate(-1)} className="backbtn">
          <img src={backbtnimage} className="backbtnimage"></img>
        </button>
      </div>
      <div className="offline-designer-choose">{text}</div>
      {showFilterButton ? (
        <div className="filter">
          <button className="filterbtn">
            <img
              src={filteringbtn}
              alt="filteringbtn"
              className="filterbtnimage"
            />
          </button>
        </div>
      ) : (
        <div className="filter-placeholder"></div>
      )}
    </div>
  );
};
export default Header;
