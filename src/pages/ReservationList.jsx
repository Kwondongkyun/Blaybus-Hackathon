import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as R from '../styles/ReservationListStyles';
import Back from '../assets/back.png';
import RectangleGray from '../assets/rectanglegray.png'
import Footer from '../components/Footer.jsx';
import HeaderReservation from '../components/HeaderReservation.jsx';

const ReservationList = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleCancelClick = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  return (
    <R.Container>
      <HeaderReservation/>
      <R.Title>
        <R.BackImage src={Back} alt="Back" />
        <R.TitleContent>예약 내역 조회</R.TitleContent>
      </R.Title>
      <R.Title2>예약 내역</R.Title2>
      <R.Consulting>
        <R.CT>비대면 컨설팅은 <br/> 하단 구글 미트에서 진행됩니다</R.CT>
        <R.CLink>링크 주소</R.CLink>
      </R.Consulting>
      <R.ConsultingContent>
        <R.D>
          <R.De>디자이너</R.De>
          <R.Des>아초 디자이너</R.Des>
        </R.D>
        <R.C>
          <R.Co>컨설팅 유형</R.Co>
          <R.Con>비대면 컨설팅</R.Con>
        </R.C>
        <R.D2>
          <R.Da>날짜</R.Da>
          <R.Dat>2025.06.06</R.Dat>
        </R.D2>
        <R.T>
          <R.Ti>시간</R.Ti>
          <R.Tim>10:00</R.Tim>
        </R.T>
        <R.P>
          <R.Pr>가격</R.Pr>
          <R.Pri>40,000원</R.Pri>
        </R.P>
      </R.ConsultingContent>
      <R.Button onClick={handleCancelClick}>예약 취소</R.Button>

      {showPopup && (
        <R.PopupOverlay onClick={handleClosePopup}>
          <R.Popup>
            <R.RectangleGrayImage src={RectangleGray} alt="RectangleGray"/>
            <R.PopupTitle>정말 취소하시겠습니까?</R.PopupTitle>
            <R.PopupText>선택하신 날짜와 시간은 취소되고, <br/> 메인 화면으로 돌아갑니다.</R.PopupText>
            <R.PopupButtonGroup>
              <R.PopupButton primary onClick={handleClosePopup}>예약 취소</R.PopupButton>
              <R.PopupButton onClick={handleClosePopup}>돌아가기</R.PopupButton>
            </R.PopupButtonGroup>
          </R.Popup>
        </R.PopupOverlay>
      )}
      <Footer/>
    </R.Container>
  );
}

export default ReservationList;
