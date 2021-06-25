var SuperDogEventsArray = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 5000,
        date: "923-782-5796",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 5000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 5000,
        date: "06/01/2019"
    }
];

//the default display is all events
var filteredEvents = SuperDogEventsArray;

function buildDropDown() {
    var SuperDogEventsArrayDD = document.getElementById("eventDropDown");

    let distinctEvents = [...new Set(SuperDogEventsArray.map((SuperDogEventsArray => SuperDogEventsArray.city)))];

    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
    let resultsHTML = "";

    for (let i = 0; i < distinctEvents.length; i++) {

        resultsHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;

    }

    resultsHTML += linkHTMLEnd;
    SuperDogEventsArrayDD.innerHTML = resultsHTML;
    displayStats();
    displayData(SuperDogEventsArray);
}

function displayStats() {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }


        if (least > currentAttendance || least < 0) {
            least = currentAttendance
        }
    }

    average = total / filteredEvents.length;
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );

    loadEventsBook();
}

function loadEventsBook() {
    let eventsBook = [];
    eventsBook = getEvents();
    displayData(eventsBook);
}

function getEvents(element) {
    if (element != undefined) {

        let city = element.getAttribute("data-string");
        curEvents = JSON.parse(localStorage.getItem("SuperDogEventsArray")) || SuperDogEventsArray;
        filteredEvents = curEvents;
        document.getElementById("statsHeader").innerHTML = `Stats For ${city} Events`;
        if (city != "All") {
            //Explain how array filtering works-
            filteredEvents = curEvents.filter(function(item) {
                if (item.city == city) {
                    return item;
                }
            });
        }
        displayStats();
    } else {
        let a = JSON.parse(localStorage.getItem("SuperDogEventsArray")) || [];

        if (eventBook.length == 0) {
            eventBook = SuperDogEventsArray;
            localStorage.setItem("SuperDogEventsArray", JSON.stringify(eventBook));
        }
        return eventBook;
    }
}

function saveEvents() {
    //grab the events out of the local storage
    let SuperDogEventsArray = JSON.parse(localStorage.getItem("SuperDogEventsArray")) || SuperDogEventsArray;

    let obj = {};
    obj["event"] = document.getElementById("newEvent").value;
    obj["city"] = document.getElementById("newCity").value;
    obj["state"] = document.getElementById("newState").value;
    obj["attendance"] = document.getElementById("newAttendance").value;
    obj["date"] = document.getElementById("newDate").value;

    eventBook.push(obj);

    localStorage.setItem("eventBookArray", JSON.stringify(eventBook));

    //Access the values from the form by ID and add an object to the array.
    displayData(eventBook);
}

function displayData(eventBook) {
    const template = document.getElementById("dataTemplate");
    const resultsBody = document.getElementById("resultsBody");
    //clear table first
    resultsBody.innerHTML = "";

    for (let i = 0; i < SuperDogEventsArray.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("event").textContent = SuperDogEventsArray[i].event;
        dataRow.getElementById("city").textContent = SuperDogEventsArray[i].city;
        dataRow.getElementById("state").textContent = SuperDogEventsArray[i].state;
        dataRow.getElementById("attendance").textContent = SuperDogEventsArray[i].attendance;
        dataRow.getElementById("eventDate").textContent = new Date(SuperDogEventsArray[i].date).toLocaleDateString();

        resultsBody.appendChild(dataRow);
    }
}

function formatEventBook(eventBookString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}