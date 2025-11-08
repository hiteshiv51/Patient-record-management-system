// =======================
// SECTION MANAGEMENT
// =======================
const sections = {
  login: document.getElementById("login-section"),
  admin: document.getElementById("admin-dashboard"),
  doctor: document.getElementById("doctor-dashboard"),
  patient: document.getElementById("patient-section"),
};

// =======================
// LOGIN MANAGEMENT
// =======================
const roleSelect = document.getElementById("user-role");
const passwordInput = document.getElementById("password");
const passwordHint = document.getElementById("password-hint");

const rolePasswords = {
  admin: "admin123",
  doctor: "doctor123",
  patient: "patient123",
};

// Show password hint when role is selected
roleSelect.addEventListener("change", () => {
  const role = roleSelect.value;
  if (role) {
    passwordHint.textContent = `Hint: ${rolePasswords[role]}`;
  } else {
    passwordHint.textContent = "";
  }
});

// Handle login button click
document.getElementById("login-btn").addEventListener("click", () => {
  const role = roleSelect.value;
  const password = passwordInput.value.trim();

  if (!role || !password) {
    alert("Please select role and enter password!");
    return;
  }

  if (password !== rolePasswords[role]) {
    alert("Incorrect password!");
    return;
  }

  // Show the appropriate section
  showSection(role);
  localStorage.setItem("user", role);

  // Clear login form
  passwordInput.value = "";
  passwordHint.textContent = "";
});

// Show the selected section and hide others
function showSection(role) {
  Object.values(sections).forEach((sec) => sec.classList.add("hidden"));
  sections[role].classList.remove("hidden");
}

// =======================
// LOGOUT FUNCTIONALITY
// =======================
function logout() {
  localStorage.removeItem("user");
  Object.values(sections).forEach((sec) => sec.classList.add("hidden"));
  sections.login.classList.remove("hidden");
  roleSelect.value = "";
  passwordInput.value = "";
  passwordHint.textContent = "";
}

// =======================
// PATIENT MANAGEMENT
// =======================
const patientForm = document.getElementById("patient-form");
const patientTableBody = document.querySelector("#patient-table tbody");

let patients = JSON.parse(localStorage.getItem("patients")) || [];

// Render patients in table
function renderPatients() {
  patientTableBody.innerHTML = "";
  patients.forEach((p, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.name}</td>
      <td>${p.age}</td>
      <td>${p.gender}</td>
      <td>${p.contact}</td>
      <td>
        <button class="btn-secondary" onclick="editPatient(${i})">Edit</button>
        <button class="btn-danger" onclick="deletePatient(${i})">Delete</button>
      </td>
    `;
    patientTableBody.appendChild(row);
  });
}

// Add new patient
patientForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newPatient = {
    name: document.getElementById("pname").value,
    age: document.getElementById("page").value,
    gender: document.getElementById("pgender").value,
    contact: document.getElementById("pcontact").value,
  };
  patients.push(newPatient);
  localStorage.setItem("patients", JSON.stringify(patients));
  renderPatients();
  patientForm.reset();
});

// Edit patient
function editPatient(index) {
  const p = patients[index];
  document.getElementById("pname").value = p.name;
  document.getElementById("page").value = p.age;
  document.getElementById("pgender").value = p.gender;
  document.getElementById("pcontact").value = p.contact;
  patients.splice(index, 1); // remove old record
  localStorage.setItem("patients", JSON.stringify(patients));
  renderPatients();
}

// Delete patient
function deletePatient(index) {
  if (confirm("Delete this patient record?")) {
    patients.splice(index, 1);
    localStorage.setItem("patients", JSON.stringify(patients));
    renderPatients();
  }
}

// =======================
// INITIALIZE
// =======================
renderPatients();

// Optional: Show last logged-in user on refresh
const lastUser = localStorage.getItem("user");
if (lastUser) {
  showSection(lastUser);
}
