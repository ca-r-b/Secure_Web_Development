let idleTime = 0;
const idleLimit = 2 * 60 * 1000; // 2 minutes 
let isLoggedOut = false; // Flag to check if logout is already triggered

const idleInterval = setInterval(timerIncrement, 1000); // 1 second

window.onload = resetTimer;
window.onmousemove = resetTimer;
window.onkeypress = resetTimer;

function resetTimer() {
    idleTime = 0;
}

function timerIncrement() {
    idleTime += 1000; // 1 second
    if (idleTime >= idleLimit && !isLoggedOut) {
        isLoggedOut = true; // Set flag to true
        clearInterval(idleInterval); // Stop the interval timer
        alert("You have been logged out due to inactivity.");
        fetch('/log-session-timeout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reason: 'Idle Timeout' })
        }).then(() => {
            window.location.href = "/logout"; // Redirect to logout
        });
    }
}