import React, { useState } from "react";

// import { uploadCSVToData } from "../utils/csvtodata.js";
import { findBranchAndCommunity } from "../utils/util.js";

const UploadEmployee = (props) => {
  const [file, setFile] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const onFileHandler = (event) => {
    const csvFile = event.currentTarget.files[0];
    setFile(csvFile);
  };

  const onSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
    // firestore storage
    // const employeeList = uploadCSVToData(file);
    // console.log(employeeList);
    setDisabled(false);
  };

  return (
    <form className="outer" onSubmit={onSubmit}>
      <div className="inner">
        <h3>직원 테이블 업로드하기</h3>
        <div className="form-group">
          <label htmlFor="formFile" className="form-label">
            직원.CSV 파일을 업로드해주세요.
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={onFileHandler}
          />
        </div>

        <div className="form-group">
          <button
            disabled={disabled}
            type="submit"
            className="btn btn-dark btn-lg w-100"
            onSubmit={onSubmit}
          >
            파일 업로드하기
          </button>
        </div>
      </div>
    </form>
  );
};

export default UploadEmployee;
