document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    // IntersectionObserver to trigger fade-in on scroll or link click
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the section is visible
    });

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Reset animation when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            
            // Only prevent default for links that start with #
            if (href.startsWith('#')) {
                event.preventDefault();

                // Get the target section by the href of the link
                const targetSection = document.querySelector(href);

                // Scroll to the section (smooth scrolling is handled by CSS)
                window.scrollTo({
                    top: targetSection.offsetTop - 20, // Adjust for any offset
                    behavior: 'smooth'
                });

                // Reset section's opacity and transform (re-trigger animation)
                sections.forEach(section => {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(50px)';
                });

                // Delay before re-observing the section to trigger the animation
                setTimeout(() => {
                    observer.observe(targetSection);
                }, 500); // Adjust delay to match the smooth scroll timing
            }
        });
    });
});

// Dynamic typing effect
document.addEventListener('DOMContentLoaded', () => {
    const textDisplay = document.getElementById('dynamic-text');
    const greetings = [
        'Hello!', 
        '!سلام عليكم',
        '¡Hola!', 
        'Bonjour!', 
        '你好!', 
        'こんにちは!'
    ];

    let currentIndex = 0;
    let isDeleting = false;
    let speed = 100; // Typing speed in milliseconds
    let pauseTime = 1500; // Pause time after finishing a greeting

    function typeText() {
        const fullText = greetings[currentIndex];
        
        // Current length of the text to show
        const currentText = fullText.substring(0, textDisplay.innerHTML.length + (isDeleting ? -1 : 1));
        textDisplay.innerHTML = currentText;

        // Typing finished
        if (!isDeleting && currentText === fullText) {
            // Wait before starting to delete
            setTimeout(() => {
                isDeleting = true; // Start deleting
                typeText(); // Call the function again
            }, pauseTime);
            return; // Exit the current call
        }

        // Deleting finished
        if (isDeleting && currentText === '') {
            isDeleting = false; // Reset deleting flag
            currentIndex = (currentIndex + 1) % greetings.length; // Move to the next greeting
            setTimeout(typeText, speed); // Call typeText again to start typing the next greeting
            return; // Exit the current call
        }

        // Continue typing or deleting
        setTimeout(typeText, isDeleting ? speed / 2 : speed); // Faster deleting
    }

    // Start the typing effect
    typeText();
});

// Function to handle fade-in and fade-out effects
const sections = document.querySelectorAll('section');

const options = {
    root: null, // Use the viewport as the root
    threshold: 0.1 // Trigger when 10% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Fade in when in view
        } else {
            entry.target.classList.remove('visible'); // Fade out when out of view
        }
    });
}, options);

// Observe each section
sections.forEach(section => {
    section.classList.add('fade-in'); // Add the fade-in class
    observer.observe(section);
});

// Scroll navigation with 'j' and 'k' keys
document.addEventListener('keydown', function(event) {
    if (event.key === 'j') {
        // Scroll down by one section height
        const nextSection = getNextSection();
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (event.key === 'k') {
        // Scroll up by one section height
        const prevSection = getPrevSection();
        if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Function to get the next section
function getNextSection() {
    const sections = document.querySelectorAll('section');
    const currentSection = getCurrentSection();
    
    for (let i = 0; i < sections.length; i++) {
        if (sections[i] === currentSection && sections[i + 1]) {
            return sections[i + 1];
        }
    }
    return null;
}

// Function to get the previous section
function getPrevSection() {
    const sections = document.querySelectorAll('section');
    const currentSection = getCurrentSection();
    
    for (let i = 0; i < sections.length; i++) {
        if (sections[i] === currentSection && sections[i - 1]) {
            return sections[i - 1];
        }
    }
    return null;
}

// Function to get the current section based on scroll position
function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    let currentSection = sections[0];

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > 0) {
            currentSection = section;
        }
    });

    return currentSection;
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the default anchor behavior

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth', // Smooth scroll
            block: 'start' // Align to the start of the section
        });
    });
});

function toggleContent(item) {
    const content = item.nextElementSibling; // Select the expandable content
    const arrow = item.querySelector('.arrow'); // Select the arrow
    
    if (content.style.display === "block") {
      content.style.display = "none"; // Hide content
      arrow.style.transform = "rotate(0deg)"; // Reset arrow
    } else {
      content.style.display = "block"; // Show content
      arrow.style.transform = "rotate(90deg)"; // Rotate arrow
    }
  }

