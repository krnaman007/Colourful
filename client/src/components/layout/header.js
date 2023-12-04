import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import logo from "../../image/helmet.png";
import "../../fonts/Lost_Treasure.otf";
import SearchInput from "../forms/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

import { FiAlignJustify } from "react-icons/fi";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <button
            style={{ color: "white" }}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FiAlignJustify />
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarTogglerDemo01"
          >
            {/* <div className="justify-content-center"> */}
            {/* Display logo photo only for screen size larger than 767px */}
            {/* <div className="logo">
              <img
                className="H-logo"
                src={logo}
                alt="logo"
                style={{
                  display: window.innerWidth > 767 ? "block" : "none",
                }}
              />
            </div> */}
            <div>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <span
                  className="logo-font"
                  style={{
                    color: "white",
                    fontSize: "27px",
                    fontFamily: "lost-treasure",
                    cursor: "pointer",
                    marginRight: "30px",
                    marginLeft: "20px",
                  }}
                >
                  Rohini Helmets
                </span>
              </NavLink>
            </div>
            {/* </div> */}
            {/* <img className="H-logo" src={logo} alt="logo" /> */}
            <div className="header">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className="nav-link" /* i have removed active from here . it is suppose to be (nav-link active) */
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link-2 dropdown-toggle"
                    to={"/categories"}
                    data-bs-toggle="dropdown"
                  >
                    Categories
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to={"/categories"}>
                        All Categories
                      </Link>
                    </li>
                    {categories?.map((c) => (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {!auth?.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link-2 dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user" // this condistion is to check either admin dashboard open or user dashboard ...
                            }`}
                            className="dropdown-item"
                          >
                            DashBoard
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="dropdown-item"
                          >
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </>
                )}

                <li className="nav-item">
                  <Badge count={cart?.length} showZero>
                    <NavLink to="/cart" className="nav-link cart-count">
                      Cart 
                    </NavLink>
                  </Badge>
                </li>
                <SearchInput />
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
