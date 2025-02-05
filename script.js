// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic project cards (add your projects here)
const projects = [
    {
        title: "Python Project (Basic)",
        description: "Some Basic Python Projects",
        image: "images/python.jpg",
        link: "https://github.com/NiranjanGhising/rock_paper_scissor.py"
    },
    {
        title: "Python Project (intermediate)",
        description: "Some intermediate Python Projects",
        image: "images/python.jpg",
        link: "https://github.com/NiranjanGhising/rock_paper_scissor.py"
    },
];

const projectGrid = document.querySelector('.project-grid');

projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank">View Project</a>
    `;
    projectGrid.appendChild(card);
});