/*
* Description: 
*
* Author: Neo
*/
"use strict";

//insertion function for table
function insertTableData(list, dataBody) {
        let row = dataBody.insertRow(-1);

        let cell1 = row.insertCell(0);
        cell1.innerHTML = list.name;

        let cell2 = row.insertCell(1);
        cell2.innerHTML = list.elevation;

        let cell3 = row.insertCell(2);
        cell3.innerHTML = list.effort;

        let cell4 = row.insertCell(3);
        cell4.innerHTML = list.img;

        let cell5 = row.insertCell(4);
        cell5.innerHTML = list.desc;

        let cell6 = row.insertCell(5);
        cell6.innerHTML = "lat: " + list.coords.lat + "\nlng: " + list.coords.lng;
}

function appendColumn() {
    var tbl = document.getElementById("tours");

    // open loop for each row and append cell
    for(let i = 0; i < tbl.rows.length; i++) {
        createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), i, 'col');
    }
}

function displayResults(selection, list) {
    let dataBody = document.getElementById("dataBody");

    for(let i = 0; i < list.length; i++) {
        if(selection == list[i].name) {
            insertTableData(list[i], dataBody);
        }
    }
}

window.onload = function() 
{
    let mountainField = document.getElementById("mountainField");

    let objs;
    $.getJSON("data/mountains.json", function(data) {
        objs = data.mountains;

        for(let i = 0; i < objs.length; i++) {
            let element = document.createElement("option");
            element.text = objs[i].name;
            element.value = objs[i].name;
            mountainField.appendChild(element);
        }
    });

    //grab each of the values and assigns value
    let table = document.getElementById("tours");

    const mountainSearchBtn = document.getElementById("mountainSearchBtn");
    mountainSearchBtn.onclick = function() {
        displayResults(mountainField.value, objs);
    };

    var resetBtn = document.getElementById('resetBtn');
    // Bind Click Event Handler to Reset Buttom
    resetBtn.onclick = function() {
        let newBody = document.createElement("tbody");
        newBody.setAttribute("id", "dataBody");

        table.replaceChild(newBody, dataBody);
    };
};