
document.getElementById('healthForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const user = {
    name: document.getElementById('name').value,
    age: +document.getElementById('age').value,
    weight: +document.getElementById('weight').value,
    symptoms: document.getElementById('symptoms').value
  };

  const res = await fetch('http://localhost:3000/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });

  const data = await res.json();
  document.getElementById('response').textContent = data.message;
});

document.getElementById('appointmentForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const appointment = {
    name: document.getElementById('patientName').value,
    date: document.getElementById('appointmentDate').value,
    issue: document.getElementById('issue').value
  };

  const res = await fetch('http://localhost:3000/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointment)
  });

  const data = await res.json();
  document.getElementById('appointmentResponse').textContent = data.message;
});
