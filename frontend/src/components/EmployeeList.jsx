import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllEmployees, deleteEmployee } from '../employeeService';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const loadEmployees = async () => {
    try {
      const res = await getAllEmployees(); // Make sure this API returns the list
      setEmployees(res.data);
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        loadEmployees(); // Refresh list
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Employee List</h3>
        </div>
        <div className="card-body">
          {employees.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Login ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.employeeId}</td>
                    <td>{emp.firstName} {emp.middleName} {emp.lastName}</td>
                    <td>{emp.department}</td>
                    <td>{emp.loginId}</td>
                    <td>
                      <Link to={`/view/${emp.id}`} className="btn btn-sm btn-info me-2">View</Link>
                      <Link to={`/edit/${emp.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                      <button onClick={() => handleDelete(emp.id)} className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
