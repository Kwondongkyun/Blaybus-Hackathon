import React from "react";
import { useNavigate } from "react-router-dom";
import location from "./../assets/location.svg";
import "../styles/DesignerList.css";

const DesignerGrid = ({
  designers,
  filteredDesigners,
  type,
}) => {
  const navigate = useNavigate();

  const handleDesignerSelect = (designerId) => {
    navigate(`/designer/${type}/${designerId}`);
  };

  return (
    <div className="designer-grid">
      {filteredDesigners === null ? (
        designers.map((designer) => (
          <div
            key={designer.id}
            className="designer-card"
            onClick={() => handleDesignerSelect(designer.id)}
          >
            <div className="designerlist-info">
              <img
                src={designer.profile}
                alt={designer.name}
                className="designerlist-profile"
              />
              <div className="designerlist-text">
                <h2>{designer.name}</h2>
                <p className="designerlist-region">
                  <img src={location} alt="location icon" />
                  {designer.region}
                  <span
                    className="designerlist-field"
                    data-field={designer.field}
                  >
                    {designer.field}
                  </span>
                </p>
                <p className="introduction">{`# ${designer.introduction}`}</p>
              </div>
              <button className="select-reserve-button">
                예약하기
              </button>
            </div>
            <div className="designerlist-portfolio">
              {designer.portfolios.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${designer.name} 포트폴리오 ${
                    index + 1
                  }`}
                  className="portfolio-image"
                />
              ))}
            </div>
          </div>
        ))
      ) : filteredDesigners.length > 0 ? (
        filteredDesigners.map((designer) => (
          <div
            key={designer.id}
            className="designer-card"
            onClick={() => handleDesignerSelect(designer.id)}
          >
            <div className="designerlist-info">
              <img
                src={designer.profile}
                alt={designer.name}
                className="designerlist-profile"
              />
              <div className="designerlist-text">
                <h2>{designer.name}</h2>
                <p className="designerlist-region">
                  <img src={location} alt="location icon" />
                  {designer.region}
                  <span
                    className="designerlist-field"
                    data-field={designer.field}
                  >
                    {designer.field}
                  </span>
                </p>
                <p className="introduction">{`# ${designer.introduction}`}</p>
              </div>
              <button className="select-reserve-button">
                예약하기
              </button>
            </div>
            <div className="designerlist-portfolio">
              {designer.portfolios.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${designer.name} 포트폴리오 ${
                    index + 1
                  }`}
                  className="portfolio-image"
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default DesignerGrid;
