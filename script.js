
const button = document.querySelector("#play");
const icon = document.querySelector("#play > i");
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
    audio.volume = 0.8;
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

let numbers = [];
const totalNumbersElement = document.getElementById("totalNumbers");
const numberListElement = document.getElementById("numberList");

function addNumber() {
  const numberInput = document.getElementById("numberInput");
  const number = parseInt(numberInput.value);

  if (!isNaN(number)) {
    numbers.push(number);
    displayResults()
  }

  numberInput.value = "";
}

function displayResults() {
  totalNumbersElement.textContent = numbers.length;
  numberListElement.innerHTML = "";

  for (const number of numbers) {
    const p = document.createElement("p");
    p.textContent = number;
    numberListElement.appendChild(p);
  }
  
}

const input = document.querySelector('#input');

input.addEventListener('input', () => {
// Submit the form data
const formData = new FormData(input.closest('form'));

fetch(input.formAction, {
method: 'POST',
body: formData,
})
.then(response => response.json())
.then(data => {
// Check if the data was submitted successfully
if (data.success) {
  // Display an alert message
  alert('Data submitted successfully!');

  // Reload the page
  location.reload();
} else {
  // Display an error message
  alert('Data submission failed!');
}
})
.catch(error => {
// Display an error message
alert('Data submission failed!');
});
});
