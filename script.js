// Dark Mode Toggle
const modeToggleButton = document.getElementById('mode-toggle');
const bodyElement = document.body;
const tableElement = document.querySelector('table');

// Default to Dark Mode
if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'dark');
} else {
  if (localStorage.getItem('theme') === 'light') {
    bodyElement.classList.add('light-mode');
    tableElement.classList.add('light-mode'); // Ensure light mode is applied to the table
  }
}

modeToggleButton.addEventListener('click', () => {
  // Toggle between light and dark mode
  bodyElement.classList.toggle('light-mode');
  tableElement.classList.toggle('light-mode'); // Apply light mode to the table as well

  // Save the current theme to localStorage
  if (bodyElement.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
    modeToggleButton.textContent = '☀️'; // Sun icon for light mode
  } else {
    localStorage.setItem('theme', 'dark');
    modeToggleButton.textContent = '🌙'; // Moon icon for dark mode
  }
});

// Calculate the percentage
document.getElementById('calculator-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const gender = document.getElementById('gender').value;
  const height = parseInt(document.getElementById('height').value); // Height from slider
  const income = parseInt(document.getElementById('income').value); // Income from slider
  const obese = document.getElementById('obese').value;
  const maritalStatus = document.getElementById('marital-status').value;

  // Collect selected races
  const selectedRaces = [];
  document.querySelectorAll('input[name="race"]:checked').forEach(function(race) {
    selectedRaces.push(race.value);
  });

  // Gender and Height Calculation
  let heightPercentage = 0;
  if (gender === 'female') {
    if (height <= 59) heightPercentage = 5;
    else if (height === 60) heightPercentage = 5;
    else if (height === 61) heightPercentage = 5;
    else if (height === 62) heightPercentage = 10;
    else if (height === 63) heightPercentage = 15;
    else if (height === 64) heightPercentage = 15;
    else if (height === 65) heightPercentage = 20;
    else if (height === 66) heightPercentage = 10;
    else if (height === 67) heightPercentage = 5;
    else if (height === 68) heightPercentage = 5;
    else if (height >= 69) heightPercentage = 5;
  } else if (gender === 'male') {
    if (height <= 64) heightPercentage = 5;
    else if (height === 65) heightPercentage = 5;
    else if (height === 66) heightPercentage = 5;
    else if (height === 67) heightPercentage = 10;
    else if (height === 68) heightPercentage = 10;
    else if (height === 69) heightPercentage = 15;
    else if (height === 70) heightPercentage = 15;
    else if (height === 71) heightPercentage = 10;
    else if (height === 72) heightPercentage = 10;
    else if (height === 73) heightPercentage = 5;
    else if (height >= 74) heightPercentage = 5;
  }

  // Race Calculation (Percentages for selected races)
  let racePercentage = 0;
  if (selectedRaces.length === 0) {
    racePercentage = 100; // If no race is selected, we consider all races.
  } else {
    selectedRaces.forEach(function(race) {
      if (race === 'White') racePercentage += 57;
      if (race === 'Hispanic') racePercentage += 19;
      if (race === 'Black') racePercentage += 12;
      if (race === 'Asian') racePercentage += 6;
      if (race === 'Other') racePercentage += 6;
    });
  }

  // Income Calculation (Based on gender and income level)
  let incomePercentage = 1;
  if (gender === 'female') {
    if (income <= 15000) incomePercentage = 85;
    else if (income <= 30000) incomePercentage = 69;
    else if (income <= 50000) incomePercentage = 45;
    else if (income <= 75000) incomePercentage = 26;
    else if (income <= 100000) incomePercentage = 15;
    else if (income <= 150000) incomePercentage = 6;
    else if (income <= 200000) incomePercentage = 3;
    else if (income <= 300000) incomePercentage = 1;
    else incomePercentage = 0.1;
  } else if (gender === 'male') {
    if (income <= 15000) incomePercentage = 89;
    else if (income <= 30000) incomePercentage = 78;
    else if (income <= 50000) incomePercentage = 59;
    else if (income <= 75000) incomePercentage = 39;
    else if (income <= 100000) incomePercentage = 27;
    else if (income <= 150000) incomePercentage = 13;
    else if (income <= 200000) incomePercentage = 7;
    else if (income <= 300000) incomePercentage = 3;
    else incomePercentage = 1;
  }

  // Obesity Factor (Percentage based on "Yes" or "No")
  const obesityFactor = (obese === 'Y') ? 0.30 : 1;

  // Marital Status Calculation
  let maritalStatusPercentage = 0;
  if (maritalStatus === 'single') maritalStatusPercentage = 0.30; // Single
  else if (maritalStatus === 'married') maritalStatusPercentage = 0.60; // Married
  else maritalStatusPercentage = 0.20; // Divorced

  // Final Calculation
  let totalPercentage = heightPercentage * (racePercentage / 100) * incomePercentage * obesityFactor * maritalStatusPercentage;
  totalPercentage = totalPercentage.toFixed(2); // Round the result to two decimal places

  // Display Result
  document.getElementById('percentage-result').innerHTML = `Percentage of people meeting criteria: <span>${totalPercentage}%</span>`;
});
