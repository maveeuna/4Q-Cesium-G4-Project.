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
  "Pics/snow-white_bg2.png",
  "Pics/light_stairsbg.png",
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

// Multi-user form functionality with localStorage
const form = document.getElementById('guest-form');
const player1Input = document.getElementById('player1Name');
const player2Input = document.getElementById('player2Name');
const welcomeMsg = document.getElementById('welcome-msg');

// Load saved names from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedPlayer1 = localStorage.getItem('player1Name');
  const savedPlayer2 = localStorage.getItem('player2Name');

  if (savedPlayer1) player1Input.value = savedPlayer1;
  if (savedPlayer2) player2Input.value = savedPlayer2;

  if (savedPlayer1 && savedPlayer2) {
    welcomeMsg.textContent = `Welcome back, ${savedPlayer1} and ${savedPlayer2}! ✨`;
  } else if (savedPlayer1) {
    welcomeMsg.textContent = `Welcome back, ${savedPlayer1}!`;
  } else if (savedPlayer2) {
    welcomeMsg.textContent = `Welcome back, ${savedPlayer2}!`;
  }
  
})

function handleFormSubmission() {
  const player1 = player1Input.value.trim();
  const player2 = player2Input.value.trim();
  const validNamePattern = /^[a-zA-Z0-9]+$/;

  if (!player1 || !player2) {
    alert('Both usernames are required.');
    return;
  }

  if (!validNamePattern.test(player1) || !validNamePattern.test(player2)) {
    alert('Usernames can only contain letters and numbers.');
    return;
  }

  localStorage.setItem('player1Name', player1);
  localStorage.setItem('player2Name', player2);

  welcomeMsg.textContent = `Welcome, ${player1} and ${player2}! ✨`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  handleFormSubmission();
});
