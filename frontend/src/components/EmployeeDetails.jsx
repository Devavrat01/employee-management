import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployee } from '../employeeService';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getEmployee(id);
      setEmp(res.data);
    };
    fetchData();
  }, [id]);

  if (!emp) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Employee Details</h2>
      <ul className="list-group">
        <li className="list-group-item">Name: {emp.firstName} {emp.middleName} {emp.lastName}</li>
        <li className="list-group-item">DOB: {emp.dateOfBirth}</li>
        <li className="list-group-item">Department: {emp.department}</li>
        <li className="list-group-item">Salary: {emp.salary}</li>
        <li className="list-group-item">Login ID: {emp.loginId}</li>
        <li className="list-group-item">Permanent Address: {emp.permanentAddress}</li>
        <li className="list-group-item">Current Address: {emp.currentAddress}</li>
        <li className="list-group-item">
          ID Proof: <a href={`data:application/pdf;base64,${emp.idProofPdf}`} target="_blank" rel="noreferrer">View PDF</a>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeDetails;
