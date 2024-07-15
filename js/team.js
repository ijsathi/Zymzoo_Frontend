document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://zymzoo.onrender.com/instructors/";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const teamContainer = document.getElementById("team-container");

            data.forEach(instructor => {
                const instructorItem = document.createElement('div');
                instructorItem.classList.add('col-lg-4', 'col-sm-6');
                instructorItem.innerHTML = `
                    <div class="ts-item set-bg" style="background-image: url('${instructor.image}');">
                        <div class="ts_text">
                            <h4>${instructor.name}</h4>
                            <span>${instructor.category}</span>
                            <p>${instructor.description}</p>
                            <div class="tt_social">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-youtube-play"></i></a>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                                <a href="#"><i class="fa fa-envelope-o"></i></a>
                            </div>
                        </div>
                    </div>
                `;
                teamContainer.appendChild(instructorItem);
            });
        })
        .catch(error => console.error('Error fetching instructors:', error));
});
