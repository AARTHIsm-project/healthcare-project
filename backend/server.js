
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/submit', (req, res) => {
  const user = req.body;
  const users = JSON.parse(fs.readFileSync('users.json'));
  users.push(user);
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

  const message = user.symptoms.toLowerCase().includes('fever') 
    ? "Please consult a doctor if symptoms persist." 
    : "Keep hydrated and eat healthy!";

  res.status(201).json({ message });
});

app.post('/api/appointments', (req, res) => {
  const appt = req.body;
  const appts = JSON.parse(fs.readFileSync('appointments.json'));
  appts.push(appt);
  fs.writeFileSync('appointments.json', JSON.stringify(appts, null, 2));

  res.status(201).json({ message: `Appointment booked for ${appt.date}` });
});

app.get('/api/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync('users.json'));
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
