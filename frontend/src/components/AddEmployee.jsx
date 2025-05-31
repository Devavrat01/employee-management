import React, { useState } from 'react';
import { addEmployee } from '../employeeService';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    department: '',
    salary: '',
    permanentAddress: '',
    currentAddress: '',
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    formData.append('idProof', file);

    try {
      await addEmployee(formData);
      alert('Employee Added Successfully');
      navigate('/list');
    } catch (err) {
      alert('Error adding employee');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input className="form-control" type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input className="form-control" type="text" name="middleName" placeholder="Middle Name" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <input className="form-control" type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input className="form-control" type="date" name="dateOfBirth" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <select className="form-select" name="department" onChange={handleChange} required>
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Support">Support</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <div className="mb-3">
          <input className="form-control" type="number" name="salary" placeholder="Salary" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <textarea className="form-control" name="permanentAddress" placeholder="Permanent Address" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <textarea className="form-control" name="currentAddress" placeholder="Current Address" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input className="form-control" type="file" accept="application/pdf" onChange={handleFile} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddEmployee;
