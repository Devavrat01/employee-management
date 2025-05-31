package com.Assignment.Backend.service;

import com.Assignment.Backend.model.Employee;
import com.Assignment.Backend.repository.EmployeeRepository;
import com.Assignment.Backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    private List<String> history = new ArrayList<>();

    private String generateEmployeeId() {
        long count = repository.count() ;
        return String.format("EMP%05d", count+1); // EMP00001 format
    }



    private String generateLoginId(String firstName, String lastName) {
        String base = firstName.charAt(0) + lastName;
        String loginId = base.toLowerCase();
        int attempt = 0;
        while (repository.findByLoginId(loginId).isPresent()) {
            loginId = base.toLowerCase() + new Random().nextInt(1000);
            attempt++;
            if (attempt > 1000) throw new RuntimeException("Unable to generate unique loginId");
        }
        return loginId;
    }

    @Override
    public Employee addEmployee(Employee employee, MultipartFile idProof) {
        employee.setEmployeeId(generateEmployeeId());
        employee.setLoginId(generateLoginId(employee.getFirstName(), employee.getLastName()));

        try {
            if (!idProof.getContentType().equals("application/pdf") || idProof.getSize() < 10240 || idProof.getSize() > 1048576) {
                throw new IllegalArgumentException("Invalid PDF");
            }
            employee.setIdProofPdf(idProof.getBytes());
            employee.setIdProofFileName(idProof.getOriginalFilename());
            employee.setIdProofFileType(idProof.getContentType());
        } catch (IOException e) {
            throw new RuntimeException("File error", e);
        }

        Employee saved = repository.save(employee);
        history.add("Added employee: " + saved.getEmployeeId());
        return saved;
    }

    @Override
    public List<Employee> searchEmployees(String empId, String firstName, String lastName, String loginId, LocalDate startDob, LocalDate endDob, String department) {
        return repository.findAll(); // You’ll want to implement custom filters
    }

    @Override
    public Employee getEmployee(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee, MultipartFile idProof) {
        Employee existing = repository.findById(id).orElseThrow();
        existing.setFirstName(employee.getFirstName());
        existing.setLastName(employee.getLastName());
        existing.setMiddleName(employee.getMiddleName());
        existing.setDateOfBirth(employee.getDateOfBirth());
        existing.setDepartment(employee.getDepartment());
        existing.setSalary(employee.getSalary());
        existing.setPermanentAddress(employee.getPermanentAddress());
        existing.setCurrentAddress(employee.getCurrentAddress());

        try {
            if (idProof != null && !idProof.isEmpty()) {
                existing.setIdProofPdf(idProof.getBytes());
                existing.setIdProofFileName(idProof.getOriginalFilename());
                existing.setIdProofFileType(idProof.getContentType());
            }
        } catch (IOException e) {
            throw new RuntimeException("File error", e);
        }

        history.add("Updated employee: " + existing.getEmployeeId());
        return repository.save(existing);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee emp = repository.findById(id).orElseThrow();
        history.add("Deleted employee: " + emp.getEmployeeId());
        repository.deleteById(id);
    }

    @Override
    public List<String> getHistory(Long id) {
        return history;
    }
}
