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
function temp(event) {
    event.preventDefault();
    console.log(days)
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
    await optionpopulate()
    form.addEventListener("submit", temp);
    CLOCK();
}
function CLOCK() {
    const clockinterval = setInterval(() => {
        console.log("clock");
        const timenow = new Date();
    }, timeupdatedelay)
}
startup();