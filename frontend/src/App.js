import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUpload from "./components/FileUpload";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import DeleteProducts from "./components/DeleteProducts";
import "./styles/App.css";
const App = () => {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className="app-container">
      <h1 className="title">MyMotoCo</h1>

      <div className="content-container">
        <div className="file-upload-container">
          <FileUpload />
        </div>

        <div className="form-container">
          <ProductForm />

          <button
            className="show-all-button"
            onClick={() => setShowProducts(!showProducts)}
          >
            {showProducts ? "Hide Products" : "SHOW ALL"}
          </button>
        </div>
      </div>

      {showProducts && (
        <div className="product-list-container">
          <ProductList />
        </div>
      )}
      <DeleteProducts />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
