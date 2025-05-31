import axios from 'axios';

const BASE_URL = 'http://localhost:8080/employees';



export const getAllEmployees = () => axios.get(BASE_URL);

export const addEmployee = (formData) => axios.post(BASE_URL, formData);
export const getEmployees = (params) => axios.get(BASE_URL, { params });
export const getEmployee = (id) => axios.get(`${BASE_URL}/${id}`);
export const updateEmployee = (id, formData) => axios.put(`${BASE_URL}/${id}`, formData);
export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/${id}`);
export const getHistory = (id) => axios.get(`${BASE_URL}/history/${id}`);