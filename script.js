document.getElementById('calculator-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const gender = document.getElementById('gender').value;
  const height = document.getElementById('height').value;
  const income = document.getElementById('income').value;
  const obese = document.getElementById('obese').value;
  const maritalStatus = document.getElementById('marital-status').value;

  // Collect selected races
  const selectedRaces = [];
  document.querySelectorAll('input[name="race"]:checked').forEach(function(race) {
    selectedRaces.push(race.value);
  });

  // Calculate percentage based on criteria
  let percentage = 0;

  // Example logic: You can change this based on real data or a more complex formula
  if (gender === 'female') {
    percentage += 30;
  } else if (gender === 'male') {
    percentage += 40;
  }

  if (height > 170) {
    percentage += 15;
  }

  if (income > 50000) {
    percentage += 25;
  }

  if (obese === 'Y') {
    percentage -= 10;
  }

  if (maritalStatus === 'single') {
    percentage += 10;
  }

  if (selectedRaces.length > 0) {
    percentage += 5 * selectedRaces.length; // Add points for each selected race
  }

  // Ensure the percentage is between 0 and 100
  percentage = Math.min(Math.max(percentage, 0), 100);

  // Display the result
  document.querySelector('#percentage-result span').textContent = `${percentage}%`;
});
