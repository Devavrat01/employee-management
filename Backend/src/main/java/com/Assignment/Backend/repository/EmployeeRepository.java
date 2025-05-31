package com.Assignment.Backend.repository;

import com.Assignment.Backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByLoginId(String loginId);
    Optional<Employee> findByEmployeeId(String employeeId);
}