// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    level: '',
    message: '',
    resourceId: '',
    timestampFrom: '',
    timestampTo: '',
    traceId: '',
    spanId: '',
    commit: '',
    'metadata.parentResourceId': '',
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:4000/search', { params: filters });
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [filters]);

  return (
    <div className="container">
      <h1>Log Query Interface</h1>
      <div className="filter-container">
        <div className="filter-item">
          <label>
            Level:
            <input type="text" name="level" value={filters.level} onChange={handleFilterChange} />
          </label>
        </div>
        <div className="filter-item">
          <label>
            Message:
            <input type="text" name="message" value={filters.message} onChange={handleFilterChange} />
          </label>
        </div>
        <div className="filter-item">
          <label>
            Resource ID:
            <input type="text" name="resourceId" value={filters.resourceId} onChange={handleFilterChange} />
          </label>
        </div>
        <div className="filter-item">
          <label>
            Timestamp From:
            <input type="datetime-local" name="timestampFrom" value={filters.timestampFrom} onChange={handleFilterChange} />
          </label>
        </div>
        <div className="filter-item">
          <label>
            Timestamp To:
            <input type="datetime-local" name="timestampTo" value={filters.timestampTo} onChange={handleFilterChange} />
          </label>
        </div>
        <div className="filter-item">
          <label>
            Trace ID:
            <input type="text" name="traceId" value={filters.traceId} onChange={handleFilterChange} />
          </label>
        </div>
        <div className="filter-item">
          <label>
            Span ID:
            <input type="text" name="spanId" value={filters.spanId} onChange={handleFilterChange} />
          </label>
        </div>
        <div className="filter-item">
          <label>
            Commit:
            <input type="text" name="commit" value={filters.commit} onChange={handleFilterChange} />
          </label>
        </div>
        <div className="filter-item">
          <label>
            Parent Resource ID:
            <input
              type="text"
              name="metadata.parentResourceId"
              value={filters['metadata.parentResourceId']}
              onChange={handleFilterChange}
            />
          </label>
        </div>
      </div>
      <button onClick={handleSearch}>Search</button>
      <div className="results-container">
        <h2>Search Results:</h2>
        <ul>
          {logs.map((log) => (
            <li key={log._id}>{JSON.stringify(log)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
