/*
* Description: Search and populate table based on JSON file and selection
*
* Author: Neo
*/
"use strict";

/*
* Insertion function for table based on data
* 
* @param row (Object) - Inserts row after every data object
* @param cell1 (Object) - Populate specified cell with data
* @param cell2 (Object) - Populate specified cell with data
* @param cell3 (Object) - Populate specified cell with data
* @param cell4 (Object) - Populate specified cell with data
* @param cell5 (Object) - Populate specified cell with data
* @param cell6 (Object) - Populate specified cell with data
*/
function insertTableData(list, dataBody) {
        let row = dataBody.insertRow(-1);
        let img = document.createElement("img");
        img.src = list.img;
        img.alt = list.img;

        let cell1 = row.insertCell(0);
        cell1.innerHTML = list.name;

        let cell2 = row.insertCell(1);
        cell2.innerHTML = list.elevation;

        let cell3 = row.insertCell(2);
        cell3.innerHTML = list.effort;

        let cell4 = row.insertCell(3);
        cell4.innerHTML = img;

        let cell5 = row.insertCell(4);
        cell5.innerHTML = list.desc;

        let cell6 = row.insertCell(5);
        cell6.innerHTML = "lat: " + list.coords.lat + "\nlng: " + list.coords.lng;
}

/*
* Display the results that matched the selection
* 
* @param dataBody (Object) - Grab the field of the ID
*/
function displayResults(selection, list) {
    let dataBody = document.getElementById("dataBody");

    for(let i = 0; i < list.length; i++) {
        if(selection == list[i].name) {
            insertTableData(list[i], dataBody);
        }
    }
}

/*
* Reset the table and replace
* 
* @param dataBody (Object) - Grab the field of the ID
* @param newBody (Object) - Create a new element to replace
*/
function resetTable(table) {
    let dataBody = document.getElementById("dataBody");
    let newBody = document.createElement("tbody");
    newBody.setAttribute("id", "dataBody");

    table.replaceChild(newBody, dataBody);
}

window.onload = function() 
{
    //grab mountains data
    let objs;
    $.getJSON("data/mountains.json", function(data) {
        objs = data.mountains;

        //build ddl based on mountain data
        for(let i = 0; i < objs.length; i++) {
            let element = document.createElement("option");
            element.text = objs[i].name;
            element.value = objs[i].name;
            mountainField.appendChild(element);
        }
    });

    //grab each of the fields and assign
    let mountainField = document.getElementById("mountainField");
    let table = document.getElementById("tours");

    //search mountain info
    const mountainSearchBtn = document.getElementById("mountainSearchBtn");
    mountainSearchBtn.onclick = function() {
        resetTable(table);
        table.style.display = 'initial';
        displayResults(mountainField.value, objs);
    };

    var resetBtn = document.getElementById('resetBtn');
    // Bind Click Event Handler to Reset Buttom
    resetBtn.onclick = function() {
        table.style.display = 'none';
        resetTable(table);
    };
};