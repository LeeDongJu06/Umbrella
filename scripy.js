const PASSWORD = 'your_password';

document.addEventListener('DOMContentLoaded', () => {
    displayUsers();
});

function checkPassword() {
    const password = document.getElementById('password').value;
    const authResult = document.getElementById('auth-result');
    
    if (password === PASSWORD) {
        document.getElementById('auth').classList.add('hidden');
        document.getElementById('user-management').classList.remove('hidden');
        authResult.classList.add('hidden');
    } else {
        authResult.textContent = 'Invalid password';
        authResult.classList.remove('hidden');
    }
}

function addUser() {
    const studentId = document.getElementById('studentId').value;
    const name = document.getElementById('name').value;
    const userResult = document.getElementById('user-result');
    
    if (!studentId || !name) {
        userResult.textContent = 'Missing studentId or name';
        return;
    }

    const users = getUsers();
    users.push({ studentId, name });
    localStorage.setItem('users', JSON.stringify(users));
    
    userResult.textContent = 'User added successfully';
    displayUsers();
}

function getUsers() {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
}

function displayUsers() {
    const userList = document.getElementById('user-list');
    const users = getUsers();
    
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `ID: ${user.studentId}, Name: ${user.name}`;
        userList.appendChild(li);
    });
}
