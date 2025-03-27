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
    else if (height === 74) heightPercentage = 5;
    else if (height >= 75) heightPercentage = 5;
  }

  // Race Calculation (multi-selection)
  let racePercentage = 0;
  if (selectedRaces.includes('White')) racePercentage += 57;
  if (selectedRaces.includes('Hispanic')) racePercentage += 19;
  if (selectedRaces.includes('Black')) racePercentage += 12;
  if (selectedRaces.includes('Asian')) racePercentage += 6;
  if (selectedRaces.includes('Other')) racePercentage += 6;

  // Income Calculation
  let incomePercentage = 0;
  if (gender === 'female') {
    if (income < 15000) incomePercentage = 100;
    else if (income < 30000) incomePercentage = 85;
    else if (income < 50000) incomePercentage = 45;
    else if (income < 75000) incomePercentage = 26;
    else if (income < 100000) incomePercentage = 15;
    else if (income < 150000) incomePercentage = 6;
    else if (income < 200000) incomePercentage = 3;
    else if (income < 300000) incomePercentage = 1;
    else if (income >= 500000) incomePercentage = 0.1;
  } else if (gender === 'male') {
    if (income < 15000) incomePercentage = 100;
    else if (income < 30000) incomePercentage = 89;
    else if (income < 50000) incomePercentage = 59;
    else if (income < 75000) incomePercentage = 39;
    else if (income < 100000) incomePercentage = 27;
    else if (income < 150000) incomePercentage = 13;
    else if (income < 200000) incomePercentage = 7;
    else if (income < 300000) incomePercentage = 3;
    else if (income >= 500000) incomePercentage = 1;
  }

  // Obesity Calculation
  const obesityFactor = (obese === 'Y') ? 0.70 : 1; // Obese reduces the percentage by 30%

  // Marital Status Calculation (approximations based on gender)
  let maritalStatusPercentage = 0;
  if (gender === 'female') {
    if (maritalStatus === 'single') maritalStatusPercentage = 0.40;
    else if (maritalStatus === 'married') maritalStatusPercentage = 0.60;
    else maritalStatusPercentage = 0.20; // Divorced
  } else if (gender === 'male') {
    if (maritalStatus === 'single') maritalStatusPercentage = 0.30;
    else if (maritalStatus === 'married') maritalStatusPercentage = 0.55;
    else maritalStatusPercentage = 0.15; // Divorced
  }

  // Population calculation (simplified example formula)
  const totalPopulation = 335000000;
  const genderPopulation = totalPopulation * 0.5; // 50% male/female
  const raceAdjustedPopulation = (genderPopulation * racePercentage) / 100;
  const heightAdjustedPopulation = (raceAdjustedPopulation * heightPercentage) / 100;
  const incomeAdjustedPopulation = (heightAdjustedPopulation * incomePercentage) / 100;
  const obesityAdjustedPopulation = incomeAdjustedPopulation * obesityFactor;
  const maritalStatusAdjustedPopulation = obesityAdjustedPopulation * maritalStatusPercentage;

  // Calculate percentage
  const percentage = (maritalStatusAdjustedPopulation / totalPopulation) * 100;

  // Display result
  document.querySelector('#percentage-result span').textContent = `${percentage.toFixed(2)}%`;
});
