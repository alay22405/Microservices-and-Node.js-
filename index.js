const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Route handler for the root URL
app.get('/', (req, res) => {
  // Redirect the user to the BMI calculator page
  res.redirect('/bmi');
});
