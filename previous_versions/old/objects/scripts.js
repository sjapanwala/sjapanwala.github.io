document.addEventListener('DOMContentLoaded', () => {
  // Get the current URL
  const currentURL = window.location.pathname;

  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-links li a');

  // Loop through the links and apply the 'active' class to the matching link
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentURL) {
      link.classList.add('active');
    }
  });
});
