import React, { useState } from "react";
import { uploadCIcon } from "../context/category-icon";
import { addCategory } from "../context/category";

const RegisterCategory = (props) => {
  const [name, setName] = useState("");
  const [imageAsFile, setImageAsFile] = useState(null);
  const [imageAsUrl, setImageAsUrl] = useState("");

  const onNameHandler = (event) => {
    event.preventDefault();
    setName(event.currentTarget.value);
  };

  const onImageAsFileHandler = (event) => {
    event.preventDefault();
    const image = event.currentTarget.files[0];
    setImageAsFile(image);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // firestore storage
    const uploadResult = uploadCIcon(
      imageAsFile,
      setImageAsFile,
      setImageAsUrl
    );
    if (uploadResult) {
      const result = await addCategory({
        name,
        icon: imageAsUrl,
      });
      if (result) {
        alert("카테고리가 추가되었습니다");
      }
    }
  };

  return (
    <div className="outer">
      <div className="inner">
        <form>
          <h3>카테고리 추가하기</h3>

          <div className="form-group">
            <label>카테고리 이름</label>
            <input
              type="text"
              className="form-control"
              placeholder="카테고리 아이디를 입력하세요"
              value={name}
              onChange={onNameHandler}
            />
          </div>

          <div className="form-group">
            <label htmlFor="formFile" className="form-label">
              카테고리 아이콘을 추가하세요
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={onImageAsFileHandler}
            />
          </div>

          <div className="form-group">
            <button
              disabled={!imageAsFile}
              type="submit"
              className="btn btn-primary btn-lg w-100"
              onSubmit={onSubmit}
            >
              카테고리 추가하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterCategory;
