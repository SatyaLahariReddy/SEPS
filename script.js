// Dark Mode
const darkModeToggle = document.getElementById('darkModeToggle');
if(darkModeToggle){
  if(localStorage.getItem('darkMode')==='true'){
    document.body.classList.add('dark-mode');
    darkModeToggle.checked=true;
  }
  darkModeToggle.addEventListener('change',()=>{
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
}

// Password toggle
function togglePassword(id){
  const input=document.getElementById(id);
  input.type = input.type==='password'?'text':'password';
}

// Signup
function signupUser(){
  const email=document.getElementById("signupEmail").value;
  const password=document.getElementById("signupPassword").value;
  const msg=document.getElementById("signupMessage");
  if(!email||!password){ msg.textContent="All fields required."; return; }
  if(localStorage.getItem(email)){ msg.textContent="User exists. Login."; return; }
  localStorage.setItem(email, JSON.stringify({email,password}));
  msg.style.color="green"; msg.textContent="Account created! Redirecting...";
  setTimeout(()=>window.location.href="login.html",1500);
}

// Login
function loginUser(){
  const email=document.getElementById("loginEmail").value;
  const password=document.getElementById("loginPassword").value;
  const msg=document.getElementById("loginMessage");
  if(!email||!password){ msg.textContent="All fields required."; return; }
  const stored=localStorage.getItem(email);
  if(!stored){ msg.textContent="User not found. Signup first."; return; }
  if(JSON.parse(stored).password!==password){ msg.textContent="Incorrect password."; return; }
  localStorage.setItem("loggedInUser", email);
  msg.style.color="green"; msg.textContent="Login successful!";
  setTimeout(()=>window.location.href="tasks.html",1500);
}

// Forgot password
function forgotPassword(){
  const email=prompt("Enter your registered email:");
  const stored=localStorage.getItem(email);
  if(stored) alert("Your password: "+JSON.parse(stored).password);
  else alert("Email not found.");
}

// Logout
function logoutUser(){ localStorage.removeItem("loggedInUser"); window.location.href="login.html"; }

// Auth protection
function checkAuth(){
  if(!localStorage.getItem("loggedInUser")){
    alert("Please login first!"); window.location.href="login.html";
  }
}

// Add Task
function addTask(e){
  e.preventDefault();
  const user=localStorage.getItem("loggedInUser");
  if(!user){ alert("Login to add tasks!"); window.location.href="login.html"; return; }
  const form=document.querySelector('.task-form');
  const title=form.querySelector('input[type="text"]').value;
  const desc=form.querySelector('textarea').value;
  const date=form.querySelector('input[type="date"]').value;
  const prio=form.querySelector('select').value;
  let tasks=JSON.parse(localStorage.getItem("tasks_"+user))||[];
  tasks.push({title,desc,deadline:date,priority:prio});
  localStorage.setItem("tasks_"+user, JSON.stringify(tasks));
  form.reset(); renderTasks();
}

// Render Tasks
function renderTasks(){
  const container=document.getElementById('taskContainer');
  if(!container) return;
  const user=localStorage.getItem("loggedInUser");
  let tasks=JSON.parse(localStorage.getItem("tasks_"+user))||[];
  const order={High:1,Medium:2,Low:3};
  tasks.sort((a,b)=>order[a.priority]-order[b.priority]);
  container.innerHTML="";
  tasks.forEach((t,i)=>{
    const card=document.createElement('div');
    card.className="task-card "+t.priority.toLowerCase();
    card.innerHTML=`
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
      <span class="badge ${t.priority.toLowerCase()}">${t.priority} Priority</span>
      <p class="deadline">Deadline: ${t.deadline}</p>
      <button onclick="deleteTask(${i})">Delete</button>
    `;
    container.appendChild(card);
  });
}

// Delete Task
function deleteTask(i){
  const user=localStorage.getItem("loggedInUser");
  let tasks=JSON.parse(localStorage.getItem("tasks_"+user))||[];
  tasks.splice(i,1);
  localStorage.setItem("tasks_"+user, JSON.stringify(tasks));
  renderTasks();
}
