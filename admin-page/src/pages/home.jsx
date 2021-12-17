import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="outer">
      <div className="inner">
        <h3>도레미마켓 Admin</h3>
        <div className="btn-group-vertical mx-auto d-block">
          <Link className="btn btn-outline-primary" to={"/add-user"}>
            직원 정보 추가
          </Link>
          <Link className="btn btn-outline-primary" to={"/add-category"}>
            카테고리 추가
          </Link>
          <Link className="btn btn-outline-primary" to={"/add-banner"}>
            배너 추가
          </Link>
          <Link className="btn btn-outline-primary" to={"/upload-employee-tbl"}>
            직원 테이블 업로드
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
