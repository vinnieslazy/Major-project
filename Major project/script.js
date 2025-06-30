
const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper"),
  addEventCloseBtn = document.querySelector(".close"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventTitle = document.querySelector(".event-name"),
  addEventFrom = document.querySelector(".event-time-from"),
  addEventTo = document.querySelector(".event-time-to"),
  addEventSubmit = document.querySelector(".add-event-btn");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

// Array of month names
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const zodiacCycle = [
  { name: "Rat", img: "zodiac/rat.png" },
  { name: "Ox", img: "zodiac/ox.png" },
  { name: "Tiger", img: "zodiac/tiger.png" },
  { name: "Rabbit", img: "zodiac/rabbit.png" },
  { name: "Dragon", img: "zodiac/dragon.png" },
  { name: "Snake", img: "zodiac/snake.png" },
  { name: "Horse", img: "zodiac/horse.png" },
  { name: "Goat", img: "zodiac/goat.png" },
  { name: "Monkey", img: "zodiac/monkey.png" },
  { name: "Rooster", img: "zodiac/rooster.png" },
  { name: "Dog", img: "zodiac/dog.png" },
  { name: "Pig", img: "zodiac/pig.png" },
];


// Array of events (for demonstration purposes)
// const eventsArr = [
//   {
//     day: 30,
//     month: 6,
//     year: 2025,
//     events: [
//       {
//         title: "Event 1 Random ",
//         time: "10:00 AM",
//       },
//       {
//         title: "Event 2",
//         time: "11:00 AM",
//       },
//     ],
//   },
// ];

let eventsArr = [];
// Get events from local storage
getEvents();


// function to add days

function initCalendar() {
  // used to get prev months & days, current date and future dates
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  //   update date top of calendar
  date.innerHTML = months[month] + " " + year;
  
  updateZodiac(year); 

  //   adding days on dom(document object model)

  let days = "";

  //   prev months days

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  //   current days and month

  for (let i = 1; i <= lastDate; i++) {

    // Check if event present on current day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        //if event found, set event to true
        event = true;
      }
    });
    
    // if day is today add class today
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {

      activeDay = i;
      getActiveDay(i); // set active day
      updateEvents(i); // update events for active day
      // if event is true, add class event
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day active today">${i}</div>`;
      }
    }
    // add remaining as it is
    else {
if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day">${i}</div>`;
      }
  }
}

  // next months days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

initCalendar();

// prev month
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

// next month

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

// goto date and today button
todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  activeDay = today.getDate();
  initCalendar();
});

// Auto inputs seperation for month and year
dateInput.addEventListener("input", (e) => {
  // allows only numbers removing anything else
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    // add slash if two numbers entered
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }


  // if backpsace is pressed
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});


gotoBtn.addEventListener("click", gotoDate);

// function to go to entered date


function gotoDate() {
  console.log("Going to date");
  const dateArr = dateInput.value.split("/");
  // data validation
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  // if invalid date
  alert("Invalid Date");
}

