import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUpload from './components/FileUpload';
import './styles/App.css';  // Import CSS file
import ProductForm from './components/ProductForm'; // Import ProductForm

function App() {
    return (
        <div className="app-container">
            <h1>MYMotoCo</h1>
            <div className="file-upload-container">
                <FileUpload />
            </div>
            <div className="product-form-container">
                <ProductForm />  {/* Add ProductForm here */}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default App;
