document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired.");

    // Dynamic project cards (add your projects here)
    const projects = [
        {
            title: "Student Performance Analysis System",
            description: "Developed a command-line application to manage and analyze student academic records, providing insights for educational improvement.",
            image: "images/student_analysis.jpg",
            link: "https://github.com/NiranjanGhising/Student_Data_Analysis",
            details: {
                overview: "Developed a comprehensive command-line application to streamline student academic record management and analysis. This system provides educators and administrators with a powerful tool for data-driven decision-making, automating data analysis and visualization to enhance the accuracy of performance assessments and facilitate targeted educational strategies.",
                data: "The system utilizes simulated student academic data, including student names, subjects (English, Nepali, Math, Science, Social), and marks. It also incorporates a feature for dynamic user input to add new student records.",
                tools: "Python (NumPy for efficient numerical operations, Matplotlib for data visualization).",
                methodology: "The project follows a modular approach, with separate Python scripts for data initialization, user input, data display, insight generation, correlation analysis, and trend analysis. NumPy arrays are used as the primary data structure for efficient numerical computations. Matplotlib is integrated for clear visual representation of trends and correlations, including scatter plots for subject correlation and line plots for performance trends over time.",
                findings: "The system can quickly identify students requiring additional support or those excelling in specific areas. It pinpoints subjects where students collectively perform well or struggle, informing curriculum adjustments. It also reveals correlations between subject performances, suggesting interdependencies in learning, and visualizes long-term academic trends for individual students, enabling proactive intervention or recognition."
            }
        },
        
    ];

    const projectGrid = document.querySelector('.project-grid');
    const projectModal = document.getElementById('projectModal');
    const closeButton = document.querySelector('.close-button');
    const modalProjectTitle = document.getElementById('modalProjectTitle');
    const modalProjectOverview = document.getElementById('modalProjectOverview');
    const modalProjectData = document.getElementById('modalProjectData');
    const modalProjectTools = document.getElementById('modalProjectTools');
    const modalProjectMethodology = document.getElementById('modalProjectMethodology');
    const modalProjectFindings = document.getElementById('modalProjectFindings');
    const modalProjectLink = document.getElementById('modalProjectLink');

    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <h1>${project.title}</h1>
            <p>${project.description}</p>
            <button class="project-button view-details-button" data-project-index="${index}">View Details</button>
        `;
        projectGrid.appendChild(card);
    });

    // Open Modal
    projectGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details-button')) {
            const projectIndex = e.target.dataset.projectIndex;
            const project = projects[projectIndex];

            modalProjectTitle.textContent = project.title;
            modalProjectOverview.textContent = project.details.overview;
            modalProjectData.textContent = project.details.data;
            modalProjectTools.textContent = project.details.tools;
            modalProjectMethodology.textContent = project.details.methodology;
            modalProjectFindings.textContent = project.details.findings;
            modalProjectLink.href = project.link;

            projectModal.style.display = 'block';
        }
    });

    // Close Modal
    closeButton.addEventListener('click', () => {
        projectModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == projectModal) {
            projectModal.style.display = 'none';
        }
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('checkbox');
    console.log("Theme Toggle Element (by ID 'checkbox'):", themeToggle);

    if (!themeToggle) {
        console.error("Error: Dark mode toggle element with ID 'checkbox' not found.");
    } else {
        const currentTheme = localStorage.getItem('theme');

        if (currentTheme) {
            document.body.classList.add(currentTheme);
            if (currentTheme === 'dark-mode') {
                themeToggle.checked = true;
            }
        }

        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light-mode'); // Or remove item if light is default
            }
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById("backToTopBtn");
    console.log("Back To Top Button Element (by ID 'backToTopBtn'):", backToTopBtn);

    if (backToTopBtn) { // Ensure the button exists before adding listeners
        // When the user scrolls down 20px from the top of the document, show the button
        window.onscroll = function() {
            const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            console.log("Scroll Top:", scrollTop); // Keep this for detailed scroll debugging if needed
            if (scrollTop > 20) {
                backToTopBtn.style.display = "block";
                console.log("Back to Top button display: block"); // Keep this for detailed scroll debugging if needed
            } else {
                backToTopBtn.style.display = "none";
                console.log("Back to Top button display: none"); // Keep this for detailed scroll debugging if needed
            }
        };

        // When the user clicks on the button, scroll to the top of the document
        backToTopBtn.addEventListener('click', () => {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        });
    } else {
        console.error("Error: Back to Top button not found in the DOM.");
    }
});
