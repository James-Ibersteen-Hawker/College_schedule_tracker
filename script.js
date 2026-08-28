"use strict";
const form = document.querySelector("#_classInput");
const name = document.querySelector("#name");
const room = document.querySelector("#room");
const teacher = document.querySelector("#teacher");
const building = document.querySelector("#buildings");
const timeupdatedelay = 5000;
function temp(event) {
    event.preventDefault();
    const RESPONSE = {
        name: name.value,
        room: room.value,
        teacher: teacher.value,
        building: building.value
    }
    console.log(RESPONSE)
}
function startup() {
    form.addEventListener("submit", temp);
    CLOCK();
}
startup();

function CLOCK() {
    const clockinterval = setInterval(() => {
        console.log("clock");
        const timenow = new Date();
    }, timeupdatedelay)
}