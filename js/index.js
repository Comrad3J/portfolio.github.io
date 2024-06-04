console.log("Starting to fetch project data...");

let projects = [];
let currentFilter = '';
var isDarkMode = false;


function fetchProjects() {
    return fetch('projects.json')
        .then(response => {
            console.log("Received response from projects.json");

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("Received content is not JSON");
            }

            return response.json();
        })
        .then(data => {
            console.log("Data parsed from JSON:", data);
            projects = data.projects;
        })
        .catch(error => console.error('Error fetching the JSON data:', error));
}

function displayProjects(filteredProjects) {
    const main = document.getElementById('project-titles');
    const linksToRemove = Array.from(main.getElementsByTagName('a'));

    linksToRemove.forEach(link => {
        const projectId = parseInt(link.href.split('=')[1]);
        if (!filteredProjects.some(project => project.id === projectId)) {
            link.remove();
        }
    });

    if (filteredProjects.length === 0) {
        const noProjectsMessage = document.createElement('p');
        noProjectsMessage.textContent = 'No projects found for this filter.';
        main.appendChild(noProjectsMessage);
    } else {

        // Hide the navbar and show btn on small screens before displaying projects
        const navbar = document.getElementById('navbar');
        const navBtn = document.getElementById('nav-btn');
        if (window.innerWidth < 600) {
            navbar.style.display = 'none';
            navBtn.style.display = 'flex'; // Show the navbar button on small screens
        }

        filteredProjects.reverse().forEach(project => {
            // Check if the project already exists
            const existingLink = Array.from(main.getElementsByTagName('a')).find(link => {
                const projectId = parseInt(link.href.split('=')[1]);
                return projectId === project.id;
            });

            // If the project doesn't exist, create a new link
            if (!existingLink) {
                console.log("Processing project:", project);
                const link = document.createElement('a');
                link.href = `project.html?id=${project.id}`;
                link.innerHTML = `<h2>${project.name} </h2><p>${project.short_description}</p>`;
                if (project.media && project.media.length > 0) {
                    link.innerHTML = `<img src="${project.media[0]}" alt="${project.name}" style="width: 100%; height: auto;"><h2>${project.name}</h2><p>${project.short_description}</p>`;
                }
                link.style.display = 'block';
                main.appendChild(link);
            }
        });
    }
}


function filterProjects(type) {
    if (type === currentFilter) {
        return; // Do nothing if the same filter is clicked again
    }

    const filteredProjects = projects.filter(project => project.type === type);
    displayProjects(filteredProjects);
    currentFilter = type; // Update the current filter
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProjects().then(() => {
        document.querySelectorAll('nav ul li a').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const type = button.textContent.split('/')[0].trim().toLowerCase();
                console.log(`Filtering projects of type: ${type}`);
                currentFilter = ''; // Reset current filter
                filterProjects(type);
            });
        });
    });

    // Must handle event listener, after loading DOM
    document.getElementById("nav-btn").addEventListener("click", displayNavbar);

    function displayNavbar() {
        const navbar = document.getElementById('navbar'); // Define navbar
        const navBtn = document.getElementById('nav-btn');
        navbar.style.display = 'flex';
        navBtn.style.display = 'none';

        // Clear all the tiles
        const tiles = document.getElementById('project-titles');
        for (let i = 0; i < tiles.children.length; i++) {
            // This if must be here othwise the p5 sketch breaks
            if (tiles.children[i].tagName !== 'CANVAS') {
                tiles.children[i].style.display = 'none';
            }
        }
    };
});

window.addEventListener('resize', function() {
    const navbar = document.getElementById('navbar');
    const main = document.getElementById('project-titles');
    const projectsDisplayed = main.getElementsByTagName('a').length > 0;
    const navBtn = document.getElementById('nav-btn');

    if (projectsDisplayed) {
        if (window.innerWidth > 600) {
            // Velik zaslon in projekti
            navBtn.style.display = 'none';
            navbar.style.display = 'flex';
        } else {
            // Mejhn zaslon in projekti
            navBtn.style.display = 'flex';
            navbar.style.display = 'none';
        }
    } else {
        navBtn.style.display = 'none';
    }
});


document.getElementById('navbar-logo').addEventListener('click', clearTitles);


function clearTitles() {
    const main = document.getElementById('project-titles');
    const linksToRemove = Array.from(main.getElementsByTagName('a'));

    linksToRemove.forEach(link => {
        link.remove();
    });

    console.log('Cleared all the displayed titles');
}
