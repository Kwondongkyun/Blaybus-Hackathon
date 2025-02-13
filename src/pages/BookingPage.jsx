import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import '../styles/BookingPage.css';

// 공통 계좌 정보
const COMPANY_ACCOUNT = {
  account: "신한은행 110-123-456789",
  accountHolder: "Bliss(김아정)"
};

function BookingPage() {
  const navigate = useNavigate();
  const { type, designerId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = new Date(queryParams.get('date'));
  const selectedTime = queryParams.get('time');
  const [selectedDateState, setSelectedDate] = useState(selectedDate);
  const [selectedTimeState, setSelectedTime] = useState(selectedTime);
  const [timeSlots, setTimeSlots] = useState({ morning: [], afternoon: [] });
  const [designer, setDesigner] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 디자이너 정보 가져오기
  useEffect(() => {
    // 실제로는 API 호출로 대체될 부분
    const designerData = {
      1: {
        name: "이초 디자이너",
        price: { offline: 40000, online: 20000 },
        location: "서울 강남구 압구정로79길"
      },
      2: {
        name: "로로 원장",
        price: { offline: 40000, online: 34000 },
        location: "서울 마포구 어울마당로 19"
      },
      3: {
        name: "슈 대표원장",
        price: { offline: 41000, online: 20000 },
        location: "서울 마포구 동교로 255"
      },
      4: {
        name: "랑 원장",
        price: { offline: 41000, online: 34000 },
        location: "서울 마포구 와우산로 101"
      },
      5: {
        name: "히지 디자이너",
        price: { offline: 31000, online: 20000 },
        location: "서울 성동구 왕십리로8길 3"
      },
      6: {
        name: "현영 디자이너",
        price: { offline: 30000, online: 34000 },
        location: "서울 성동구 왕십리로 106"
      },
      7: {
        name: "나나 디자이너",
        price: { offline: 32000, online: 34000 },
        location: "서울 성동구 성수일로4길 33"
      },
      8: {
        name: "이아 디자이너",
        price: { offline: 40000, online: 20000 },
        location: "서울 성동구 성수일로6길"
      },
      9: {
        name: "주 디자이너",
        price: { offline: 41000, online: 34000 },
        location: "서울 성동구 왕십리로2길"
      },
      10: {
        name: "희 수석디자이너",
        price: { offline: 40000, online: 34000 },
        location: "서울 강남구 논현로85길 43"
      },
      11: {
        name: "시오 부원장",
        price: { offline: 30000, online: 22000 },
        location: "서울 서초구 강남대로97길"
      },
      12: {
        name: "휘리 원장",
        price: { offline: 40000, online: 20000 },
        location: "서울 마포구 양화로7안길 12"
      },
      13: {
        name: "유하 디자이너",
        price: { offline: 34000, online: 34000 },
        location: "서울 마포구 잔다리로 48"
      },
      14: {
        name: "은이 수석디자이너",
        price: { offline: 32000, online: 20000 },
        location: "서울 마포구 홍익로5길"
      },
      15: {
        name: "미미 컬러리스트",
        price: { offline: 41000, online: 34000 },
        location: "서울 마포구 양화로 100"
      },
      16: {
        name: "하루 컬러리스트",
        price: { offline: 40000, online: 20000 },
        location: "서울 마포구 홍익로 3"
      }
    }[designerId];

    setDesigner(designerData);
  }, [designerId]);

  // 시간대 생성 (10:00 ~ 20:00, 30분 단위)
  useEffect(() => {
    const morning = [];
    const afternoon = [];
    
    for (let hour = 10; hour < 20; hour++) {
      const timeSlot1 = `${hour.toString().padStart(2, '0')}:00`;
      const timeSlot2 = `${hour.toString().padStart(2, '0')}:30`;
      
      if (hour < 12) {
        morning.push(timeSlot1, timeSlot2);
      } else {
        afternoon.push(timeSlot1, timeSlot2);
      }
    }
    setTimeSlots({ morning, afternoon });
  }, []);

  // 오늘 날짜와 3개월 후 날짜 설정
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDateState || !selectedTimeState) {
      alert('날짜와 시간을 모두 선택해주세요.');
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmModal(true);
    
    // 3초 후에 예약 목록 페이지로 이동
    setTimeout(() => {
      const newReservation = {
        id: Date.now(),
        designerId,
        designerName: designer.name,
        type,
        date: selectedDateState.toISOString().split('T')[0],
        time: selectedTimeState,
        price: type === 'offline' ? designer.price.offline : designer.price.online,
        paymentMethod,
        status: 'pending',
        location: type === 'offline' ? designer.location : '화상 상담',
        account: COMPANY_ACCOUNT.account,
        accountHolder: COMPANY_ACCOUNT.accountHolder
      };

      const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      localStorage.setItem('reservations', JSON.stringify([...existingReservations, newReservation]));
      
      navigate('/reservations');
    }, 3000);
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleShowPayment = () => {
    setShowPaymentModal(true);
  };

  if (!designer) return <div>로딩중...</div>;

  return (
    <div className="booking-confirmation-container">
      <h2>예약 확인</h2>
      
      <div className="booking-info">
        <div className="info-item">
          <span>디자이너</span>
          <span>{designer.name}</span>
        </div>
        <div className="info-item">
          <span>상담 유형</span>
          <span>{type === 'offline' ? '대면 상담' : '화상 상담'}</span>
        </div>
        <div className="info-item">
          <span>날짜</span>
          <span>{selectedDateState.toLocaleDateString()}</span>
        </div>
        <div className="info-item">
          <span>시간</span>
          <span>{selectedTimeState}</span>
        </div>
        <div className="info-item">
          <span>가격</span>
          <span>{(type === 'offline' ? designer.price.offline : designer.price.online).toLocaleString()}원</span>
        </div>
        {type === 'offline' && (
          <div className="info-item">
            <span>위치</span>
            <span>{designer.location}</span>
          </div>
        )}
      </div>

      <button className="show-payment-button" onClick={handleShowPayment}>
        결제하기
      </button>

      {showPaymentModal && (
        <div className="payment-modal">
          <div className="payment-content">
            <h3>결제 방식 선택</h3>
            <div className="payment-methods">
              <button
                className={`payment-button ${paymentMethod === 'account' ? 'selected' : ''}`}
                onClick={() => handlePaymentSelect('account')}
              >
                계좌이체
              </button>
              <button
                className={`payment-button ${paymentMethod === 'kakaopay' ? 'selected' : ''}`}
                onClick={() => handlePaymentSelect('kakaopay')}
              >
                카카오페이
              </button>
            </div>

            {paymentMethod === 'account' && (
              <div className="account-info">
                <p>입금 계좌: {COMPANY_ACCOUNT.account}</p>
                <p>예금주: {COMPANY_ACCOUNT.accountHolder}</p>
              </div>
            )}

            <div className="payment-actions">
              <button className="cancel-button" onClick={() => setShowPaymentModal(false)}>
                이전으로
              </button>
              <button className="confirm-button" onClick={handleConfirm}>
                결제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="confirm-modal">
          <div className="confirm-content">
            <div className="confirm-icon">✓</div>
            <h3>예약이 완료되었습니다!</h3>
            <div className="confirm-details">
              <div className="confirm-detail-item">
                <span>디자이너</span>
                <span>{designer.name}</span>
              </div>
              <div className="confirm-detail-item">
                <span>상담 유형</span>
                <span>{type === 'offline' ? '대면 상담' : '화상 상담'}</span>
              </div>
              <div className="confirm-detail-item">
                <span>날짜</span>
                <span>{selectedDateState.toLocaleDateString()}</span>
              </div>
              <div className="confirm-detail-item">
                <span>시간</span>
                <span>{selectedTimeState}</span>
              </div>
              <div className="confirm-detail-item">
                <span>결제 금액</span>
                <span>{(type === 'offline' ? designer.price.offline : designer.price.online).toLocaleString()}원</span>
              </div>
            </div>
            <p className="redirect-message">잠시 후 예약 내역 페이지로 이동합니다.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingPage; 