function scrollSlider(direction) {
    let slider = document.getElementById("slider");
    let scrollAmount = 300; // Adjust scroll amount
    slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}
function handleSubscribe() {
let email = document.getElementById("emailInput").value;
let message = document.getElementById("subscribeMessage");

// Simple email validation
if (!email.includes("@") || !email.includes(".")) {
message.textContent = "Please enter a valid email address.";
message.classList.add("error");
return;
}

// Store in localStorage (can be replaced with API call)
let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
subscribers.push(email);
localStorage.setItem("subscribers", JSON.stringify(subscribers));

// Show success message
message.textContent = "Thank you for subscribing!";
message.classList.remove("error");
message.classList.add("success");

// Clear input field
document.getElementById("emailInput").value = "";

// Optional: Log stored emails
console.log("Subscribers List:", subscribers);
}
