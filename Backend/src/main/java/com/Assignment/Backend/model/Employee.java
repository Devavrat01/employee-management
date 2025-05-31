package com.Assignment.Backend.model;



import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.Period;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Transient
    public String getEmployeeId() {
        return String.format("EMP%05d", id);
    }
    @Column(unique = true)
    private String employeeId; // Format XXXXX1

    @NotBlank
    private String firstName;

    private String middleName;

    @NotBlank
    private String lastName;

    @Column(unique = true)
    private String loginId;

    @NotNull
    @DateTimeFormat(pattern = "dd-MMM-yyyy")
    private LocalDate dateOfBirth;

    @NotBlank
    private String department; // Must be one of predefined values

    @DecimalMin(value = "0.0", inclusive = false)
    private Double salary;

    @NotBlank
    @Lob
    private String permanentAddress;

    @NotBlank
    @Lob
    private String currentAddress;

    @Lob
    private byte[] idProofPdf;

    private String idProofFileName;
    private String idProofFileType;

    public boolean isAgeValid() {
        return Period.between(this.dateOfBirth, LocalDate.now()).getYears() >= 18;
    }
}
