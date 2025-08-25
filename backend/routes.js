const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all appointments
router.get('/appointments', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM appointments ORDER BY date, time');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new appointment
router.post('/appointments', async (req, res) => {
  const {
    date,
    time,
    patient_first_name,
    patient_last_name,
    patient_email,
    patient_phone,
    patient_birth_date,
    reason,
    notes,
  } = req.body;

  try {
    const { rows } = await db.query(
      'INSERT INTO appointments (date, time, patient_first_name, patient_last_name, patient_email, patient_phone, patient_birth_date, reason, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [date, time, patient_first_name, patient_last_name, patient_email, patient_phone, patient_birth_date, reason, notes]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
