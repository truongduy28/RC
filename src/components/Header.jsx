/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/images/Logo-2.png";
import { useSelector } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlide";
import { deleteCart } from "../redux/shopping-cart/cartItemsSlide";
import { useHistory } from "react-router-dom";
import rootInfo from "./../assets/fake-data/root";

const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
  },
  {
    display: "Phụ kiện",
    path: "/accessories",
  },
  {
    display: "Liên hệ",
    path: "/contact",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  const userCurrent = useSelector((state) => state.user);

  const headerRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList?.add("shrink");
      } else {
        headerRef.current?.classList?.remove("shrink");
      }
    });
    return () => {
      // window.removeEventListener("scroll");
    };
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  const handleLogOut = () => {
    dispatch(deleteCart());
    dispatch(logout());
    history.push("/login");
  };
  return (
    <div className=" header " ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={rootInfo.logo} alt="" />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
            {userCurrent.value?.isAdmin && (
              <div className="header__menu__item header__menu__left__item ">
                <Link to="/dashboard">
                  <span> Quản trị</span>
                </Link>
              </div>
            )}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <i className="bx bx-search"></i>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/order">
                <i class="bx bx-detail"></i>
              </Link>
            </div>

            <div className="header__menu__item header__menu__right__item">
              <Link to="/cart">
                <i className="bx bx-shopping-bag"></i>
              </Link>
            </div>
            {userCurrent.value ? (
              <>
                <div className="header__menu__item header__menu__right__item">
                  <Link to="/login">
                    <img
                      style={{ width: "25px" }}
                      src="http://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png"
                    />
                  </Link>
                </div>

                <div
                  className="header__menu__item header__menu__right__item"
                  onClick={() => handleLogOut()}
                >
                  <AiOutlineLogout size={"25px"} />
                </div>
              </>
            ) : (
              <div className="header__menu__item header__menu__right__item">
                <Link to="/login">
                  <i className="bx bx-user"></i>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
