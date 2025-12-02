// ==========================
// Dark Mode Toggle
// ==========================
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});

// ==========================
// Login/Signup Simulation
// ==========================
let isLoggedIn = false; // Track login state

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const authSection = document.querySelector('.auth-section');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    isLoggedIn = true;
    alert("Logged in successfully!");
    authSection.style.display = 'none'; // Hide login/signup forms
});

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    isLoggedIn = true;
    alert("Signed up successfully!");
    authSection.style.display = 'none'; // Hide login/signup forms
});

// ==========================
// Task Dashboard - Add Tasks Dynamically
// ==========================
const taskForm = document.querySelector('.task-form');
const taskContainer = document.getElementById('taskContainer');

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Check if user is logged in
    if(!isLoggedIn){
        alert("Please login or signup to add tasks!");
        return;
    }

    // Get form values
    const title = taskForm.querySelector('input[type="text"]').value;
    const description = taskForm.querySelector('textarea').value;
    const deadline = taskForm.querySelector('input[type="date"]').value;
    const priority = taskForm.querySelector('select').value;

    // Create task card
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card', priority.toLowerCase());

    taskCard.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <span class="badge ${priority.toLowerCase()}">${priority} Priority</span>
        <p class="deadline">Deadline: ${deadline}</p>
        <button class="delete-btn">Delete</button>
    `;

    // Delete functionality
    taskCard.querySelector('.delete-btn').addEventListener('click', function() {
        taskCard.remove();
    });

    // Append to container
    taskContainer.appendChild(taskCard);

    // Reset form
    taskForm.reset();
});


