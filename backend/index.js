require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

const appointmentRoutes = require('./routes');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the Citas API!');
});

app.use('/api', appointmentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
