import React, { useState, useContext } from 'react';
import './Login.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AppContext } from '../../context/AppProvider';
import { toast } from "react-toastify";
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setToken } = useContext(AppContext); 
  const navigate = useNavigate();

  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      const response = await axios.post('http://localhost:8000/api/users/login', { email, password }, { withCredentials: true });
        console.log(response.data);
      if (response.data.success) {
        const { token, Number } = response.data;

        localStorage.setItem('authToken', token); 
        setToken(token); 

        
       
          navigate('/chooseteam');
        

        toast.success('Login successful');
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error('Login failed, please try again');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div id="loginmain">
      <div id="lleft">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide className="mySwiper1">
            <img src="./Images/Auth/i1.avif" alt="Slide 1" />
          </SwiperSlide>
          <SwiperSlide className="mySwiper1">
            <img src="./Images/Auth/i2.avif" alt="Slide 2" />
          </SwiperSlide>
          <SwiperSlide className="mySwiper1">
            <img src="./Images/Auth/i3.avif" alt="Slide 3" />
          </SwiperSlide>
        </Swiper>
        <div id="lltext">
          Your Favorite IPL Team’s Merchandise,
          <br /> Now All in One Stop!
        </div>
      </div>

      <div id="lright">
        <div id="lotop">
          <h4>Login Your Account.</h4>
          <h1>Welcome Back!</h1>
          <br />
          <h4>Enter your email and password.</h4>
        </div>

        <div id="lomid">
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form">Email Address</label>
              <input
                type="email"
                id="email"
                className="place1"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'} // Toggle input type
                  id="password"
                  className="place1"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icons */}
                </button>
              </div>
            </div>

            <button type="submit" id="login-button" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div id="lobot">
          <Link to="/register" style={{ color: 'whitesmoke' }}>
            Don't Have an Account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
