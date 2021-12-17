import React, { useState } from "react";

import { addCategory } from "../context/category";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const RegisterCategory = (props) => {
  const [name, setName] = useState("");
  const [imageAsFile, setImageAsFile] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onImageAsFileHandler = (event) => {
    const image = event.currentTarget.files[0];
    setImageAsFile(image);
  };

  const onSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();

    if (!name) {
      alert("카테고리 이름을 입력해주세요");
      setDisabled(false);
      return;
    }

    if (!imageAsFile) {
      alert("이미지를 업로드해주세요");
      setDisabled(false);
      return;
    }

    // firestore storage & firestore
    const collection = ref(storage, `/category/${imageAsFile.name}`);
    const uploadTask = uploadBytesResumable(collection, imageAsFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(prog);
      },
      (err) => alert(err.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          const result = await addCategory({
            name,
            icon: url,
          });
          if (result === "Success") {
            alert("카테고리가 추가되었습니다");
          } else {
            alert("카테고리 추가과정에 오류가 발생했습니다");
          }
        });
      }
    );

    setImageAsFile(null);
    setDisabled(false);
  };

  return (
    <form className="outer" onSubmit={onSubmit}>
      <div className="inner">
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
            disabled={disabled}
            type="submit"
            className="btn btn-dark btn-lg w-100"
          >
            카테고리 추가하기
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterCategory;
