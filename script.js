"use strict";
const form = document.querySelector("#_classInput");
const name = document.querySelector("#name");
const room = document.querySelector("#room");
const teacher = document.querySelector("#teacher");
const buildings = document.querySelector("#buildings");
const start = document.querySelector("#start");
const end = document.querySelector("#end");
const days = Array.from(document.querySelectorAll(".days"))
const timeupdatedelay = 5000;
const TIMEKEY = "time";
const timeOpened = new Date();
const dayOpened = timeOpened.getDay();
let timeNow;
function SAVE(event) {
    event.preventDefault();
    const RESPONSE = {
        name: name.value,
        room: room.value,
        teacher: teacher.value,
        building: buildings.value,
        start: start.value,
        end: end.value,
        days: days.filter(e => e.checked).map(e => e.value)
    }
    console.log(RESPONSE)
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
    const savedTime = localStorage.getItem(TIMEKEY);
    if (!savedTime) {
        //no saved time! Must be first opening
        //send worker message to load the sheet
    } else {
        const convert = Number(savedTime);
        if (convert !== dayOpened) { //different day
            console.log("new day", convert, dayOpened);
            //load sheet
        } else { //same day
            console.log("same day");
            //load sheet from local storage, or else load new
        }
    }
    localStorage.setItem(TIMEKEY, dayOpened); //save the new time
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
    const timeNow = new Date();
    const dayNow = timeNow.getDay();
    if (dayNow !== dayOpened) {/* refresh schedule */}
}
startup();