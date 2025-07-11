// Assumes firebase is already initialized in firebase-config.js
// and `const db = firebase.firestore();` is declared there

document.getElementById('sleepoverForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const reason = document.getElementById('reason').value.trim();
  const external = document.getElementById('external').value;

  if (!name || !reason || !external) {
    alert("Please fill in all fields.");
    return;
  }

  db.collection("sleepoverRequests").add({
    name: name,
    reason: reason,
    external: external,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    document.getElementById('confirmationMsg').textContent = "Your request has been submitted. Thank you!";
    document.getElementById('sleepoverForm').reset();
  })
  .catch((error) => {
    console.error("Error submitting request: ", error);
    alert("There was an error. Please try again later.");
  });
});