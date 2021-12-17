import React, { useState } from "react";

import { addOneUser } from "../context/user";
import { fillZero, findBranchAndCommunity } from "../utils/util";

const RegisterUser = (props) => {
  const [employeeNo, setEmployeeNo] = useState("");
  const [name, setName] = useState("");
  const [branchNo, setBranchNo] = useState("");
  const [disabled, setDisabled] = useState(false);

  const onEmployeeNoHandler = (event) => {
    setEmployeeNo(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onBranchNoHandler = (event) => {
    setBranchNo(event.currentTarget.value);
  };

  const onSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();

    if (!employeeNo) {
      alert("행번을 입력해주세요");
      setDisabled(false);
      return;
    }

    if (!name) {
      alert("이름을 입력해주세요");
      setDisabled(false);
      return;
    }

    if (!branchNo || isNaN(branchNo)) {
      alert("점번호를 숫자로 입력해주세요");
      setDisabled(false);
      return;
    }

    const branchCommunity = await findBranchAndCommunity(branchNo);
    const fillEmployeeNo = fillZero(8, employeeNo);
    const reqJSON = { ...branchCommunity, fillEmployeeNo, name };

    const result = await addOneUser(reqJSON);

    if (result === "Exist") {
      alert("이미 존재하는 행번입니다.");
    } else if (result === "Success") {
      alert("직원 정보가 생성되었습니다.");
    } else {
      alert("직원 정보 생성에 실패했습니다.");
    }
    setDisabled(false);
  };

  return (
    <form className="outer" onSubmit={onSubmit}>
      <div className="inner">
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
            disabled={disabled}
          >
            사용자 추가
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterUser;
