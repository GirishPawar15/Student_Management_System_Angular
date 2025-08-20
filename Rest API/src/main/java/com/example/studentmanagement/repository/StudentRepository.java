package com.example.studentmanagement.repository;

import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.model.StudentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    // Find by email
    Optional<Student> findByEmail(String email);
    
    // Find by status
    List<Student> findByStatus(StudentStatus status);
    
    // Find by major
    List<Student> findByMajor(String major);
    
    // Find by first name or last name containing the given string
    List<Student> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String firstName, String lastName);
    
    // Find students with GPA greater than or equal to given value
    List<Student> findByGpaGreaterThanEqual(Double gpa);
    
    // Custom query to find students by major and status
    @Query("SELECT s FROM Student s WHERE s.major = :major AND s.status = :status")
    List<Student> findByMajorAndStatus(@Param("major") String major, @Param("status") StudentStatus status);
    
    // Custom query to find active students with high GPA
    @Query("SELECT s FROM Student s WHERE s.status = 'ACTIVE' AND s.gpa >= :minGpa ORDER BY s.gpa DESC")
    List<Student> findActiveStudentsWithHighGpa(@Param("minGpa") Double minGpa);
    
    // Check if email exists
    boolean existsByEmail(String email);
    
    // Count students by status
    long countByStatus(StudentStatus status);
} 