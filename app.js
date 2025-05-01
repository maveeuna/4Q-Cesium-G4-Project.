// Scroll-based animation for elements with the 'animation' class
const animatedElements = document.querySelectorAll('.animation');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-animation'); // Add animation when visible
      } else {
        entry.target.classList.remove('scroll-animation'); // Remove animation when not visible
      }
    });
  },
  { threshold: 0.5 } // Trigger when 50% of the element is visible
);

// Observe all animated elements
animatedElements.forEach((el) => observer.observe(el));

// Background image switching based on scroll position
const bgImages = [
  "Pics/dark_stairsbg.png",
  "Pics/arendelle-castle_bg.png",
  "Pics/light_stairsbg.png"
];

let currentIndex = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY; // Current scroll position
  const height = window.innerHeight; // Height of the viewport
  const newIndex = Math.floor(scrollY / height); // Determine the index based on scroll position

  if (newIndex !== currentIndex && bgImages[newIndex]) {
    document.body.style.backgroundImage = `url('${bgImages[newIndex]}')`; // Change background image
    currentIndex = newIndex;
  }
});

// Navigation highlight based on the visible section
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".side-navbar a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const sectionId = entry.target.id; // Get the ID of the current section
      navLinks.forEach((link) => {
        const match = link.getAttribute("data-section") === sectionId;
        link.classList.toggle("active", match); // Highlight the corresponding nav link
      });

      if (entry.isIntersecting) {
        entry.target.classList.add("visible"); // Add 'visible' class when the section is in view
      }
    });
  },
  { threshold: 0.5 } // Trigger when 50% of the section is visible
);

// Observe all sections
sections.forEach((section) => sectionObserver.observe(section));

// Guest form functionality with localStorage
const form = document.getElementById('guest-form');
const guestNameInput = document.getElementById('guestName');
const welcomeMsg = document.getElementById('welcome-msg');

// Load saved guest name from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedName = localStorage.getItem('guestName');
  if (savedName) {
    welcomeMsg.textContent = `Welcome back, ${savedName}! ✨`; // Display welcome message
    guestNameInput.value = savedName; // Pre-fill the input field
  }
});

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission
  const name = guestNameInput.value.trim(); // Get the trimmed input value

  // Validate username: only allow letters and numbers
  const validNamePattern = /^[a-zA-Z0-9]+$/; // Regular expression for alphanumeric characters
  if (!validNamePattern.test(name)) {
    alert('Username can only contain letters and numbers.');
    return; // Stop further execution if validation fails
  }

  if (name) {
    localStorage.setItem('guestName', name); // Save the name to localStorage
    welcomeMsg.textContent = `Welcome, ${name}! ✨`; // Update the welcome message
  }
});
