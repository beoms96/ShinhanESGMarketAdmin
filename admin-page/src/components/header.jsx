import React from "react";
import { Link } from "react-router-dom";
import logo from "../asset/logo.png";

const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={""}>
          <img src={logo} alt="Home" />
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to={"/add-user"}>
                직원 정보 추가
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/add-category"}>
                카테고리 추가
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
