document.addEventListener("DOMContentLoaded", function () {
    const instructorsApiUrl = "https://zymzoo.onrender.com/instructors/";
    const membersApiUrl = "https://zymzoo.onrender.com/members/";

    // Function to fetch and display instructors
    fetch(instructorsApiUrl)
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

    // Function to fetch and display members
    fetch(membersApiUrl)
        .then(response => response.json())
        .then(data => {
            const membersContainer = document.getElementById("members-container");

            data.forEach(member => {
                const memberItem = document.createElement('div');
                memberItem.classList.add('col-lg-4', 'col-sm-6');
                memberItem.innerHTML = `
                    <div class="card mt-4">
                        <div class="card-body">
                            <h4 class="card-title">${member.user.first_name} ${member.user.last_name}</h4>
                            <span class="card-subtitle mb-2 text-muted">${member.user.email}</span>
                            <p class="card-text">${member.membership_plan ? member.membership_plan.name : 'No membership plan'}</p>
                            <div class="card-social">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-youtube-play"></i></a>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                                <a href="#"><i class="fa fa-envelope-o"></i></a>
                            </div>
                        </div>
                    </div>
                `;
                membersContainer.appendChild(memberItem);
            });
        })
        .catch(error => console.error('Error fetching members:', error));
});
