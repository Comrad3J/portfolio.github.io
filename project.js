window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            if (projectId) {
                const project = data.projects.find(project => project.id === projectId);
                if (project) {
                    displayProject(project);
                } else {
                    document.getElementById('project-container').textContent = 'Project not found.';
                }
            } else {
                displayProjects(data.projects);
            }
        })
        .catch(error => console.error('Error fetching projects:', error));
};


function displayProject(project) {
    if (project.id === 'project10') {
        window.location.href = 'https://soundcloud.com/jakob-lavri';
        return;
    }

    const container = document.getElementById('project-container');
    container.innerHTML = '';  // Clear any existing content

    const projectElement = document.createElement('div');
    projectElement.className = 'project';

    const title = document.createElement('h2');
    title.textContent = project.name;
    projectElement.appendChild(title);

    const date = document.createElement('p');
    date.className = 'date';
    date.textContent = project.date;
    projectElement.appendChild(date);

    if (project.description) {
        const description = document.createElement('p');
        description.textContent = project.description;
        projectElement.appendChild(description);
    }

    if (project.exhibition) {
        const exhibition = document.createElement('p');
        exhibition.innerHTML = `<strong>Exhibition:</strong> ${project.exhibition.join(', ')}`;
        projectElement.appendChild(exhibition);
    }

    if (project.coproduction) {
        const coproduction = document.createElement('p');
        coproduction.innerHTML = `<strong>Coproduction:</strong> ${project.coproduction.join(', ')}`;
        projectElement.appendChild(coproduction);
    }

    if (project.links) {
        const list = document.createElement('ul');
        project.links.forEach(linkSrc => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = linkSrc;
            link.textContent = linkSrc;
            listItem.appendChild(link);
            list.appendChild(listItem);
        });
        projectElement.appendChild(list);
    }

    if (project.files) {
        project.files.forEach(fileSrc => {
            const fileLink = document.createElement('a');
            fileLink.href = fileSrc;
            fileLink.textContent = 'Download File';
            projectElement.appendChild(fileLink);
        });
    }

    if (project.media) {
        project.media.forEach(mediaSrc => {
            const extension = mediaSrc.split('.').pop();
    
            if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
                const image = document.createElement('img');
                image.src = mediaSrc;
                console.log(image.src);
                image.alt = project.name;
                image.className = 'responsive-media'; // Changed class to 'responsive-media'
                projectElement.appendChild(image);
            } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
                const video = document.createElement('video');
                video.src = mediaSrc;
                console.log(video.src);
                video.className = 'responsive-media'; // Changed class to 'responsive-media'
                video.controls = true; // Add this line
                projectElement.appendChild(video);
            }
        });
    }

    container.appendChild(projectElement);
}

