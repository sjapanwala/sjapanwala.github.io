document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                event.preventDefault();

                const targetSection = document.querySelector(href);

                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });

                sections.forEach(section => {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(50px)';
                });

                setTimeout(() => {
                    observer.observe(targetSection);
                }, 500);
            }
        });
    });
});

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
    let speed = 100;
    let pauseTime = 1500;

    function typeText() {
        const fullText = greetings[currentIndex];
        const currentText = fullText.substring(0, textDisplay.innerHTML.length + (isDeleting ? -1 : 1));
        textDisplay.innerHTML = currentText;

        if (!isDeleting && currentText === fullText) {
            setTimeout(() => {
                isDeleting = true;
                typeText();
            }, pauseTime);
            return;
        }

        if (isDeleting && currentText === '') {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % greetings.length;
            setTimeout(typeText, speed);
            return;
        }

        setTimeout(typeText, isDeleting ? speed / 2 : speed);
    }

    typeText();
});

const sections = document.querySelectorAll('section');

const options = {
    root: null,
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, options);

sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'j') {
        const nextSection = getNextSection();
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (event.key === 'k') {
        const prevSection = getPrevSection();
        if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

function toggleContent(item) {
    const content = item.nextElementSibling;
    const arrow = item.querySelector('.arrow');
    
    if (content.style.display === "block") {
      content.style.display = "none";
      arrow.style.transform = "rotate(0deg)";
    } else {
      content.style.display = "block";
      arrow.style.transform = "rotate(90deg)";
    }
}

