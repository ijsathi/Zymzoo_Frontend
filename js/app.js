document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://zymzoo.onrender.com/fitness-classes/";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
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
                            <a href="class-details.html?id=${fitnessClass.id}"><i class="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                `;
                classesContainer.appendChild(classItem);
            });
        })
        .catch(error => console.error('Error fetching classes:', error));
});
