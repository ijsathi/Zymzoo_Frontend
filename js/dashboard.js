document.addEventListener("DOMContentLoaded", function () {

    // Function to fetch data from API and update the dashboard
    function updateDashboard() {
        // Fetch total users
        fetch("https://zymzoo.onrender.com/members/")
            .then(response => response.json())
            .then(data => {
                document.getElementById('total-users').textContent = data.length;
            })
            .catch(error => console.error('Error fetching total users:', error));

        // Fetch all classes
        fetch("https://zymzoo.onrender.com/fitness-classes/")
            .then(response => response.json())
            .then(data => {
                document.getElementById('active-classes').textContent = data.length;
            })
            .catch(error => console.error('Error fetching classes:', error));

        // Fetch all instructors
        fetch("https://zymzoo.onrender.com/instructors/")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                document.getElementById('total-instructors').textContent = data.length;
            })
            .catch(error => console.error('Error fetching instructors:', error));

        // Fetch membership plans
        fetch("https://zymzoo.onrender.com/membership-plans/")
            .then(response => response.json())
            .then(data => {
                document.getElementById('pending-subscriptions').textContent = data.length;
            })
            .catch(error => console.error('Error fetching membership plans:', error));

        // Fetch members
        fetch("https://zymzoo.onrender.com/members/")
            .then(response => response.json())
            .then(data => {
                document.getElementById('club-members').textContent = data.length;
            })
            .catch(error => console.error('Error fetching members:', error));

        // Fetch bookings
        fetch("https://zymzoo.onrender.com/bookings/")
            .then(response => response.json())
            .then(data => {
                document.getElementById('booking-list').textContent = data.length;
            })
            .catch(error => console.error('Error fetching bookings:', error));
    }

    // Update the dashboard data when the page loads
    updateDashboard();
});
