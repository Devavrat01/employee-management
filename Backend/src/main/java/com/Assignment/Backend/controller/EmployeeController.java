package com.Assignment.Backend.controller;

import com.Assignment.Backend.model.Employee;
import com.Assignment.Backend.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<Employee> addEmployee(@ModelAttribute Employee employee,
                                                @RequestParam("idProof") MultipartFile idProof) {
        return ResponseEntity.ok(employeeService.addEmployee(employee, idProof));
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAll(@RequestParam(required = false) String empId,
                                                 @RequestParam(required = false) String firstName,
                                                 @RequestParam(required = false) String lastName,
                                                 @RequestParam(required = false) String loginId,
                                                 @RequestParam(required = false) LocalDate startDob,
                                                 @RequestParam(required = false) LocalDate endDob,
                                                 @RequestParam(required = false) String department) {
        return ResponseEntity.ok(employeeService.searchEmployees(empId, firstName, lastName, loginId, startDob, endDob, department));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployee(id));
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id,
//                                                   @ModelAttribute Employee employee,
//                                                   @RequestParam(value = "idProof", required = false) MultipartFile idProof) {
//        return ResponseEntity.ok(employeeService.updateEmployee(id, employee, idProof));
//    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Long id,
            @Valid @ModelAttribute Employee employee,
            @RequestParam(value = "idProof", required = false) MultipartFile idProof) {

        return ResponseEntity.ok(employeeService.updateEmployee(id, employee, idProof));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/history/{id}")
    public ResponseEntity<List<String>> getHistory(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getHistory(id));
    }
}
