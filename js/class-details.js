document.addEventListener("DOMContentLoaded", getClassDetails);

function getClassDetails() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id) {
        fetchClassDetails(id);
        fetchClassInstractor(id);
    } else {
        console.error('id parameter is missing in the URL');
    }
}

function fetchClassDetails(id) {
    fetch(`https://zymzoo.onrender.com/fitness-classes/?id=${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Inspect the data structure
            if (data.length > 0) {
                displayClassDetails(data[0]); // Assuming the API returns an array
            } else {
                console.error('No class details found for the given id');
            }
        })
        .catch(error => console.error('Error fetching class details:', error));
}

function displayClassDetails(detail) {
    const parent = document.getElementById('class-details');
    if (parent) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="row w-100">
            <div class="col-lg-6">
                <div class="class-details-text"> 
                    <div class="cd-text">
                        <div class="cd-single-item">
                            <h3>${detail.title}</h3>
                            <p>${detail.description || 'No description available'}<p>
                            <p>Trainer: ${detail.instructor.name}</p>
                            <p>Schedule: ${new Date(detail.schedule).toLocaleString()} </p>
                            <p>Duration: ${detail.duration_minutes_in_days} minutes</p>
                            <p>Intensity:<span class="font-weight-bold"> ${detail.intensity}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="class-details-text">
                    <div class="cd-pic">
                        <img src="${detail.image}" alt="">
                    </div>
                </div>
            </div>
        </div>
        `;
        parent.appendChild(div);
    } else {
        console.error('Element with id "class-details" not found');
    }
}


// for displayInstructor

function fetchClassInstractor(id) {
    fetch(`https://zymzoo.onrender.com/fitness-classes/?id=${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.length > 0) {
                displayInstructor(data[0]);
            } else {
                console.error('No class details found for the given id');
            }
        })
        .catch(error => console.error('Error fetching class details:', error));
}

function displayInstructor(detail) {
    const parent = document.getElementById('class-instructor');
    if (parent) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <div class="cd-trainer-pic">
                    <img src=${detail.instructor.image} alt="">
                </div>
            </div>
            <div class="col-md-6">
                <div class="cd-trainer-text">
                    <div class="trainer-title">
                        <h4>${detail.instructor.name}</h4>
                        <span>${detail.instructor.category}</span>
                    </div>
                    <div class="trainer-social">
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-youtube-play"></i></a>
                        <a href="#"><i class="fa fa-instagram"></i></a>
                        <a href="#"><i class="fa  fa-envelope-o"></i></a>
                    </div>
                    <p>${detail.instructor.description}</p>
                    <ul class="trainer-info">
                        <li><span>Age</span>${detail.instructor.age}</li>
                        <li><span>Weight</span>${detail.instructor.weight_kg} KG</li>
                        <li><span>Height</span>${detail.instructor.height_ft} Ft</li>
                        <li><span>Occupation</span>${detail.instructor.occupation}</li>
                    </ul>
                </div>
            </div>
        </div>
        `;
        parent.appendChild(div);
    } else {
        console.error('Element with id "class-details" not found');
    }
}
