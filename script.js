"use strict";
const ENDPOINT = "https://script.google.com/macros/s/AKfycbxWzDUvP26rVSbokwWFmjCSyCVR3FFVu_smc68eQboqrlVLMCSvqhh51HJqx0gnZitIqA/exec"
const weekdays = [
    "Monday",
    "Tuesday", 
    "Wednesday",
    "Thursday",
    "Friday"
]
const form = document.querySelector("#_classInput");
const name = document.querySelector("#name");
const room = document.querySelector("#room");
const teacher = document.querySelector("#teacher");
const buildings = document.querySelector("#buildings");
const start = document.querySelector("#start");
const end = document.querySelector("#end");
const days = Array.from(document.querySelectorAll(".days"));
const schedName = document.querySelector("#_scheduleName");
const cart = document.querySelector("#_classList");
const cartTemplate = (obj, id) => `
<div class="cartItem" id="_${id}">
${JSON.stringify(obj)}
<button id="button_${id}">X</button>
</div>
`

const timeupdatedelay = 5000;
const TIMEKEY = "time";
const timeOpened = new Date();
const dayOpened = timeOpened.getDay();
let timeNow;
function* id() {
    let i = 0;
    while (true) yield i++;
}
const iterator = id();
async function SAVE(event) {
    event.preventDefault();
    const checked = days.filter(e => e.checked).map(e => e.value);
    if (checked.length === 0) {
        alert("Please select some days");
        return;
    }
    const RESPONSE = {
        name: name.value,
        room: room.value,
        teacher: teacher.value,
        building: buildings.value,
        start: start.value,
        end: end.value,
        days: checked
    }
    const NextId = iterator.next().value;
    const item = cartTemplate(RESPONSE, NextId);
    cart.insertAdjacentHTML("beforeend", item);
    const button = document.querySelector(`#button_${NextId}`);
    button.addEventListener("click", () => removeClass(NextId))
}
function removeClass(id) {
    const element = document.querySelector(`#_${id}`);
    element.remove();
}
async function optionpopulate() {
    const classlist = await (await fetch("./classlist.json")).json();
    classlist.forEach(e => {
        const option = document.createElement("option");
        option.value = e.number;
        option.textContent = e.name;
        buildings.append(option)
    })
}
async function startup() {
    await optionpopulate();
    // const savedTime = localStorage.getItem(TIMEKEY);
    // if (!savedTime) {
    //     //no saved time! Must be first opening
    //     //send worker message to load the sheet
    // } else {
    //     const convert = Number(savedTime);
    //     if (convert !== dayOpened) { //different day
    //         console.log("new day", convert, dayOpened);
    //         //load sheet
    //     } else { //same day
    //         console.log("same day");
    //         //load sheet from local storage, or else load new
    //     }
    // }
    // localStorage.setItem(TIMEKEY, dayOpened); //save the new time
    form.addEventListener("submit", SAVE);
    CLOCK();
}
function CLOCK() {
    const clockinterval = setInterval(() => {
        console.log("clock");
        ping();
    }, timeupdatedelay)
}
function ping() { //every clock cycle, the website performs a "ping" to see if the time / schedule need to change
    // const timeNow = new Date();
    // const dayNow = timeNow.getDay();
    // if (dayNow !== dayOpened) {/* refresh schedule */ }
}
startup();


/*
// console.log(RESPONSE)
    // try {
    //     const result = await fetch(ENDPOINT, {
    //         method: 'POST',
    //         headers: { "Content-Type": 'text/plain' },
    //         body: JSON.stringify(RESPONSE)
    //     });
    //     if (!result.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    //     const data = await result.json();
    // } catch (err) {
    //     throw new Error("Error sending POST request: ", err)
    // }
*/