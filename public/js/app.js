console.log("Client side javascript file is loaded");

// Fetch weather from API

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("messageOne");
const messageTwo = document.getElementById("messageTwo");

weatherForm.addEventListener("submit", e => {
    e.preventDefault();

    const location = search.value;

    fetch(`http://localhost:8080/weather?address=${location}`).then(res => {
        res.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});

































