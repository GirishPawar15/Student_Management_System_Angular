// Global variables
let students = [];
let currentStudentId = null;
let isEditMode = false;

// API Base URL
const API_BASE_URL = '/api/students';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadStudents();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('studentModal');
        const deleteModal = document.getElementById('deleteModal');
        
        if (event.target === modal) {
            closeModal();
        }
        if (event.target === deleteModal) {
            closeDeleteModal();
        }
    });
}

// Load all students
async function loadStudents() {
    showLoading(true);
    try {
        const response = await fetch(API_BASE_URL);
        if (response.ok) {
            students = await response.json();
            displayStudents(students);
        } else {
            showToast('Error loading students', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error loading students', 'error');
    } finally {
        showLoading(false);
    }
}

// Display students in the table
function displayStudents(studentsToDisplay) {
    const tbody = document.getElementById('studentsTableBody');
    const noDataMessage = document.getElementById('noDataMessage');
    
    if (studentsToDisplay.length === 0) {
        tbody.innerHTML = '';
        noDataMessage.style.display = 'block';
        return;
    }
    
    noDataMessage.style.display = 'none';
    
    tbody.innerHTML = studentsToDisplay.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.firstName} ${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.phone || '-'}</td>
            <td>${student.major || '-'}</td>
            <td>${student.gpa ? student.gpa.toFixed(2) : '-'}</td>
            <td><span class="status-badge status-${student.status.toLowerCase()}">${student.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-secondary btn-small" onclick="editStudent(${student.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteStudent(${student.id}, '${student.firstName} ${student.lastName}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Search students by name
function searchStudents() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredStudents = students.filter(student => 
        student.firstName.toLowerCase().includes(searchTerm) ||
        student.lastName.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
    );
    displayStudents(filteredStudents);
}

// Filter students by status, major, and GPA
function filterStudents() {
    const statusFilter = document.getElementById('statusFilter').value;
    const majorFilter = document.getElementById('majorFilter').value;
    const gpaFilter = document.getElementById('gpaFilter').value;
    
    let filteredStudents = students;
    
    if (statusFilter) {
        filteredStudents = filteredStudents.filter(student => student.status === statusFilter);
    }
    
    if (majorFilter) {
        filteredStudents = filteredStudents.filter(student => student.major === majorFilter);
    }
    
    if (gpaFilter) {
        const minGpa = parseFloat(gpaFilter);
        filteredStudents = filteredStudents.filter(student => student.gpa && student.gpa >= minGpa);
    }
    
    displayStudents(filteredStudents);
}

// Load statistics
async function loadStatistics() {
    try {
        const response = await fetch(`${API_BASE_URL}/statistics`);
        if (response.ok) {
            const stats = await response.json();
            displayStatistics(stats);
        } else {
            showToast('Error loading statistics', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error loading statistics', 'error');
    }
}

// Display statistics
function displayStatistics(stats) {
    const statsContainer = document.getElementById('statsContainer');
    const totalStudents = document.getElementById('totalStudents');
    const activeStudents = document.getElementById('activeStudents');
    const inactiveStudents = document.getElementById('inactiveStudents');
    const graduatedStudents = document.getElementById('graduatedStudents');
    
    totalStudents.textContent = stats.totalStudents;
    activeStudents.textContent = stats.activeStudents;
    inactiveStudents.textContent = stats.inactiveStudents;
    graduatedStudents.textContent = stats.graduatedStudents;
    
    statsContainer.style.display = 'grid';
}

// Open add student modal
function openAddModal() {
    isEditMode = false;
    currentStudentId = null;
    document.getElementById('modalTitle').textContent = 'Add New Student';
    document.getElementById('studentForm').reset();
    document.getElementById('studentModal').style.display = 'block';
}

// Open edit student modal
async function editStudent(studentId) {
    try {
        const response = await fetch(`${API_BASE_URL}/${studentId}`);
        if (response.ok) {
            const student = await response.json();
            populateForm(student);
            isEditMode = true;
            currentStudentId = studentId;
            document.getElementById('modalTitle').textContent = 'Edit Student';
            document.getElementById('studentModal').style.display = 'block';
        } else {
            showToast('Error loading student details', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error loading student details', 'error');
    }
}

// Populate form with student data
function populateForm(student) {
    document.getElementById('firstName').value = student.firstName || '';
    document.getElementById('lastName').value = student.lastName || '';
    document.getElementById('email').value = student.email || '';
    document.getElementById('phone').value = student.phone || '';
    document.getElementById('dateOfBirth').value = student.dateOfBirth || '';
    document.getElementById('enrollmentDate').value = student.enrollmentDate || '';
    document.getElementById('address').value = student.address || '';
    document.getElementById('major').value = student.major || '';
    document.getElementById('gpa').value = student.gpa || '';
    document.getElementById('status').value = student.status || 'ACTIVE';
}

// Save student (create or update)
async function saveStudent(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const studentData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        dateOfBirth: formData.get('dateOfBirth') || null,
        enrollmentDate: formData.get('enrollmentDate') || null,
        address: formData.get('address'),
        major: formData.get('major'),
        gpa: formData.get('gpa') ? parseFloat(formData.get('gpa')) : null,
        status: formData.get('status')
    };
    
    try {
        const url = isEditMode ? `${API_BASE_URL}/${currentStudentId}` : API_BASE_URL;
        const method = isEditMode ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData)
        });
        
        if (response.ok) {
            const savedStudent = await response.json();
            showToast(
                isEditMode ? 'Student updated successfully!' : 'Student added successfully!',
                'success'
            );
            closeModal();
            loadStudents();
        } else if (response.status === 400) {
            showToast('Email already exists or invalid data', 'error');
        } else {
            showToast('Error saving student', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error saving student', 'error');
    }
}

// Delete student
function deleteStudent(studentId, studentName) {
    document.getElementById('deleteStudentName').textContent = studentName;
    document.getElementById('deleteModal').style.display = 'block';
    currentStudentId = studentId;
}

// Confirm delete
async function confirmDelete() {
    try {
        const response = await fetch(`${API_BASE_URL}/${currentStudentId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showToast('Student deleted successfully!', 'success');
            closeDeleteModal();
            loadStudents();
        } else {
            showToast('Error deleting student', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error deleting student', 'error');
    }
}

// Close modal
function closeModal() {
    document.getElementById('studentModal').style.display = 'none';
    document.getElementById('studentForm').reset();
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
    currentStudentId = null;
}

// Show/hide loading spinner
function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    const tableContainer = document.querySelector('.table-container');
    
    if (show) {
        spinner.style.display = 'block';
        tableContainer.style.display = 'none';
    } else {
        spinner.style.display = 'none';
        tableContainer.style.display = 'block';
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Utility function to format date
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

// Utility function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility function to validate phone number
function isValidPhone(phone) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
}

// Export students to CSV
function exportToCSV() {
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Major', 'GPA', 'Status', 'Enrollment Date'];
    const csvContent = [
        headers.join(','),
        ...students.map(student => [
            student.id,
            `"${student.firstName}"`,
            `"${student.lastName}"`,
            `"${student.email}"`,
            `"${student.phone || ''}"`,
            `"${student.major || ''}"`,
            student.gpa || '',
            student.status,
            student.enrollmentDate || ''
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    showToast('Students exported to CSV successfully!', 'success');
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + N to add new student
    if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault();
        openAddModal();
    }
    
    // Escape to close modals
    if (event.key === 'Escape') {
        closeModal();
        closeDeleteModal();
    }
}); 