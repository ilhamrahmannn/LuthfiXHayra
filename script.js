const button = document.querySelector("#button");
const icon = document.querySelector("#button > i");
const audio = document.querySelector("audio");
const sliderButton = document.getElementById("sliderButton");
const icon1 = document.getElementById("icon1");
const icon2 = document.getElementById("icon2");
const dropdownContent = document.querySelector(".dropdown-content");

// Define two different audio sources
const audioSource1 = "./audio/one piece.mp3";
const audioSource2 = "/audio/comel.mp3";

// Define two different background colors
const backgroundColor1 = "#c4bfee46";
const backgroundColor2 = "#ebe0e0b2";

// Initial active icon and background color
let activeIcon = 1;

// Function to update audio and background color based on active icon
function updateAudioAndBackground() {
  if (activeIcon === 1) {
    audio.src = audioSource1;
    document.body.style.backgroundColor = backgroundColor1;
  } else {
    audio.src = audioSource2;
    document.body.style.backgroundColor = backgroundColor2;
  }
}

sliderButton.addEventListener("click", () => {
  if (activeIcon === 1) {
    icon1.classList.remove("active");
    icon2.classList.add("active");
    activeIcon = 2;
    sliderButton.style.left = "50%";
  } else {
    icon2.classList.remove("active");
    icon1.classList.add("active");
    activeIcon = 1;
    sliderButton.style.left = "0";
  }

  // Update audio and background when the slider is clicked
  updateAudioAndBackground();
});

// Initial setup
updateAudioAndBackground();

// Mute button functionality
button.addEventListener("click", () => {
  if (audio.paused) {
    audio.volume = 0.2;
    audio.play();
    icon.classList.remove("fa-volume-up");
    icon.classList.add("fa-volume-mute");
  } else {
    audio.pause();
    icon.classList.remove("fa-volume-mute");
    icon.classList.add("fa-volume-up");
  }
  button.classList.add("fade");
});


// Function to change the background color of the dropdown content
function changeDropdownBackgroundColor(iconId) {
  if (iconId === "icon1") {
    dropdownContent.style.backgroundColor = "#c4bfeef5"; // Set your desired background color
  } else {
    dropdownContent.style.backgroundColor = "#ebe0e0ec"; // Set your desired background color
  }
}

// Add a click event listener to the slider button
document.getElementById("sliderButton").addEventListener("click", () => {
  const activeIcon = document.querySelector(".icon.active");

  if (activeIcon === icon1) {
    changeDropdownBackgroundColor("icon1");
  } else if (activeIcon === icon2) {
    changeDropdownBackgroundColor("icon2");
  }
});
