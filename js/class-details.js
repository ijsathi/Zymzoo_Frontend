document.addEventListener("DOMContentLoaded", getClassDetails);

function getClassDetails() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id) {
        fetchClassDetails(id);
        fetchClassInstructor(id);
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
                            <button id="book-now-btn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookNowModal">Book Now</button>
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

        // Add event listener to Book Now button
        const bookNowBtn = div.querySelector('#book-now-btn');
        bookNowBtn.addEventListener('click', () => {
            document.getElementById('className').value = detail.title;
            // Optionally set the user's name if available
            document.getElementById('userName').value = "User's Name"; // Replace with actual user name
        });
    } else {
        console.error('Element with id "class-details" not found');
    }
}

function fetchClassInstructor(id) {
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
        console.error('Element with id "class-instructor" not found');
    }
}

document.getElementById('bookClassForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const userName = document.getElementById('userName').value;
    const className = document.getElementById('className').value;

    // Example of API call for booking (replace with actual API endpoint and data structure)
    fetch('https://zymzoo.onrender.com/book-class/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: userName,
            className: className,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Booking successful:', data);
        // Close the modal and show a success message
        document.querySelector('#bookNowModal .btn-close').click();
        alert('Booking successful!');
    })
    .catch(error => console.error('Error booking class:', error));
});