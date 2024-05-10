const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Declaring the array of image filenames */
let picArr = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];

/* Declaring the alternative text for each image file */
const altArr = [
  "alt for pic 1",
  "alt for pic 2",
  "alt for pic 3",
  "alt for pic 4",
  "alt for pic 5",
];

/* Looping through images */
picArr.forEach((x, i) => {
  const newImage = document.createElement("img");
  const src = "images/" + x;
  const alt = altArr[i];

  newImage.setAttribute("src", src);
  newImage.setAttribute("alt", alt);
  thumbBar.appendChild(newImage);

  newImage.addEventListener("click", () => {
    displayedImage.setAttribute("src", src);
    displayedImage.setAttribute("alt", alt);
  });
});

// const newImage = document.createElement("img");
// newImage.setAttribute("src", xxx);
// newImage.setAttribute("alt", xxx);
// thumbBar.appendChild(newImage);

/* Wiring up the Darken/Lighten button */

btn.addEventListener("click", () => {
  let currentMode = btn.getAttribute("class");

  if (currentMode === "dark") {
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
  } else if (currentMode === "light") {
    btn.setAttribute("class", "dark");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
  }
});
