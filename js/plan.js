document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://zymzoo.onrender.com/membership-plans/";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const pricingContainer = document.getElementById("pricing-container");

            data.forEach(plan => {
                const planItem = document.createElement('div');
                planItem.classList.add('col-lg-4', 'col-md-8');
                planItem.innerHTML = `
                    <div class="ps-item">
                        <h3>${plan.name}</h3>
                        <div class="pi-price">
                            <span>${plan.duration_in_days} DAYS</span>
                        </div>
                        <ul>
                            <li>Free riding</li>
                            <li>Unlimited equipments</li>
                            <li>Personal trainer</li>
                            <li>Weight losing classes</li>
                            <li>Month to mouth</li>
                            <li>No time restriction</li>
                        </ul>
                        <a href="#" class="primary-btn pricing-btn">Enroll now</a>
                        <a href="#" class="thumb-icon"><i class="fa fa-picture-o"></i></a>
                    </div>
                `;
                pricingContainer.appendChild(planItem);
            });
        })
        .catch(error => console.error('Error fetching membership plans:', error));
});
