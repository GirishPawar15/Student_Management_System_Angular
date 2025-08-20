package com.example.studentmanagement.service;

import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.model.StudentStatus;
import com.example.studentmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    // Get student by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }
    
    // Get student by email
    public Optional<Student> getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
    
    // Create new student
    public Student createStudent(Student student) {
        // Set enrollment date if not provided
        if (student.getEnrollmentDate() == null) {
            student.setEnrollmentDate(LocalDate.now());
        }
        
        // Set status to ACTIVE if not provided
        if (student.getStatus() == null) {
            student.setStatus(StudentStatus.ACTIVE);
        }
        
        return studentRepository.save(student);
    }
    
    // Update student
    public Optional<Student> updateStudent(Long id, Student studentDetails) {
        return studentRepository.findById(id)
                .map(student -> {
                    student.setFirstName(studentDetails.getFirstName());
                    student.setLastName(studentDetails.getLastName());
                    student.setEmail(studentDetails.getEmail());
                    student.setPhone(studentDetails.getPhone());
                    student.setDateOfBirth(studentDetails.getDateOfBirth());
                    student.setAddress(studentDetails.getAddress());
                    student.setMajor(studentDetails.getMajor());
                    student.setGpa(studentDetails.getGpa());
                    student.setStatus(studentDetails.getStatus());
                    return studentRepository.save(student);
                });
    }
    
    // Delete student
    public boolean deleteStudent(Long id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Get students by status
    public List<Student> getStudentsByStatus(StudentStatus status) {
        return studentRepository.findByStatus(status);
    }
    
    // Get students by major
    public List<Student> getStudentsByMajor(String major) {
        return studentRepository.findByMajor(major);
    }
    
    // Search students by name
    public List<Student> searchStudentsByName(String name) {
        return studentRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(name, name);
    }
    
    // Get students with high GPA
    public List<Student> getStudentsWithHighGpa(Double minGpa) {
        return studentRepository.findByGpaGreaterThanEqual(minGpa);
    }
    
    // Get active students with high GPA
    public List<Student> getActiveStudentsWithHighGpa(Double minGpa) {
        return studentRepository.findActiveStudentsWithHighGpa(minGpa);
    }
    
    // Check if email exists
    public boolean emailExists(String email) {
        return studentRepository.existsByEmail(email);
    }
    
    // Get student statistics
    public StudentStatistics getStudentStatistics() {
        long totalStudents = studentRepository.count();
        long activeStudents = studentRepository.countByStatus(StudentStatus.ACTIVE);
        long inactiveStudents = studentRepository.countByStatus(StudentStatus.INACTIVE);
        long graduatedStudents = studentRepository.countByStatus(StudentStatus.GRADUATED);
        
        return new StudentStatistics(totalStudents, activeStudents, inactiveStudents, graduatedStudents);
    }
    
    // Inner class for statistics
    public static class StudentStatistics {
        private final long totalStudents;
        private final long activeStudents;
        private final long inactiveStudents;
        private final long graduatedStudents;
        
        public StudentStatistics(long totalStudents, long activeStudents, long inactiveStudents, long graduatedStudents) {
            this.totalStudents = totalStudents;
            this.activeStudents = activeStudents;
            this.inactiveStudents = inactiveStudents;
            this.graduatedStudents = graduatedStudents;
        }
        
        // Getters
        public long getTotalStudents() { return totalStudents; }
        public long getActiveStudents() { return activeStudents; }
        public long getInactiveStudents() { return inactiveStudents; }
        public long getGraduatedStudents() { return graduatedStudents; }
    }
} 