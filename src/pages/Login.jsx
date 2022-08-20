import React, { useState } from "react";
import user from "../assets/fake-data/user";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/user/userSlide";
import { Link, useHistory } from "react-router-dom";
import "../assets/boxicons-2.0.7/css/login.css";
import root from "../assets/fake-data/root";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [query, setQuery] = useState({
    username: "",
    password: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(query);

    const checkAccount = user.find(
      (user) =>
        user.username === query.username && user.password === query.password
    );
    if (checkAccount) {
      dispatch(login(checkAccount));
      history.push("/");
    } else {
      window.alert("Tài khoản hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <div id="body">
      <div className="session">
        <div className="left"></div>
        <form
          className="log-in"
          autocomplete="off"
          onSubmit={(e) => handleLogin(e)}
        >
          <h4>
            Chúng tôi là <span>{root.brandName}</span>
          </h4>
          <p>
            Chào mừng trở lại! Đăng nhập vào tài khoản của bạn để xem các món
            hời hôm nay:
          </p>
          <div className="floating-label">
            <input
              placeholder="Username"
              autocomplete="off"
              required
              onChange={(e) => setQuery({ ...query, username: e.target.value })}
            />
            <label for="email">Email:</label>
            <div className="icon"></div>
          </div>
          <div className="floating-label">
            <input
              placeholder="password"
              required
              onChange={(e) => setQuery({ ...query, password: e.target.value })}
            />
            <label for="password">Password:</label>
            <div className="icon"></div>
          </div>
          <button type="submit" onClick="return false;">
            Đăng nhập
          </button>
          <br />
          <div className="link-log">
            <Link to="/register">Bạn chưa có tài khoản!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
