let allUsers = [];
import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* LOAD USERS */
async function loadUsers() {
  const list = document.getElementById("userList");
  list.innerHTML = "";

  const snapshot = await getDocs(collection(db, "users"));
  allUsers = [];

  snapshot.forEach(docSnap => {
    allUsers.push({
      id: docSnap.id,
      ...docSnap.data()
    });
  });

  renderUsers(allUsers);
}

function renderUsers(users) {
  const list = document.getElementById("userList");
  list.innerHTML = "";

  users.forEach(u => {
    list.innerHTML += `
      <div class="user-row">
        <div>
          <strong>${u.name}</strong><br>
          ${u.email} | ${u.flat}
        </div>

        <select onchange="changeRole('${u.id}', this.value)">
          <option ${u.role === "resident" ? "selected" : ""}>resident</option>
          <option ${u.role === "admin" ? "selected" : ""}>admin</option>
        </select>
      </div>
    `;
  });
}

window.filterUsers = function () {
  const search = document.getElementById("userSearch").value.toLowerCase();
  const role = document.getElementById("roleFilter").value;

  const filtered = allUsers.filter(u => {
    const matchText =
      u.name.toLowerCase().includes(search) ||
      u.email.toLowerCase().includes(search) ||
      u.flat.toLowerCase().includes(search);

    const matchRole = role === "all" || u.role === role;

    return matchText && matchRole;
  });

  renderUsers(filtered);
};


/* ADD USER (Firestore only) */
window.addUser = async function () {
  const name = uName.value.trim();
  const email = uEmail.value.trim();
  const flat = uFlat.value.trim();
  const phone = uPhone.value.trim();
  const role = uRole.value;

  if (!name || !email || !flat) {
    alert("Fill required fields");
    return;
  }

  await addDoc(collection(db, "users"), {
    name, email, flat, phone, role
  });

  loadUsers();
};

/* CHANGE ROLE */
window.changeRole = async function (id, role) {
  await updateDoc(doc(db, "users", id), { role });
};

loadUsers();