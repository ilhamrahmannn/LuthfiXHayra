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
      // Get the input-form element by its ID
const inputForm = document.getElementById('inputForm');

// Get the name input element
const nameInput = document.getElementById('nameInput');

// Create a label element
const nameLabel = document.createElement('label');

// Set the label's attributes
nameLabel.setAttribute('for', 'name'); // Use the "for" attribute to associate the label with the input field

// Add a listener to the name input
nameInput.addEventListener('input', function () {
  nameLabel.textContent = 'Nama: ' + nameInput.value;
});

// Append the label to the input-form
inputForm.appendChild(nameLabel);


nameInput.addEventListener('input', function () {
  // Get the entered name
  const enteredName = nameInput.value;

  // Update the label with the entered name
  nameLabel.textContent = 'Nama: ' + enteredName;

  // Store the entered name in the array
  enteredNames.push(enteredName);

  // Increment the total entry count
  totalEntries++;

  // Optionally, you can display the total entry count
  totalNumbersElement.textContent = totalEntries;
});


const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'your_database_user',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_database_password',
  port: 5432,
});

app.use(express.json());

// Define API endpoints
app.get('/rsvps', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM rsvps');
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching RSVP data');
  }
});

app.post('/rsvps', async (req, res) => {
  const { name, number } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO rsvps (name, number) VALUES ($1, $2) RETURNING id', [name, number]);
    client.release();
    res.json({ id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding RSVP data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:5432`);
});
