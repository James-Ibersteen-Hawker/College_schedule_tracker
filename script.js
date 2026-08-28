"use strict";
const form = document.querySelector("#_classInput");
const name = document.querySelector("#name");
const room = document.querySelector("#room");
const teacher = document.querySelector("#teacher");
const buildings = document.querySelector("#buildings");
const timeupdatedelay = 5000;
function temp(event) {
    event.preventDefault();
    const RESPONSE = {
        name: name.value,
        room: room.value,
        teacher: teacher.value,
        building: buildings.value
    }
    console.log(RESPONSE)
}
async function startup() {
    const classlist = await (await fetch("./classlist.json")).json();
    classlist.forEach(e => {
        console.log(e);
        const option = document.createElement("option");
        option.value = e.number;
        option.textContent = e.name;
        buildings.append(option)
    })
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