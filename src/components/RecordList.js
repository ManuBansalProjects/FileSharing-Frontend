import React, { useEffect, useState } from 'react';
import * as FileService from '../services/fileServices';
import { useNavigate } from 'react-router-dom';

function RecordList() {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  
  const navigate = useNavigate();
  const limit = 10;

  const getFiles = async (page, name) => {
    try {
      const skip = (page - 1) * limit;
      const filter = {
        name 
      }
      const response = await FileService.ListFiles(skip, limit, filter);

      // Expecting response: { data: [...], total: number }
      setRecords(response?.data?.data?.files);
      setTotalRecords(response?.data?.data?.count);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    }
  };

  useEffect(() => {
    getFiles(page, search);
  }, [page, search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // reset to first page when searching
    setSearch(searchInput);
  };

  const totalPages = Math.ceil(totalRecords / limit);

  
  const deleteFile = async(fileId) => {
    try {
        await FileService.DeleteFile(fileId);
        getFiles(page, search);
    } catch (error) {
        
    }
  };

  return (
    <div className="record-list-container" style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Files</h2>

      <form onSubmit={handleSearchSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="record-list">
        {records.map((record) => (
          <div className="record" key={record._id}>
            <span>{record.file_original_name}</span>
            <div className="record-actions">
              <button onClick={()=>{ navigate(`/view-file/${record._id}`) }}>View</button>
              <button onClick={()=>{ deleteFile(record._id) } }>Delete</button>
            </div>
          </div>
        ))}
        {records.length === 0 && <p>No records found.</p>}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RecordList;
