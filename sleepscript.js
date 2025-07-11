// Assumes firebase is already initialized in firebase-config.js

const database = firebase.database();

document.getElementById('sleepoverForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const reason = document.getElementById('reason').value.trim();
  const external = document.getElementById('external').value;

  if (!name || !reason || !external) {
    alert("Please fill in all fields.");
    return;
  }

  const submissionRef = database.ref('sleepoverRequests').push();
  submissionRef.set({
    name,
    reason,
    external,
    timestamp: new Date().toISOString()
  }).then(() => {
    document.getElementById('confirmationMsg').textContent = "Your request has been submitted. Thank you!";
    document.getElementById('sleepoverForm').reset();
  }).catch((error) => {
    console.error("Error submitting request: ", error);
    alert("There was an error. Please try again later.");
  });
});