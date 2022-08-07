import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyARgMB4aW-MywP5Kf1vQpGU5v9Yy750HQY",
  authDomain: "basic-firebase-da1ef.firebaseapp.com",
  projectId: "basic-firebase-da1ef",
  storageBucket: "basic-firebase-da1ef.appspot.com",
  messagingSenderId: "362670116743",
  appId: "1:362670116743:web:723de4041b4be54e444d22",
  measurementId: "G-8GH07EZ9Y3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const table = document.getElementById("table");
const form = document.getElementById("addForm");

async function getEmployees(db) {
  const empCol = collection(db, "employees");
  const empSnapshot = await getDocs(empCol);
  return empSnapshot;
}

function showData(employee) {
  const row = table.insertRow(-1);
  const nameCol = row.insertCell(0);
  const ageCol = row.insertCell(1);
  const deleteCol = row.insertCell(2);
  nameCol.innerHTML = employee.data().name;
  ageCol.innerHTML = employee.data().age;

  // crete delete button
  let btn = document.createElement("button");
  btn.textContent = "ລົບຂໍ້ມູນ";
  btn.setAttribute("class", "btn btn-danger");
  btn.setAttribute("data-id", employee.id);
  deleteCol.appendChild(btn);
  btn.addEventListener("click", (e) => {
    let id = e.target.getAttribute("data-id");
    deleteDoc(doc(db, "employees", id));
  });
}

const data = await getEmployees(db);
data.forEach((employee) => {
  showData(employee);
});

// Get information from form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(collection(db, "employees"), {
    name: form.name.value,
    age: form.age.value,
  });
  from.name.value = "";
  from.age.value = "";
  alert("ບັນທຶກຂໍ້ມູນສຳເລັດ");
});
