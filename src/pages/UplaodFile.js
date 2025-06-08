import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as FileService from '../services/fileServices';

function UploadFile() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fileLink, setFileLink] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError('');
    setSuccess('');

    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setSuccess('PDF attached successfully!');
    } else {
      setSelectedFile(null);
      setError('Only PDF files are allowed.');
    }
  };

  const handleSubmit = async(e) => {
    try {
        e.preventDefault();
        if (!selectedFile) {
          setError('Please select a PDF file to upload.');
          return;
        }
    
        // Simulate upload
        console.log('Uploading file:', selectedFile);
        
        const formData = new FormData();
        formData.append('file', selectedFile);
        const response = await FileService.UploadFile(formData);
        setFileLink(`${process.env.REACT_APP_WEB_URL}/view-file/${response?.data?.data?.fileId}`);
        // You can send the file using FormData + fetch/axios here
    } catch (error) {
        
    }
  };

  return (
   <div style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Upload PDF File</h2>

      <form onSubmit={handleSubmit} >
        <div style={{ display: 'flex', flexDirection : 'column'}}>  
          <label htmlFor="pdfUpload">Choose a PDF file:</label><br />
          <input
            type="file"
            id="pdfUpload"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <br /><br />
          <button type="submit">Upload</button>
        </div>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {fileLink && (
        <>
          <h3>File Uploaded Successfully</h3>
          <a href={fileLink} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
        </>
      )}
    </div>

  );
}

export default UploadFile;
