document.addEventListener("DOMContentLoaded", function () {
    function showUsers() {
        // Fetch user data
        fetch("https://zymzoo.onrender.com/members/")
            .then(response => response.json())
            .then(data => {
                const userTableBody = document.getElementById('user-list-body');
                userTableBody.innerHTML = "";  // Clear previous entries
                data.forEach(user => {
                    const userRole = user.user.is_staff_member ? "Admin" : "Member";
                    const membershipDetails = user.membership_plan
                        ? `${user.membership_plan.name} (${user.membership_plan.duration_in_days} days)`
                        : "No membership";
                    const row = `
                        <tr>
                            <td>${user.user.id}</td>
                            <td>${user.user.username}</td>
                            <td>${user.user.first_name} ${user.user.last_name}</td>
                            <td>${user.user.email}</td>
                            <td>${userRole}</td>
                            <td>${membershipDetails}</td>
                            <td class="d-flex">
                                <button class="btn btn-warning btn-sm update-btn m-1" data-id="${user.user.id}">Update</button>
                                <button class="btn btn-danger btn-sm m-1 delete-btn" data-id="${user.user.id}">Delete</button>
                            </td>
                        </tr>`;
                    userTableBody.insertAdjacentHTML('beforeend', row);
                });

                // Add event listeners for update and delete buttons
                document.querySelectorAll('.update-btn').forEach(button => {
                    button.addEventListener('click', handleUpdate);
                });
                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', handleDelete);
                });

                // Hide other sections and show the user list
                document.querySelector('.content').style.display = 'none';
                document.querySelector('.classes-list').style.display = 'none';
                document.querySelector('.user-list').style.display = 'block';
                document.querySelector('.plans-list').style.display = 'none';
            })
            .catch(error => console.error('Error fetching users:', error));
    }

    function handleUpdate(event) {
        const userId = event.target.getAttribute('data-id');
        console.log("Updating user with ID:", userId);  // Debugging
    
        fetch(`https://zymzoo.onrender.com/members/${userId}/`)
            .then(response => response.json())
            .then(user => {
                console.log("Fetched user data:", user);  // Debugging
                document.getElementById('updateUserId').value = user.user.id;
                document.getElementById('updateUsername').value = user.user.username;
                document.getElementById('updateFirstName').value = user.user.first_name;
                document.getElementById('updateLastName').value = user.user.last_name;
                document.getElementById('updateEmail').value = user.user.email;
                document.getElementById('updateRole').value = user.user.is_staff_member ? 'Admin' : 'Member';
                
                $('#updateUserModal').modal('show');
            })
            .catch(error => {
                console.error('Error fetching user:', error);  // Debugging
            });
    }
    
    function handleDelete(event) {
        const userId = event.target.getAttribute('data-id');
        const confirmDelete = confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            console.log("Deleting user with ID:", userId);  // Debugging
            fetch(`https://zymzoo.onrender.com/members/${userId}/`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => {
                console.log("Delete response:", response);  // Debugging
                if (response.ok) {
                    alert("User deleted successfully.");
                    showUsers(); // Refresh the list
                } else {
                    alert("Failed to delete user.");
                }
            })
            .catch(error => console.error('Error deleting user:', error));
        }
    }
    

    // Update user data when the form is submitted
    document.getElementById('updateUserForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const userId = document.getElementById('updateUserId').value;
        const updatedData = {
            username: document.getElementById('updateUsername').value,
            first_name: document.getElementById('updateFirstName').value,
            last_name: document.getElementById('updateLastName').value,
            email: document.getElementById('updateEmail').value,
            is_staff_member: document.getElementById('updateRole').value === 'Admin',
        };

        fetch(`https://zymzoo.onrender.com/members/${userId}/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => {
            if (response.ok) {
                alert("User updated successfully.");
                $('#updateUserModal').modal('hide');
                showUsers(); // Refresh the list
            } else {
                alert("Failed to update user.");
            }
        })
        .catch(error => console.error('Error updating user:', error));
    });

    // Add event listener for the sidebar link to open the users view
    document.querySelector('.users-sidebar-link').addEventListener('click', showUsers);

    window.showUsers = showUsers;

    updateDashboard();
});
