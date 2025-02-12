import { useNavigate } from "react-router-dom";
import homebtn_red from "./../assets/homebtn_red.png";
import mypagebtn_gray from "./../assets/mypagebtn_gray.png";
import Calendarbtn_gray from "./../assets/Calendarbtn_gray.png";
import "../styles/Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <button
        className="footer-button"
        onClick={() => navigate("/main")}
      >
        <img src={homebtn_red} alt="메인" className="footer-icon" />
      </button>
      <button
        className="footer-button"
        onClick={() => navigate("/search")}
      >
        <img
          src={mypagebtn_gray}
          alt="검색"
          className="footer-icon"
        />
      </button>
      <button
        className="footer-button"
        onClick={() => navigate("/calendar")}
      >
        <img
          src={Calendarbtn_gray}
          alt="캘린더"
          className="footer-icon"
        />
      </button>
    </div>
  );
};

export default Footer;
