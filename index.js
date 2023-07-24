const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
// Use the cors middleware
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')))

// Route for BMI calculation
app.post('/bmi', (req, res) => {
  const { height, weight } = req.body;
  const bmi = calculateBMI(height, weight);
  res.json({ bmi });
});

// Route for body fat calculation
app.post('/bodyfat', (req, res) => {
  const { gender, weight, height, age, waist, hip, neck } = req.body;

  let bodyFatPercentage;
  if (gender === 'male') {
    bodyFatPercentage = calculateBodyFatForMen(weight, waist, neck, height);
  } else if (gender === 'female') {
    bodyFatPercentage = calculateBodyFatForWomen(weight, waist, hip, neck, height);
  } else {
    return res.status(400).json({ error: 'Invalid gender' });
  }

  res.json({ bodyFatPercentage });
});


// Route for ideal weight calculation
app.post('/idealweight', (req, res) => {
  const { gender, height } = req.body;

  let idealWeight;
  if (gender === 'male') {
    idealWeight = calculateIdealWeightForMen(height);
  } else if (gender === 'female') {
    idealWeight = calculateIdealWeightForWomen(height);
  } else {
    return res.status(400).json({ error: 'Invalid gender' });
  }

  res.json({ idealWeight });
});

// Route for calories burned calculation
app.post('/caloriesburned', (req, res) => {
  const { activity, weight, duration } = req.body;
  const caloriesBurned = calculateCaloriesBurned(activity, weight, duration);
  res.json({ caloriesBurned });
});

// Function to calculate BMI
function calculateBMI(height, weight) {
  const heightInMeters = height; // Height is already provided in meters
  const weightInKg = weight;

  const bmi = weightInKg / (heightInMeters * heightInMeters);
  return bmi;
}

// ...

// Function to calculate Body Fat for Men
function calculateBodyFatForMen(weight, waist, neck, height) {
  const weightInPounds = weight * 2.20462;
  const waistInInches = waist * 0.393701;
  const neckInInches = neck * 0.393701;
  const heightInInches = height * 39.3701;

  const leanBodyMass = weightInPounds - 0.407 * weightInPounds + 0.267 * heightInInches - 19.2;
  const bodyFatPercentage = (weightInPounds - leanBodyMass) / weightInPounds * 100.0;

  return bodyFatPercentage;
}

// Function to calculate Body Fat for Women
function calculateBodyFatForWomen(weight, waist, hip, neck, height) {
  const weightInPounds = weight * 2.20462;
  const waistInInches = waist * 0.393701;
  const hipInInches = hip * 0.393701;
  const neckInInches = neck * 0.393701;
  const heightInInches = height * 39.3701;

  const leanBodyMass = weightInPounds - 0.252 * weightInPounds + 0.473 * waistInInches + 0.281 * hipInInches - 17.5;
  const bodyFatPercentage = (weightInPounds - leanBodyMass) / weightInPounds * 100.0;

  return bodyFatPercentage;
}

// Function to calculate Ideal Weight for Men
function calculateIdealWeightForMen(height) {
  const idealWeight = 50.0 + 2.3 * (height - 60);

  return idealWeight;
}

// Function to calculate Ideal Weight for Women
function calculateIdealWeightForWomen(height) {
  const idealWeight = 45.5 + 2.3 * (height - 60);

  return idealWeight;
}

// Function to calculate Calories Burned
function calculateCaloriesBurned(activity, weight, duration) {
  const weightInKg = weight;
  const durationInHours = duration / 60.0;

  let bmr;
  switch (activity) {
    case 'sedentary':
      bmr = 88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * age;
      break;
    case 'moderate':
      bmr = 88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * age;
      bmr *= 1.55;
      break;
    case 'active':
      bmr = 88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * age;
      bmr *= 1.725;
      break;
    default:
      bmr = 0;
  }

  const caloriesBurned = bmr * durationInHours;

  return caloriesBurned;
}

// Serve the index.html file when accessing the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
