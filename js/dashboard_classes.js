document.addEventListener("DOMContentLoaded", function () {
    function showClasses() {
        // Fetch classes data
        fetch("https://zymzoo.onrender.com/fitness-classes/")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                const classesTableBody = document.getElementById('classes-list-body');
                classesTableBody.innerHTML = "";  // Clear previous entries
    
                data.forEach(classItem => {
                    const row = `
                        <tr>
                            <td>${classItem.id}</td>
                            <td>${classItem.title}</td>
                            <td>${classItem.instructor.name} (${classItem.instructor.category})</td>
                            <td>${new Date(classItem.schedule).toLocaleString()}</td>
                            <td>${classItem.duration_minutes_in_days} minutes</td>
                            <td>${classItem.intensity}</td>
                            <td><a href="class-details.html?id=${classItem.id}">More<i class="fa fa-angle-right"></i></a></td>
                        </tr>`;
                    classesTableBody.insertAdjacentHTML('beforeend', row);
                });
    
                // Hide other sections and show the classes list
                document.querySelector('.content').style.display = 'none';
                document.querySelector('.user-list').style.display = 'none';
                document.querySelector('.plans-list').style.display = 'none'; 
                document.querySelector('.classes-list').style.display = 'block';
            })
            .catch(error => console.error('Error fetching classes:', error));
    }
    
    // Add event listener for the sidebar link to open the classes view
    document.querySelector('.classes-sidebar-link').addEventListener('click', showClasses);    
    
    window.showClasses = showClasses;
});
