const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Use the cors middleware
//app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Route for BMI calculation
app.post('/bmi', (req, res) => {
  const { height, weight } = req.body;
  const bmi = calculateBMI(height, weight);
  res.json({ bmi });
});

// Route for body fat calculation
app.post('/bodyfat', (req, res) => {
  const { gender, weight, height, age, waist, hip, neck } = req.body;
  const bodyFatPercentage = calculateBodyFat(gender, weight, height, age, waist, hip, neck);
  res.json({ bodyFatPercentage });
});

// Route for ideal weight calculation
app.post('/idealweight', (req, res) => {
  const { gender, height } = req.body;
  const idealWeight = calculateIdealWeight(gender, height);
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
  const bmi = weight / (height * height);
  return bmi;
}

// Function to calculate Body Fat
function calculateBodyFat(gender, weight, height, age, waist, hip, neck) {
  // Implement the body fat calculation logic here
  // For now, let's assume the calculation is done correctly and return a dummy value
  const bodyFatPercentage = 25.0;
  return bodyFatPercentage;
}

// Function to calculate Ideal Weight
function calculateIdealWeight(gender, height) {
  // Implement the ideal weight calculation logic here
  // For now, let's assume the calculation is done correctly and return a dummy value
  const idealWeight = 70.0;
  return idealWeight;
}

// Function to calculate Calories Burned
function calculateCaloriesBurned(activity, weight, duration) {
  // Implement the calories burned calculation logic here
  // For now, let's assume the calculation is done correctly and return a dummy value
  const caloriesBurned = 500.0;
  return caloriesBurned;
}

// Serve the index.html file when accessing the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
