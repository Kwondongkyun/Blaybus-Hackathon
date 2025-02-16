<<<<<<< HEAD
import { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import "../styles/BookingPage.css";

// 공통 계좌 정보
const COMPANY_ACCOUNT = {
  account: "신한은행 110-123-456789",
  accountHolder: "Bliss(김아정)",
};

function BookingPage() {
  const navigate = useNavigate();
  const { type, designerId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = new Date(queryParams.get("date"));
  const selectedTime = queryParams.get("time");
  const [selectedDateState, setSelectedDate] = useState(selectedDate);
  const [selectedTimeState, setSelectedTime] = useState(selectedTime);
  const [timeSlots, setTimeSlots] = useState({
    morning: [],
    afternoon: [],
  });
  const [designer, setDesigner] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [googleMeetLink, setGoogleMeetLink] = useState(null);
  const [googleMeetLink, setGoogleMeetLink] = useState(null);

  // 디자이너 정보 가져오기
  useEffect(() => {
    const fetchDesigner = async () => {
      try {
        const response = await fetch(
          "https://blaybus-glowup.com/designers"
        );
        const data = await response.json();
        const designerData = data.find((d) => d.id === designerId);
        setDesigner(designerData);
      } catch (error) {
        console.error("Error fetching designer:", error);
      }
    };
=======
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import '../styles/BookingPage.css';

function BookingPage() {
  const navigate = useNavigate();
  const { type, designerId } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [timeSlots, setTimeSlots] = useState({ morning: [], afternoon: [] });
  const [designer, setDesigner] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // 디자이너 정보 가져오기
  useEffect(() => {
    // 실제로는 API 호출로 대체될 부분
    const designerData = {
      1: {
        name: "이초 디자이너",
        price: { offline: 40000, online: 20000 },
        account: "신한은행 110-123-456789",
        accountHolder: "이초"
      },
      2: {
        name: "로로 원장",
        price: { offline: 40000, online: 34000 },
        account: "국민은행 123-12-123456",
        accountHolder: "로로"
      },
      // ... 다른 디자이너 정보
    }[designerId];
>>>>>>> e334592 (로그인 기능 추가)

    fetchDesigner();
  }, [designerId]);

  // 시간대 생성 (10:00 ~ 20:00, 30분 단위)
  useEffect(() => {
    const morning = [];
    const afternoon = [];

    for (let hour = 10; hour < 20; hour++) {
      const timeSlot1 = `${hour.toString().padStart(2, "0")}:00`;
      const timeSlot2 = `${hour.toString().padStart(2, "0")}:30`;

      if (hour < 12) {
        morning.push(timeSlot1, timeSlot2);
      } else {
        afternoon.push(timeSlot1, timeSlot2);
      }
    }
    setTimeSlots({ morning, afternoon });
  }, []);

  // 날짜 범위 설정 (오늘부터 3개월)
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  // 카카오페이 결제 준비
  const handleKakaoPayment = async () => {
    try {
      const response = await fetch("/payment/kakao/ready", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservation: {
            designerId,
            designerName: designer.name,
            type,
            date: selectedDateState.toISOString().split("T")[0],
            time: selectedTimeState,
            price: type === "offline" ? designer.price.offline : designer.price.online,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("결제 준비에 실패했습니다.");
      }

      const data = await response.json();
      const { redirectUrl } = data;

      // 카카오페이 결제 페이지로 리다이렉트
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("카카오페이 결제 준비 중 오류 발생:", error);
      alert("결제 준비 중 오류가 발생했습니다.");
    }
  };

  // 카카오페이 결제 승인
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pgToken = urlParams.get("pg_token");

    if (pgToken) {
      const approveKakaoPayment = async () => {
        try {
          const response = await fetch("/payment/kakao/success", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pgToken,
              reservation: {
                designerId,
                designerName: designer.name,
                type,
                date: selectedDateState.toISOString().split("T")[0],
                time: selectedTimeState,
                price: type === "offline" ? designer.price.offline : designer.price.online,
              },
            }),
          });

          if (!response.ok) {
            throw new Error("결제 승인에 실패했습니다.");
          }

          const data = await response.json();
          alert("결제가 완료되었습니다!");
          setShowConfirmModal(true);
        } catch (error) {
          console.error("결제 승인 중 오류 발생:", error);
          alert("결제 승인 중 오류가 발생했습니다.");
        }
      };

      approveKakaoPayment();
    }
  }, []);

  // 카카오페이 결제 실패
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentFailed = urlParams.get("fail");

    if (paymentFailed) {
      const handlePaymentFailure = async () => {
        try {
          const response = await fetch("/payment/kakao/fail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reservation: {
                designerId,
                designerName: designer.name,
                type,
                date: selectedDateState.toISOString().split("T")[0],
                time: selectedTimeState,
                price: type === "offline" ? designer.price.offline : designer.price.online,
              },
            }),
          });

          if (!response.ok) {
            throw new Error("결제 실패 처리 중 오류가 발생했습니다.");
          }

          alert("결제가 실패했습니다. 다시 시도해주세요.");
        } catch (error) {
          console.error("결제 실패 처리 중 오류 발생:", error);
          alert("결제 실패 처리 중 오류가 발생했습니다.");
        }
      };

      handlePaymentFailure();
    }
  }, []);

  // 카카오페이 결제 취소
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentCancelled = urlParams.get("cancel");

    if (paymentCancelled) {
      const handlePaymentCancellation = async () => {
        try {
          const response = await fetch("/payment/kakao/cancel", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reservation: {
                designerId,
                designerName: designer.name,
                type,
                date: selectedDateState.toISOString().split("T")[0],
                time: selectedTimeState,
                price: type === "offline" ? designer.price.offline : designer.price.online,
              },
            }),
          });

          if (!response.ok) {
            throw new Error("결제 취소 처리 중 오류가 발생했습니다.");
          }

          alert("결제가 취소되었습니다.");
        } catch (error) {
          console.error("결제 취소 처리 중 오류 발생:", error);
          alert("결제 취소 처리 중 오류가 발생했습니다.");
        }
      };

      handlePaymentCancellation();
    }
  }, []);

  // Google Meet 링크 생성 함수
  const createGoogleMeetEvent = async (eventDetails) => {
    try {
      const response = await fetch("/api/google-calendar/create-event-with-meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventDetails),
      });

      if (!response.ok) {
        throw new Error("Google Meet 링크 생성에 실패했습니다.");
      }

      const data = await response.json();
      return data.meetLink; // 생성된 Google Meet 링크 반환
    } catch (error) {
      console.error("Google Meet 링크 생성 중 오류 발생:", error);
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    if (!selectedDateState || !selectedTimeState) {
      alert("날짜와 시간을 모두 선택해주세요.");
=======
    if (!selectedDate || !selectedTime) {
      alert('날짜와 시간을 모두 선택해주세요.');
>>>>>>> e334592 (로그인 기능 추가)
      return;
    }
    setShowConfirmation(true);
  };

<<<<<<< HEAD
  const handleConfirm = async () => {
    if (!paymentMethod) {
      alert("결제 방식을 선택해주세요.");
      return;
    }
  
    let token = localStorage.getItem("authToken");
  
    // 로그인 상태 확인
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
  
    // 화상 컨설팅일 경우 Google Meet 링크 생성
    let meetLink = null;
    if (type === "online") {
      const eventDetails = {
        summary: `컨설팅 예약 - ${designer.name}`,
        description: `컨설팅 유형: ${type === "offline" ? "대면 컨설팅" : "화상 컨설팅"}\n디자이너: ${designer.name}`,
        start: {
          dateTime: selectedDateState.toISOString(),
          timeZone: "Asia/Seoul",
        },
        end: {
          dateTime: new Date(selectedDateState.getTime() + 60 * 60 * 1000).toISOString(), // 1시간 후
          timeZone: "Asia/Seoul",
        },
      };
  
      meetLink = await createGoogleMeetEvent(eventDetails);
      if (!meetLink) {
        alert("Google Meet 링크 생성에 실패했습니다.");
        return;
      }
    }
  
    // 예약 정보 생성
    const newReservation = {
      designerId: designerId.toString(), // "string" 형식으로 변환
      meet: type === "online", // 화상 컨설팅인 경우 true, 대면인 경우 false
      date: selectedDateState.toISOString().split("T")[0], // "YYYY-MM-DD" 형식
      start: {
        hour: parseInt(selectedTimeState.split(":")[0]), // 시간 추출 (예: "14:00" -> 14)
        minute: parseInt(selectedTimeState.split(":")[1]), // 분 추출 (예: "14:00" -> 0)
        second: 0,
        nano: 0,
      },
      end: {
        hour: parseInt(selectedTimeState.split(":")[0]) + 1, // 1시간 후
        minute: parseInt(selectedTimeState.split(":")[1]),
        second: 0,
        nano: 0,
      },
      shop: designer.address, // 샵 주소
      price: (type === "offline" ? designer.price.offline : designer.price.online).toString(), // 가격을 문자열로 변환
    };
  
    try {
      let response = await fetch("https://blaybus-glowup.com/reservation/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newReservation),
      });
  
      // 토큰 만료 시 갱신 시도
      if (response.status === 401) {
        const newToken = await refreshToken();
        if (!newToken) {
          alert("로그인이 필요합니다.");
          return;
        }
  
        // 갱신된 토큰으로 다시 요청
        response = await fetch("https://blaybus-glowup.com/reservation/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${newToken}`,
          },
          body: JSON.stringify(newReservation),
        });
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "예약 생성에 실패했습니다.");
      }
  
      const data = await response.json();
      setShowPaymentModal(false);
      setShowConfirmModal(true);
    } catch (error) {
      console.error("예약 생성 중 오류가 발생했습니다:", error.message);
      alert(error.message || "예약 생성 중 오류가 발생했습니다.");
    }
  };

  // 예약 내역 페이지로 이동하는 함수 추가
  const handleGoToReservations = async () => {
    try {
      const response = await fetch("https://blaybus-glowup.com/reservation");
      const data = await response.json();
      // 예약 내역 페이지로 이동하면서 데이터를 전달
      navigate("/reservations", { state: { reservations: data } });
    } catch (error) {
      console.error("예약 내역을 가져오는 데 실패했습니다.", error);
    }
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
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
          <span>컨설팅 유형</span>
          <span>
            {type === "offline" ? "대면 컨설팅" : "화상 컨설팅"}
          </span>
          <span>컨설팅 유형</span>
          <span>{type === 'offline' ? '대면 컨설팅' : '화상 컨설팅'}</span>
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
          <span>
            {(type === "offline"
              ? designer.price.offline
              : designer.price.online
            ).toLocaleString()}
            원
          </span>
        </div>
        {type === "offline" && (
          <div className="info-item">
            <span>컨설팅 위치</span>
            <span>{designer.address}</span>
            <span>컨설팅 위치</span>
            <span>{designer.location}</span>
=======
  const handleConfirm = () => {
    const newReservation = {
      id: Date.now(),
      designerId,
      designerName: designer.name,
      type,
      date: new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000))
        .toISOString()
        .split('T')[0],
      time: selectedTime,
      price: type === 'offline' ? designer.price.offline : designer.price.online,
      status: 'pending',
      location: designer.location,
      account: designer.account,
      accountHolder: designer.accountHolder
    };

    // 기존 예약 내역 가져오기
    const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    
    // 새로운 예약 추가
    localStorage.setItem('reservations', JSON.stringify([...existingReservations, newReservation]));
    
    navigate('/main');
  };

  return (
    <div className="booking-container">
      <form onSubmit={handleSubmit} className="booking-form">
        {designer && (
          <div className="designer-info-summary">
            <h2>디자이너 정보</h2>
            <p className="designer-name">{designer.name}</p>
            <p className="consultation-price">
              상담 비용: {type === 'offline' 
                ? `${designer.price.offline.toLocaleString()}원 (대면)`
                : `${designer.price.online.toLocaleString()}원 (화상)`
              }
            </p>
>>>>>>> e334592 (로그인 기능 추가)
          </div>
        )}

<<<<<<< HEAD
      <button
        className="show-payment-button"
        onClick={handleShowPayment}
      >
        결제하기
      </button>

      {showPaymentModal && (
        <div className="payment-modal">
          <div className="payment-content">
            <h3>결제 방식 선택</h3>
            <div className="payment-methods">
              <button
                className={`payment-button ${
                  paymentMethod === "account" ? "selected" : ""
                }`}
                onClick={() => handlePaymentSelect("account")}
              >
                계좌이체
              </button>
              <button
                className={`payment-button ${
                  paymentMethod === "kakaopay" ? "selected" : ""
                }`}
                onClick={() => handlePaymentSelect("kakaopay")}
              >
                카카오페이
              </button>
            </div>

            {paymentMethod === "account" && (
              <div className="account-info">
                <p>입금 계좌: {COMPANY_ACCOUNT.account}</p>
                <p>예금주: {COMPANY_ACCOUNT.accountHolder}</p>
              </div>
            )}

            <div className="payment-actions">
              <button
                className="cancel-button"
                onClick={() => setShowPaymentModal(false)}
              >
                이전으로
              </button>
              <button
                className="confirm-button"
                onClick={handleConfirm}
              >
                결제하기
              </button>
=======
        <div className="form-group">
          <label>날짜 선택</label>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat="yyyy년 MM월 dd일 (eee)"
            locale={ko}
            placeholderText="날짜를 선택해주세요"
            className="date-picker"
            required
          />
        </div>

        <div className="form-group time-selection">
          <label>시간 선택</label>
          <div className="time-grid-container">
            <div className="time-section">
              <h3>오전</h3>
              <div className="time-grid">
                {timeSlots.morning?.map((time) => (
                  <button
                    type="button"
                    key={time}
                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div className="time-section">
              <h3>오후</h3>
              <div className="time-grid">
                {timeSlots.afternoon?.map((time) => (
                  <button
                    type="button"
                    key={time}
                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
>>>>>>> e334592 (로그인 기능 추가)
            </div>
          </div>
        </div>

<<<<<<< HEAD
      {showConfirmModal && (
        <div className="confirm-modal">
          <div className="confirm-content">
            <div className="confirm-icon">✓</div>
            <h3>
              {paymentMethod === "account"
                ? "입금 확인 후 예약이 확정됩니다"
                : "예약이 완료되었습니다!"}
            </h3>
            <h3>
              {paymentMethod === 'account' ? '입금 확인 후 예약이 확정됩니다' : '예약이 완료되었습니다!'}
            </h3>
            <div className="confirm-details">
              <div className="confirm-detail-item">
                <span>디자이너</span>
                <span>{designer.name}</span>
              </div>
              <div className="confirm-detail-item">
                <span>컨설팅 유형</span>
                <span>
                  {type === "offline" ? "대면 컨설팅" : "화상 컨설팅"}
                </span>
                <span>컨설팅 유형</span>
                <span>{type === 'offline' ? '대면 컨설팅' : '화상 컨설팅'}</span>
              </div>
              {type === "offline" && (
                <div className="confirm-detail-item">
                  <span>컨설팅 위치</span>
                  <span>{designer.address}</span>
                </div>
              )}
              {type === 'offline' && (
                <div className="confirm-detail-item">
                  <span>컨설팅 위치</span>
                  <span>{designer.location}</span>
                </div>
              )}
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
                <span>
                  {(type === "offline"
                    ? designer.price.offline
                    : designer.price.online
                  ).toLocaleString()}
                  원
                </span>
              </div>
              {paymentMethod === "account" ? (
                <>
                  <div className="confirm-detail-item">
                    <span>입금 계좌</span>
                    <span>{COMPANY_ACCOUNT.account}</span>
                  </div>
                  <div className="confirm-detail-item">
                    <span>예금주</span>
                    <span>{COMPANY_ACCOUNT.accountHolder}</span>
                  </div>
                </>
              ) : (
                type === "online" &&
                googleMeetLink && (
                  <div className="confirm-detail-item">
                    <span>화상 미팅 링크</span>
                    <a
                      href={googleMeetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="google-meet-link"
                    >
                      구글 미팅 참여하기
                    </a>
                  </div>
                )
              )}
              {paymentMethod === 'account' ? (
                <>
                  <div className="confirm-detail-item">
                    <span>입금 계좌</span>
                    <span>{COMPANY_ACCOUNT.account}</span>
                  </div>
                  <div className="confirm-detail-item">
                    <span>예금주</span>
                    <span>{COMPANY_ACCOUNT.accountHolder}</span>
                  </div>
                </>
              ) : (
                type === 'online' && googleMeetLink && (
                  <div className="confirm-detail-item">
                    <span>화상 미팅 링크</span>
                    <a 
                      href={googleMeetLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="google-meet-link"
                    >
                      구글 미팅 참여하기
                    </a>
                  </div>
                )
              )}
            </div>
            <div className="confirm-actions">
              <button
                className="go-to-reservations"
                onClick={handleGoToReservations}
              >
                예약 내역 확인하기
              </button>
              {paymentMethod === 'account' ? (
                <>
                  <div className="confirm-detail-item">
                    <span>입금 계좌</span>
                    <span>{COMPANY_ACCOUNT.account}</span>
                  </div>
                  <div className="confirm-detail-item">
                    <span>예금주</span>
                    <span>{COMPANY_ACCOUNT.accountHolder}</span>
                  </div>
                </>
              ) : (
                type === 'online' && googleMeetLink && (
                  <div className="confirm-detail-item">
                    <span>화상 미팅 링크</span>
                    <a 
                      href={googleMeetLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="google-meet-link"
                    >
                      구글 미팅 참여하기
                    </a>
                  </div>
                )
              )}
=======
        <div className="booking-summary">
          <h2>예약 정보</h2>
          {designer && (
            <>
              <p>디자이너: {designer.name}</p>
              <p>상담 유형: {type === 'offline' ? '대면' : '화상'} 상담</p>
              <p className="price-info">
                결제 금액: {type === 'offline' 
                  ? designer.price.offline.toLocaleString()
                  : designer.price.online.toLocaleString()
                }원
              </p>
            </>
          )}
          {selectedDate && (
            <p>
              날짜: {selectedDate.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
              })}
            </p>
          )}
          {selectedTime && <p>시간: {selectedTime}</p>}
        </div>

        {designer && (
          <div className="payment-info">
            <h2>결제 정보</h2>
            <p className="account-info">입금 계좌: {designer.account}</p>
            <p className="account-holder">예금주: {designer.accountHolder}</p>
            <p className="payment-notice">
              * 예약 확정을 위해 상담 비용을 입금해 주세요.<br />
              * 입금자명은 예약자 성함과 동일해야 합니다.<br />
              * 예약 시간 24시간 전까지 취소 가능합니다.
            </p>
          </div>
        )}

        <button type="submit" className="booking-button">
          예약하기
        </button>
      </form>

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-popup">
            <h2>예약 확인</h2>
            <div className="confirmation-content">
              <p><strong>디자이너:</strong> {designer.name}</p>
              <p><strong>상담 유형:</strong> {type === 'offline' ? '대면' : '화상'} 상담</p>
              <p><strong>날짜:</strong> {selectedDate.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
              })}</p>
              <p><strong>시간:</strong> {selectedTime}</p>
              <p><strong>결제 금액:</strong> {type === 'offline' 
                ? designer.price.offline.toLocaleString()
                : designer.price.online.toLocaleString()
              }원</p>
              <div className="payment-info-summary">
                <p><strong>입금 계좌:</strong> {designer.account}</p>
                <p><strong>예금주:</strong> {designer.accountHolder}</p>
              </div>
>>>>>>> e334592 (로그인 기능 추가)
            </div>
            <div className="confirmation-actions">
              <button 
<<<<<<< HEAD
                className="go-to-reservations" 
                onClick={handleGoToReservations}
            <div className="confirm-actions">
              <button 
                className="go-to-reservations" 
                onClick={handleGoToReservations}
=======
                type="button" 
                className="confirm-button"
                onClick={handleConfirm}
>>>>>>> e334592 (로그인 기능 추가)
              >
                확인
              </button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => setShowConfirmation(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingPage;