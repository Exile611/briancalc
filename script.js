const responses = [
    "You're on a whole other level, bro.",
    "Your standards are too high. Get real.",
    "The universe doesn't even know your standards.",
    "Are you sure you're not a celebrity?",
    "Bro, you're delusional. You're aiming for Mars.",
    "You're the perfect 10, but good luck with that.",
    "You probably think you're the main character.",
    "I see you're aiming for an impossible dream.",
    "You might be the next billionaire, just stay delusional."
];

function getDelusionalResponse() {
    const userInput = document.getElementById('user-input').value.trim();
    const resultDiv = document.getElementById('result');
    
    if (userInput === "") {
        resultDiv.innerHTML = "Please enter something to calculate!";
        resultDiv.style.color = "red";
    } else {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        resultDiv.innerHTML = `Result: ${randomResponse}`;
    }
}
