document.addEventListener("DOMContentLoaded", function () {
    function showPlans() {
        // Fetch plans data
        fetch("https://zymzoo.onrender.com/membership-plans/")
            .then(response => response.json())
            .then(data => {
                const plansTableBody = document.getElementById('plans-list-body');
                plansTableBody.innerHTML = "";  // Clear previous entries

                data.forEach(plan => {
                    const row = `
                        <tr>
                            <td>${plan.id}</td>
                            <td>${plan.name}</td>
                            <td>${plan.duration_in_days} days</td>
                            <td>${plan.fee}</td>
                        </tr>`;
                    plansTableBody.insertAdjacentHTML('beforeend', row);
                });

                // Hide other sections and show the plans list
                document.querySelector('.content').style.display = 'none';
                document.querySelector('.user-list').style.display = 'none'; 
                document.querySelector('.classes-list').style.display = 'none';
                document.querySelector('.plans-list').style.display = 'block';
            })
            .catch(error => console.error('Error fetching plans:', error));
    }

    // Add this to your event listener or wherever appropriate to open the plans view
    document.querySelector('.plans-sidebar-link').addEventListener('click', showPlans);

    window.showPlans = showPlans;
});
