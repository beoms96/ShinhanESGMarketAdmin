import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Home from "./pages/home";
import RegisterUser from "./pages/adduser";
import RegisterCategory from "./pages/addcategory";
import UploadEmployee from "./pages/uploademployee";

const App = (props) => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add-user" element={<RegisterUser />} />
        <Route path="/add-category" element={<RegisterCategory />} />
        <Route path="/upload-employee-tbl" element={<UploadEmployee />} />
      </Routes>
    </div>
  );
};
export default App;
