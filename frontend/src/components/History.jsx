import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHistory } from '../employeeService';

const History = () => {
  const { id } = useParams();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getHistory(id);
      setLogs(res.data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="container mt-4">
      <h2>Employee History</h2>
      <ul className="list-group">
        {logs.map((log, index) => (
          <li key={index} className="list-group-item">
            <strong>Date:</strong> {log.date} <br />
            <strong>Change:</strong> {log.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;