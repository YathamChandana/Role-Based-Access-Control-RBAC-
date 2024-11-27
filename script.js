const users = [];
const roles = {
    admin: { permissions: ['Read', 'Write', 'Delete'] },
    editor: { permissions: ['Read', 'Write'] },
    viewer: { permissions: ['Read'] }
};

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const role = document.getElementById('role').value;

    if (role) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('content-section').style.display = 'block';
        showRoleContent(role);
    } else {
        alert('Please select a role.');
    }
});

function showRoleContent(role) {
    const roles = ['admin', 'editor', 'viewer'];
    roles.forEach(r => {
        document.getElementById(`${r}-content`).style.display = 'none';
    });
    document.getElementById(`${role}-content`).style.display = 'block';

    if (role === 'admin') {
        document.getElementById('manage-users-btn').click();
    }
}

document.getElementById('manage-users-btn').addEventListener('click', function() {
    document.getElementById('user-management').style.display = 'block';
    document.getElementById('role-management').style.display = 'none';
    displayUsers();
});

document.getElementById('manage-roles-btn').addEventListener('click', function() {
    document.getElementById('role-management').style.display = 'block';
    document.getElementById('user-management').style.display = 'none';
    displayRoles();
});

document.getElementById('add-user-btn').addEventListener('click', function() {
    const username = prompt("Enter username:");
    const role = prompt("Enter role (admin/editor/viewer):");
    if (username && roles[role]) {
        users.push({ username, role, status: 'Active' });
        displayUsers();
    } else {
        alert('Invalid input. Please try again.');
    }
});

function displayUsers() {
    const tbody = document.querySelector('#user-table tbody');
    tbody.innerHTML = '';
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td>
                <button onclick="editUser (${index})">Edit</button>
                <button onclick="deleteUser (${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editUser (index) {
    const user = users[index];
    const newRole = prompt("Enter new role (admin/editor/viewer):", user.role);
    if (newRole && roles[newRole]) {
        user.role = newRole;
        displayUsers();
    } else {
        alert('Invalid role.');
    }
}

function deleteUser (index) {
    users.splice(index, 1);
    displayUsers();
}

document.getElementById('add-role-btn').addEventListener('click', function() {
    const roleName = prompt("Enter new role name:");
    if (roleName && !roles[roleName]) {
        const permissions = prompt("Enter permissions (comma-separated):").split(',').map(p => p.trim());
        roles[roleName] = { permissions };
        displayRoles();
    } else {
        alert('Role already exists or invalid input.');
    }
});

function displayRoles() {
    const roleList = document.getElementById('role-list');
    roleList.innerHTML = '';
    for (const [roleName, roleData] of Object.entries(roles)) {
        const roleDiv = document.createElement('div');
        roleDiv.innerHTML = `<strong>${roleName}</strong>: ${roleData.permissions.join(', ')}`;
        roleList.appendChild(roleDiv);
    }
}

document.getElementById('logout-btn').addEventListener('click', function() {
    document.getElementById('login-section').style.display = ' block';
    document.getElementById('content-section').style.display = 'none';
    document.getElementById('login-form').reset();
    users.length = 0; 
}); 