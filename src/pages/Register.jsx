import React, { useState } from "react";
import user from "../assets/fake-data/user";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/user/userSlide";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router";
import rootInfo from "../assets/fake-data/root";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [query, setQuery] = useState({
    username: "",
    password: "",
    phone: "",
    address: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(query);

    const checkAccount = user.find(
      (user) =>
        user.username === query.username && user.password === query.password
    );
    if (checkAccount) {
      window.alert("Tài khoản đã tồn tại!");
    } else {
      user.push({
        id: uuidv4(),
        username: query.username,
        password: query.password,
        phone: query.phone,
        address: query.address,
        isAdmin: false,
      });
      window.alert("Đăng ký thành công!");
      history.push("/login");
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
            Chúng tôi là <span>{rootInfo.brandName}</span>
          </h4>
          <p>Xin chào!</p>
          <div className="floating-label">
            <input
              placeholder="Username"
              autocomplete="off"
              required
              onChange={(e) => setQuery({ ...query, username: e.target.value })}
            />
            <label for="email">Tài khoản:</label>
            <div className="icon"></div>
          </div>
          <div className="floating-label">
            <input
              placeholder="password"
              required
              onChange={(e) => setQuery({ ...query, password: e.target.value })}
            />
            <label for="password">Mật khẩu:</label>
            <div className="icon"></div>
          </div>
          <div className="floating-label">
            <input
              placeholder="phone"
              required
              onChange={(e) => setQuery({ ...query, phone: e.target.value })}
            />
            <label for="password">Số điện thoại:</label>
            <div className="icon"></div>
          </div>
          <div className="floating-label">
            <input
              placeholder="address"
              required
              onChange={(e) => setQuery({ ...query, address: e.target.value })}
            />
            <label for="password">Địa chỉ:</label>
            <div className="icon"></div>
          </div>
          <button type="submit" onClick="return false;">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
