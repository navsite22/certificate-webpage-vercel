  document.addEventListener("DOMContentLoaded", function () {
  // Hide the loader
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.display = "none";
  }

  // Set the current year
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
