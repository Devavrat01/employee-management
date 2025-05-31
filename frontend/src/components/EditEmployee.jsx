import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployee, updateEmployee } from '../employeeService';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getEmployee(id);
      setForm(res.data);
    };
    fetchData();
  }, [id]);

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
    if (file) formData.append('idProof', file);

    try {
      await updateEmployee(id, formData);
      alert('Employee updated successfully');
      navigate('/');
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-4">
          <label className="form-label">First Name</label>
          <input className="form-control" type="text" name="firstName" value={form.firstName || ''} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Middle Name</label>
          <input className="form-control" type="text" name="middleName" value={form.middleName || ''} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Last Name</label>
          <input className="form-control" type="text" name="lastName" value={form.lastName || ''} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Date of Birth</label>
          <input className="form-control" type="date" name="dateOfBirth" value={form.dateOfBirth || ''} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Department</label>
          <select className="form-select" name="department" value={form.department || ''} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Engineering">Engineering</option>
            <option value="Support">Support</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Salary</label>
          <input className="form-control" type="number" name="salary" value={form.salary || ''} onChange={handleChange} required />
        </div>
        <div className="col-6">
          <label className="form-label">Permanent Address</label>
          <textarea className="form-control" name="permanentAddress" value={form.permanentAddress || ''} onChange={handleChange} required />
        </div>
        <div className="col-6">
          <label className="form-label">Current Address</label>
          <textarea className="form-control" name="currentAddress" value={form.currentAddress || ''} onChange={handleChange} required />
        </div>
        <div className="col-12">
          <label className="form-label">ID Proof (PDF)</label>
          <input className="form-control" type="file" accept="application/pdf" onChange={handleFile} />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;