const API_URL = '/api/students';

// Elements
const studentForm = document.getElementById('student-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const courseInput = document.getElementById('course');
const studentIdInput = document.getElementById('student-id');
const tableBody = document.getElementById('student-table-body');
const emptyState = document.getElementById('empty-state');
const cancelBtn = document.getElementById('cancel-btn');
const saveBtn = document.getElementById('save-btn');
const formTitle = document.getElementById('form-title');
const searchInput = document.getElementById('search');

let students = [];

// Initialize
document.addEventListener('DOMContentLoaded', fetchStudents);

// Fetch all students
async function fetchStudents() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch students');
        
        students = await response.json();
        renderTable(students);
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Render Table
function renderTable(data) {
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        emptyState.classList.add('active');
    } else {
        emptyState.classList.remove('active');
        
        data.forEach(student => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${student.name}</strong></td>
                <td><span style="color: var(--text-muted)">${student.email}</span></td>
                <td><span style="background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem">${student.course}</span></td>
                <td class="action-btns">
                    <button class="btn-sm btn-edit" onclick="editStudent(${student.id})">Edit</button>
                    <button class="btn-sm btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }
}

// Form Submission
studentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();

    const studentData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        course: courseInput.value.trim()
    };

    const id = studentIdInput.value;
    const isUpdate = id !== '';

    try {
        const response = await fetch(isUpdate ? `${API_URL}/${id}` : API_URL, {
            method: isUpdate ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            showToast(`Student ${isUpdate ? 'updated' : 'added'} successfully!`, 'success');
            resetForm();
            fetchStudents();
        } else if (response.status === 400) {
            const errors = await response.json();
            handleValidationErrors(errors);
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        showToast(error.message, 'error');
    }
});

function handleValidationErrors(errors) {
    if (errors.name) document.getElementById('name-error').innerText = errors.name;
    if (errors.email) document.getElementById('email-error').innerText = errors.email;
    if (errors.course) document.getElementById('course-error').innerText = errors.course;
}

function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(el => el.innerText = '');
}

// Edit Student
function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    nameInput.value = student.name;
    emailInput.value = student.email;
    courseInput.value = student.course;
    studentIdInput.value = student.id;

    formTitle.innerHTML = 'Edit Student';
    saveBtn.innerText = 'Update Student';
    cancelBtn.style.display = 'block';

    // Scroll to form smoothly if on mobile
    if (window.innerWidth <= 900) {
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    }
    
    clearErrors();
}

// Cancel Edit
cancelBtn.addEventListener('click', resetForm);

function resetForm() {
    studentForm.reset();
    studentIdInput.value = '';
    formTitle.innerHTML = 'Add New Student';
    saveBtn.innerText = 'Save Student';
    cancelBtn.style.display = 'none';
    clearErrors();
}

// Delete Student
async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showToast('Student deleted successfully', 'success');
            
            // If deleting the currently editing student, reset form
            if (studentIdInput.value == id) {
                resetForm();
            }
            
            fetchStudents();
        } else {
            throw new Error('Failed to delete student');
        }
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Search Functionality
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = students.filter(s => 
        s.name.toLowerCase().includes(term) || 
        s.email.toLowerCase().includes(term) || 
        s.course.toLowerCase().includes(term)
    );
    renderTable(filtered);
});

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}
