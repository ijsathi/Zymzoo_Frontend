document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://zymzoo.onrender.com/fitness-classes/";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const classesContainer = document.getElementById("classes-container");

            data.forEach(fitnessClass => {
                const classItem = document.createElement('div');
                classItem.classList.add('col-lg-4', 'col-md-6');
                classItem.innerHTML = `
                    <div class="class-item">
                        <div class="ci-pic">
                            <img src="${fitnessClass.image}" alt="">
                        </div>
                        <div class="ci-text">
                            <span>${fitnessClass.intensity}</span>
                            <h5>${fitnessClass.title}</h5>
                            <p>Instructor: ${fitnessClass.instructor.name}</p>
                            <p>Category: ${fitnessClass.instructor.category}</p>
                            <p>Schedule: ${new Date(fitnessClass.schedule).toLocaleString()}</p>
                            <a href="#" class="details-link" data-id="${fitnessClass.id}"><i class="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                `;
                classesContainer.appendChild(classItem);
            });

            // Add event listeners to all detail links
            const detailLinks = document.querySelectorAll('.details-link');
            detailLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();

                    // Check if the user is logged in
                    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                    
                    if (isLoggedIn) {
                        const classId = this.getAttribute('data-id');
                        window.location.href = `class-details.html?id=${classId}`;
                    } else {
                        alert("You must be logged in to view class details.");
                        window.location.href = "login.html";
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching classes:', error));
});
