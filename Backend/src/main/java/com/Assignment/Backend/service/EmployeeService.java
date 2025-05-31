package com.Assignment.Backend.service;

import com.Assignment.Backend.model.Employee;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

public interface EmployeeService {
    Employee addEmployee(Employee employee, MultipartFile idProof);
    List<Employee> searchEmployees(String empId, String firstName, String lastName, String loginId, LocalDate startDob, LocalDate endDob, String department);
    Employee getEmployee(Long id);
    Employee updateEmployee(Long id, Employee employee, MultipartFile idProof);
    void deleteEmployee(Long id);
    List<String> getHistory(Long id);
}