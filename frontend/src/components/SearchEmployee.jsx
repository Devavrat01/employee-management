import React, { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '../employeeService';
import { useNavigate } from 'react-router-dom';

const SearchEmployee = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const res = await getEmployees({ name: searchTerm });
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this employee?')) {
      try {
        await deleteEmployee(id);
        fetchData();
      } catch (err) {
        alert('Error deleting employee');
        console.error(err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
        <button onClick={() => navigate('/add')} className="btn btn-primary">
          Add Employee
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{`${emp.firstName} ${emp.middleName} ${emp.lastName}`}</td>
              <td>{emp.department}</td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    className="btn btn-success btn-sm me-1"
                    onClick={() => navigate(`/view/${emp.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-1"
                    onClick={() => navigate(`/edit/${emp.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchEmployee;
