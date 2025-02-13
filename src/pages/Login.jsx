import GoogleLogin from './GoogleLogin';
import BackgroundCircle from './BackgroundCircle';
import Header from '../components/Header';
import '../styles/Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">haertz</h1>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Email"
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
              placeholder="password"
              required
            />
          </div>

          <div className="login-footer">
          <a href="#" className="forgot-password">Forgot Password?</a>
          <span className="divider"></span>
          </div>

          <button type="submit" className="login-button">
            Log in
          </button>
        </form>


        
      </div>
    </div>
  );
}

export default Login; 