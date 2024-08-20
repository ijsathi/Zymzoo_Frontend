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
                            <td>
                                <button class="btn btn-warning btn-sm update-plan-btn" data-id="${plan.id}">Update</button>
                                <button class="btn btn-danger btn-sm delete-plan-btn" data-id="${plan.id}">Delete</button>
                            </td>
                        </tr>`;
                    plansTableBody.insertAdjacentHTML('beforeend', row);
                });

                // Add event listeners for update and delete buttons
                document.querySelectorAll('.update-plan-btn').forEach(button => {
                    button.addEventListener('click', handleUpdatePlan);
                });
                document.querySelectorAll('.delete-plan-btn').forEach(button => {
                    button.addEventListener('click', handleDeletePlan);
                });

                // Hide other sections and show the plans list
                document.querySelector('.content').style.display = 'none';
                document.querySelector('.user-list').style.display = 'none'; 
                document.querySelector('.classes-list').style.display = 'none';
                document.querySelector('.plans-list').style.display = 'block';
            })
            .catch(error => console.error('Error fetching plans:', error));
    }

    function handleUpdatePlan(event) {
        const planId = event.target.getAttribute('data-id');
        
        // Fetch the plan data and populate the form
        fetch(`https://zymzoo.onrender.com/membership-plans/${planId}/`)
            .then(response => response.json())
            .then(plan => {
                document.getElementById('updatePlanId').value = plan.id;
                document.getElementById('updatePlanName').value = plan.name;
                document.getElementById('updatePlanDuration').value = plan.duration_in_days;
                document.getElementById('updatePlanFee').value = plan.fee;
                
                // Show the update modal
                $('#updatePlanModal').modal('show');
            })
            .catch(error => console.error('Error fetching plan:', error));
    }

    function handleDeletePlan(event) {
        const planId = event.target.getAttribute('data-id');
        const confirmDelete = confirm("Are you sure you want to delete this plan?");
        if (confirmDelete) {
            fetch(`https://zymzoo.onrender.com/membership-plans/${planId}/`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => {
                if (response.ok) {
                    alert("Plan deleted successfully.");
                    showPlans(); // Refresh the list
                } else {
                    alert("Failed to delete plan.");
                }
            })
            .catch(error => console.error('Error deleting plan:', error));
        }
    }

    // Update plan data when the form is submitted
    document.getElementById('updatePlanForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const planId = document.getElementById('updatePlanId').value;
        const updatedData = {
            name: document.getElementById('updatePlanName').value,
            duration_in_days: document.getElementById('updatePlanDuration').value,
            fee: document.getElementById('updatePlanFee').value,
        };

        fetch(`https://zymzoo.onrender.com/membership-plans/${planId}/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => {
            if (response.ok) {
                alert("Plan updated successfully.");
                $('#updatePlanModal').modal('hide');
                showPlans(); // Refresh the list
            } else {
                alert("Failed to update plan.");
            }
        })
        .catch(error => console.error('Error updating plan:', error));
    });

    // Add event listener for the sidebar link to open the plans view
    document.querySelector('.plans-sidebar-link').addEventListener('click', showPlans);

    window.showPlans = showPlans;
});
