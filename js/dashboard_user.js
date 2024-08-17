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
                        </tr>`;
                    userTableBody.insertAdjacentHTML('beforeend', row);
                });
    
                // Hide other sections and show the user list
                document.querySelector('.content').style.display = 'none';
                document.querySelector('.classes-list').style.display = 'none';
                document.querySelector('.user-list').style.display = 'block';
                document.querySelector('.plans-list').style.display = 'none';
            })
            .catch(error => console.error('Error fetching users:', error));
    }
    
    // Add event listener for the sidebar link to open the users view
    document.querySelector('.users-sidebar-link').addEventListener('click', showUsers);
    
    window.showUsers = showUsers;

    updateDashboard();
});
