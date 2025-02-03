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

// Form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
    this.reset();
});

document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.querySelector('input[name="name"]').value,
      email: document.querySelector('input[name="email"]').value,
      message: document.querySelector('textarea[name="message"]').value
    };
  
    try {
      const response = await fetch('http://localhost:5000/send_email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      if (result.success) {
        alert('Message sent!');
        document.getElementById('contact-form').reset();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      alert('Failed to send message.');
    }
  });