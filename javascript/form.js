const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

function validateForm(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        nameInput.style.color = "red";
        emailInput.style.color = "red";
        messageInput.style.color = "red";
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        emailInput.style.color = "red";
        return;
    }

    form.submit();

    const user = {
        name: name,
        email: email,
        message: message
    };
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    console.log('User data:', user);

    localStorage.getItem('users', JSON.stringify(users));
    
    result.innerHTML = "Thank you for your message! We will get back to you soon.";
    result.style.color = "green";
}

function getUsers() {
    const allUsers = localStorage.getItem('users');
    if (allUsers) {
        console.log("no users found");
        return;
    }

    const users = JSON.parse(allUsers);
    console.log("Users:", users);

    users.forEach((user, index) => {
        userTable.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.message}</td>
            </tr>
        `;
    });
}

getUsers();

