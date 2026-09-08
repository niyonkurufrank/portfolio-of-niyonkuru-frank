let users = [];

async function getUsers() {
  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/users");
    users = await res.json();
    console.log(users);
    showUsers(users);
  } catch {
    document.getElementById("userTable").innerHTML = "<tr><td colspan='7'>Ikosa ryo kuzana data</td></tr>";
  }
}

function showUsers(data) {
  let table = document.getElementById("userTable");
  table.innerHTML = "";
  let rows = "";
  data.forEach((u, i) => {
    let names = u.name.split(" ");
    rows += `
      <tr>
        <td>${i+1}</td>
        <td>${names[0]}</td>
        <td>${names[1] || ""}</td>
        <td>${u.email}</td>
        <td>${u.username}</td>
        <td>${u.address.city}</td>
        <td class="action">
          <i class="fa fa-pen" onclick="editUser(${u.id})" title="Hindura"></i>
          <i class="fa fa-trash" onclick="deleteUser(${u.id})" title="Siba"></i>
        </td>
      </tr>
    `;
  });
  table.innerHTML = rows;
}

let editId = null; 

function editUser(id) {
  editId = id;
  let user = users.find(u => u.id == id);
  let names = user.name.split(" ");

  document.body.innerHTML += `
  <div id="box">
    <div class="content">
      <h2>Update User</h2>
      <div class="row">
        <input id="fName" value="${names[0]}" placeholder="First Name">
        <input id="lName" value="${names[1]||''}" placeholder="Last Name">
      </div>
      <div class="row">
        <input id="uName" value="${user.username}" placeholder="Username">
        <input id="uCity" value="${user.address.city}" placeholder="City">
      </div>
      <div class="btns">
        <button class="btn-cancel" onclick="closeBox()">Cancel</button>
        <button class="btn-update" onclick="saveUser()">Update</button>
      </div>
    </div>
  </div>`;
  document.getElementById("box").style.display = "block";
}

function saveUser() {
  let user = users.find(u => u.id == editId);
  let f = document.getElementById("fName").value;
  let l = document.getElementById("lName").value;
  user.name = f + " " + l;
  user.username = document.getElementById("uName").value;
  user.address.city = document.getElementById("uCity").value;
  console.log(users);
  showUsers(users);
  closeBox();
}

function closeBox(){
  document.getElementById("box").remove();
}

// 2. DELETE
function deleteUser(id) {
  if(("are you sure you want to delete this user?")){
    users = users.filter(u => u.id!= id);
    console.log(users);
    showUsers(users);
  }
}

// 3. ADD USER
function addUser() {
  let name = prompt("Andika izina rishya:");
  let email = prompt("Andika email:");
  if(name && email) {
    let newUser = {
      id: users.length + 1,
      name: name,
      username: name.toLowerCase().replace(" ", ""),
      email: email,
      address: {city: "Kigali"}
    };
    users.push(newUser);
    console.log(users);
    showUsers(users);
  }
}

document.getElementById("searchInput").onkeyup = (e) => {
  let val = e.target.value.toLowerCase();
  let filtered = users.filter(u => u.name.toLowerCase().includes(val));
  showUsers(filtered);
}
   
document.getElementById('date').innerText = new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

console.log(users);
getUsers();