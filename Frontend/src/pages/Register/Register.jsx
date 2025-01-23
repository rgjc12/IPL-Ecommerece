import React, { useState } from 'react';
import './Register.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from "react-toastify";
import axios from 'axios';
import { getNum } from '../../store/Reducers/numReducer';
import { setToken } from '../../store/Reducers/tokenReducer';
import { setUserId } from '../../store/Reducers/userIdReducer';
import { useDispatch } from 'react-redux';




function Register() {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backendUrl = useSelector(state => state.backendUrl.backendUrl);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/users/register`,formData);
      console.log(response.data);   

      dispatch(setToken(response.data.token));
      dispatch(getNum(response.data.num));
      dispatch(setUserId(response.data.userId));
      localStorage.setItem('userId',response.data.userId);


      if (response.data.success) {
        toast.success("Registration successful!");       
        navigate('/chooseteam');
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div id="registermain">
      <div id="releft">
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
        <div id="reltext">
          Your Favorite IPL Team’s Merchandise,<br /> Now All in One Stop!
        </div>
      </div>
      <div id="reright">
        <div id="retop">
          <h4>Create Your Account.</h4>
          <h1>Welcome To IPLZone!</h1>
          <br />
          <h4>Enter your name, email, and password.</h4>
        </div>
        <div id="remid">
          <form id="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form">Name</label>
              <input
                className="place1"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form">Email Address</label>
              <input
                className="place1"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group password-field">
              <label htmlFor="password" className="form">Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="place1"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <button type="submit" className="submit-button">Register</button>
          </form>
        </div>
        <div id="rebot">
          <Link to="/login" style={{ color: 'whitesmoke' }}>Already Have Account?</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
