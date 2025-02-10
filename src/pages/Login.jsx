import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 성공으로 간주하고 메인 페이지로 이동
    console.log('로그인 성공');
    // TODO: 나중에 메인 페이지 경로(/main 등)로 수정
    navigate('/main');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Glow Up!</h1>
        <p className="login-subtitle">헤어 컨설팅 어플</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>


        <div className="login-footer">
          <a href="#" className="forgot-password">Forgot Password?</a>
          <span className="divider">|</span>
          <a href="/signup" className="signup-link">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default Login; 