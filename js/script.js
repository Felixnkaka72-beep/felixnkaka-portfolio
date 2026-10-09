/* =========================================================
   ICT251 Activity 3 - js/script.js
   Features:
   1. Contact form validation and preview (compulsory)
   2. Gallery viewer (Previous / Next)
   3. Theme switch (light / dark)
   4. Mobile navigation (open / close menu)
   ========================================================= */

"use strict";

/* ---------------------------------------------------------
   FEATURE 1: Contact form validation and preview
   --------------------------------------------------------- */
var form = document.getElementById("contact-form");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var messageInput = document.getElementById("message");
var previewBox = document.getElementById("form-preview");

/* Show or clear an error message under one field. */
function setError(input, errorId, text) {
  var errorSpan = document.getElementById(errorId);
  errorSpan.textContent = text;
  if (text) {
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
  } else {
    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
  }
}

/* Return true only for a simple valid email shape: text@text.domain */
function isValidEmail(value) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return pattern.test(value);
}

/* Check all three fields; return true when everything is valid. */
function validateForm() {
  var nameValue = nameInput.value.trim();       // trim() removes spaces so "   " is rejected
  var emailValue = emailInput.value.trim();
  var messageValue = messageInput.value.trim();
  var allValid = true;
  var firstInvalid = null;

  if (nameValue === "") {
    setError(nameInput, "name-error", "Please enter your name. Spaces alone are not accepted.");
    allValid = false;
    firstInvalid = firstInvalid || nameInput;
  } else {
    setError(nameInput, "name-error", "");
  }

  if (emailValue === "") {
    setError(emailInput, "email-error", "Please enter your email address.");
    allValid = false;
    firstInvalid = firstInvalid || emailInput;
  } else if (!isValidEmail(emailValue)) {
    setError(emailInput, "email-error", "Enter an email like name@example.com.");
    allValid = false;
    firstInvalid = firstInvalid || emailInput;
  } else {
    setError(emailInput, "email-error", "");
  }

  if (messageValue === "") {
    setError(messageInput, "message-error", "Please write a message. Spaces alone are not accepted.");
    allValid = false;
    firstInvalid = firstInvalid || messageInput;
  } else {
    setError(messageInput, "message-error", "");
  }

  if (firstInvalid) {
    firstInvalid.focus(); // move the keyboard focus to the first problem
  }
  return allValid;
}

/* Handle the submit event: validate locally and show a preview. */
function handleFormSubmit(event) {
  event.preventDefault(); // keep everything in the browser, nothing is sent

  if (validateForm()) {
    // textContent is used so user text is shown as plain text, never as HTML
    document.getElementById("preview-name").textContent = nameInput.value.trim();
    document.getElementById("preview-email").textContent = emailInput.value.trim();
    document.getElementById("preview-message").textContent = messageInput.value.trim();
    previewBox.hidden = false;
    form.reset();
  } else {
    previewBox.hidden = true;
  }
}

if (form) {
  form.addEventListener("submit", handleFormSubmit);
}

/* ---------------------------------------------------------
   FEATURE 2: Gallery viewer
   --------------------------------------------------------- */
var slides = document.querySelectorAll("#gallery .slide");
var prevButton = document.getElementById("gallery-prev");
var nextButton = document.getElementById("gallery-next");
var galleryStatus = document.getElementById("gallery-status");
var currentSlide = 0;

/* Show one photo (and its caption) and update the buttons and counter. */
function showSlide(index) {
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.toggle("active", i === index);
  }
  currentSlide = index;
  galleryStatus.textContent = "Photo " + (index + 1) + " of " + slides.length;
  prevButton.disabled = (index === 0);                    // first photo: no Previous
  nextButton.disabled = (index === slides.length - 1);    // last photo: no Next
}

if (slides.length > 0) {
  prevButton.addEventListener("click", function () {
    if (currentSlide > 0) { showSlide(currentSlide - 1); }
  });
  nextButton.addEventListener("click", function () {
    if (currentSlide < slides.length - 1) { showSlide(currentSlide + 1); }
  });
  showSlide(0);
}

/* ---------------------------------------------------------
   FEATURE 3: Theme switch (light / dark)
   --------------------------------------------------------- */
var themeButton = document.getElementById("theme-toggle");
var root = document.documentElement;

/* Apply a theme, update the button text and try to remember the choice. */
function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    themeButton.textContent = "Light mode";
    themeButton.setAttribute("aria-pressed", "true");
  } else {
    root.removeAttribute("data-theme");
    themeButton.textContent = "Dark mode";
    themeButton.setAttribute("aria-pressed", "false");
  }
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch (error) {
    // Saving is optional, so ignore storage problems
  }
}

if (themeButton) {
  var savedTheme = "light";
  try {
    savedTheme = localStorage.getItem("portfolio-theme") || "light";
  } catch (error) {
    savedTheme = "light";
  }
  applyTheme(savedTheme);

  themeButton.addEventListener("click", function () {
    var isDark = root.getAttribute("data-theme") === "dark";
    applyTheme(isDark ? "light" : "dark");
  });
}

/* ---------------------------------------------------------
   FEATURE 4: Mobile navigation
   --------------------------------------------------------- */
var menuButton = document.getElementById("menu-toggle");
var siteNav = document.getElementById("site-nav");

/* Open or close the menu and keep the button state clear. */
function setMenu(open) {
  siteNav.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", open ? "true" : "false");
  menuButton.textContent = open ? "Close" : "Menu";
}

if (menuButton && siteNav) {
  menuButton.addEventListener("click", function () {
    setMenu(!siteNav.classList.contains("open"));
  });

  // Close the menu after a link is chosen
  var navLinks = siteNav.querySelectorAll("a");
  for (var n = 0; n < navLinks.length; n++) {
    navLinks[n].addEventListener("click", function () { setMenu(false); });
  }

  // Close the menu with the Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && siteNav.classList.contains("open")) {
      setMenu(false);
      menuButton.focus();
    }
  });
}