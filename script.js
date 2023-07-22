// Event listeners for form submissions
document.getElementById('bmi-form').addEventListener('submit', calculateBMI);
document.getElementById('body-fat-form').addEventListener('submit', calculateBodyFat);
document.getElementById('ideal-weight-form').addEventListener('submit', calculateIdealWeight);
document.getElementById('calories-burned-form').addEventListener('submit', calculateCaloriesBurned);

// Function to calculate BMI
function calculateBMI(event) {
  event.preventDefault();
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);

  // Make API request to calculate BMI
  fetch('http://localhost:3000/bmi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ height, weight })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('bmi-result').textContent = `Your BMI: ${data.bmi.toFixed(2)}`;
  })
  .catch(error => {
    console.error('Error calculating BMI:', error);
  });
}

// Function to calculate Body Fat
function calculateBodyFat(event) {
  event.preventDefault();
  const gender = document.getElementById('gender').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const age = parseInt(document.getElementById('age').value);
  const waist = parseFloat(document.getElementById('waist').value);
  const hip = parseFloat(document.getElementById('hip').value);
  const neck = parseFloat(document.getElementById('neck').value);

  // Make API request to calculate body fat
  fetch('http://localhost:3000/bodyfat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ gender, weight, height, age, waist, hip, neck })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('body-fat-result').textContent = `Your Body Fat Percentage: ${data.bodyFatPercentage.toFixed(2)}%`;
  })
  .catch(error => {
    console.error('Error calculating body fat:', error);
  });
}

// Function to calculate Ideal Weight
function calculateIdealWeight(event) {
  event.preventDefault();
  const gender = document.getElementById('gender').value;
  const height = parseFloat(document.getElementById('height').value);

  // Make API request to calculate ideal weight
  fetch('http://localhost:3000/idealweight', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ gender, height })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('ideal-weight-result').textContent = `Your Ideal Weight: ${data.idealWeight.toFixed(2)} kg`;
  })
  .catch(error => {
    console.error('Error calculating ideal weight:', error);
  });
}

// Function to calculate Calories Burned
function calculateCaloriesBurned(event) {
  event.preventDefault();
  const activity = document.getElementById('activity').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const duration = parseFloat(document.getElementById('duration').value);

  // Make API request to calculate calories burned
  fetch('http://localhost:3000/caloriesburned', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ activity, weight, duration })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('calories-burned-result').textContent = `Calories Burned: ${data.caloriesBurned.toFixed(2)}`;
  })
  .catch(error => {
    console.error('Error calculating calories burned:', error);
  });
}
