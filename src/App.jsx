import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import DesignerList from './pages/DesignerList';
import BookingPage from './pages/BookingPage';
import ReservationList from './pages/ReservationList';
<<<<<<< HEAD
import MyPage from './pages/MyPage';
=======
>>>>>>> e334592 (로그인 기능 추가)
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/consulting/:type" element={<DesignerList />} />
        <Route path="/booking/:type/:designerId" element={<BookingPage />} />
        <Route path="/reservations" element={<ReservationList />} />
<<<<<<< HEAD
        <Route path="/mypage" element={<MyPage/>}/>
=======
>>>>>>> e334592 (로그인 기능 추가)
      </Routes>
    </Router>
  );
}

export default App;