// Adds interactable button to open and close event input form
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.add("active");
});
addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if(e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

// Allows a max of 50 characters in the event input
addEventFrom.addEventListener("input", (e) => {
  if (addEventFrom.value.length > 50) {
    addEventFrom.value = addEventFrom.value.slice(0, 50);
  }
});
// time format in from and to time
addEventFrom.addEventListener("input", (e) => {
  // remove anything but numbers
  let value = addEventFrom.value.replace(/[^0-9]/g, "");
  // if two numbers entered auto add a colon
  if (value.length >= 3) {
    value = value.slice(0, 4); // max 4 digits
    value = value.slice(0, 2) + ":" + value.slice(2);
  }

  addEventFrom.value = value;
});
// same with to time
addEventTo.addEventListener("input", (e) => {
  // remove anything but numbers
  let value = addEventTo.value.replace(/[^0-9]/g, "");
  if (value.length >= 3) {
    value = value.slice(0, 4); // max 4 digits
    value = value.slice(0, 2) + ":" + value.slice(2);
  }

  addEventTo.value = value;
});


// Function to add listenter to days after rendered

function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      // set current day as active day
      activeDay = Number(e.target.innerHTML);

      // call active day after click
      getActiveDay(e.target.innerHTML);
      // update events for active day
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);

      // remove active from already active day
      days.forEach((day) => {
        day.classList.remove("active");
      });

      // if prev month day clicked goto prev month and add acvtive

      if(e.target.classList.contains("prev-date")) {
        prevMonth();
        
        // After going to prev month, set active day
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if(!day.classList.contains("prev-date") && day.innerHTML === e.target.innerHTML) {
              day.classList.add("active");
            }
          });
        } , 100);
      } else {
        // if next month day clicked goto next month and add active
        if(e.target.classList.contains("next-date")) {
          nextMonth();
          
          // After going to next month, set active day
          setTimeout(() => {
            const days = document.querySelectorAll(".day");
            days.forEach((day) => {
              if(!day.classList.contains("next-date") && day.innerHTML === e.target.innerHTML) {
                day.classList.add("active");
              }
            });
          } , 100);
        } else {
          // if current month day clicked, just add active
          e.target.classList.add("active");
        }
      }
    });
  });
}

// To show active day event and date at top


function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

// function to show events of the day

function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    // get events of active day only
    if (
      event.day === date &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });

  // If no events found, show no events message
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }

  // Update events container with events
  console.log(events);
  eventsContainer.innerHTML = events;
  // Save events when new ones are added or removed
  saveEvents();
}

// Function to create new event
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;


  // Validate event title and time
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all fields");
    return;
  }


  // Check if time format is correct
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");

  if (timeFromArr.length !== 2 || 
    timeToArr.length !== 2 || 
    timeFromArr[0] > 23 || 
    timeFromArr[1] > 59 || 
    timeToArr[0] > 23 || 
    timeToArr[1] > 59) {
    alert("Please enter valid time in HH:MM format");
    return;
  }

  


  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };
  console.log(newEvent);
  console.log(activeDay);


  let eventAdded = false;
  
  // Check if eventsarr not empty
  if (eventsArr.length > 0) {
    // Check if event already exists for the day
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        // If event found, add new event to existing events
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  // If event array empty or current day has no events, create a new event object
  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  console.log(eventsArr);
  // remove active from add event form
  addEventWrapper.classList.remove("active");
  // clear the fields
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";

  // show current added event

  updateEvents(activeDay);
  initCalendar();

});

function convertTime(time) {
  //convert time to 24 hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

// functuion to remove events on click
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    const eventTitle = e.target.children[0].children[1].innerHTML;

    // Find the event in eventsArr and remove it
    eventsArr.forEach((event) => {
      if (
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
      ) {
        // Filter out the event with the matching title
        event.events.forEach((item, index) => {
          if (item.title === eventTitle) {
            // Remove the event from the array
            event.events.splice(index, 1);
          }
        });

        // If no events left for the day, remove the day from eventsArr
        if (event.events.length === 0) {
          eventsArr.splice(eventsArr.indexOf(event), 1);
          // after remove complete day also remove active class of that day
          const activeDayElem = document.querySelector(".day.active");
          if (activeDayaElem.classList.contains("event")) {
            activeDayElem.classList.remove("event");
          }
        }
      }
    });
    // after removing fomer array update event
    updateEvents(activeDay);
    initCalendar();
  }
});

// store events in local storage get from there
function saveEvents() {
  console.log("Saving events to local storage");
  localStorage.setItem("events", JSON.stringify(eventsArr));
}
function getEvents() {
  if (localStorage.getItem("events" === null)) {
    return;
  }
    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

function updateZodiac(year) {
  const zodiacIndex = (year - 2020 + 12) % 12; // 2020 is Year of the Rat
  const zodiac = zodiacCycle[zodiacIndex];
  const imgElem = document.querySelector(".zodiac-image");
  const nameElem = document.querySelector(".zodiac-name");

  imgElem.src = zodiac.img;
  imgElem.alt = zodiac.name;
  nameElem.textContent = zodiac.name;
}