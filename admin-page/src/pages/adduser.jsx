import React, { useState } from "react";

const RegisterUser = (props) => {
  const [employeeNo, setEmployeeNo] = useState("");
  const [name, setName] = useState("");
  const [branchNo, setBranchNo] = useState("");

  const onEmployeeNoHandler = (event) => {
    event.preventDefault();
    setEmployeeNo(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    event.preventDefault();
    setName(event.currentTarget.value);
  };

  const onBranchNoHandler = (event) => {
    event.preventDefault();
    setBranchNo(event.currentTarget.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (isNaN(branchNo)) {
      alert("점번호는 숫자를 입력해주세요");
    }
    alert("Submit");
  };

  return (
    <div className="outer">
      <div className="inner">
        <form>
          <h3>직원 정보 추가</h3>

          <div className="form-group">
            <label>행번</label>
            <input
              type="text"
              className="form-control"
              placeholder="행번을 적어주세요"
              value={employeeNo}
              onChange={onEmployeeNoHandler}
            />
          </div>

          <div className="form-group">
            <label>이름</label>
            <input
              type="text"
              className="form-control"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={onNameHandler}
            />
          </div>

          <div className="form-group">
            <label>점번호</label>
            <input
              type="text"
              className="form-control"
              placeholder="점번호를 입력해주세요"
              value={branchNo}
              onChange={onBranchNoHandler}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-dark w-100"
              onSubmit={onSubmit}
            >
              사용자 추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
