'use strict';
var Monday;
var Tuesday;
var Wednesday;
var Thursday;
var Friday;
var scheduleArray;
var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
var clockInForm = document.getElementById('clock-in');
var clockOutForm = document.getElementById('clock-out');

clockInForm.addEventListener('submit', clockIn);
clockOutForm.addEventListener('submit', clockOut);

function clockIn(event) {
  event.preventDefault();

  var employee = JSON.parse(localStorage.getItem('thisEmployee'));
  employee.onTheClock = true;
  localStorage.setItem('thisEmployee', JSON.stringify(employee));
}

function clockOut(event) {
  event.preventDefault();

  var employee = JSON.parse(localStorage.getItem('thisEmployee'));
  var employees = JSON.parse(localStorage.getItem('employees'));

  employee.onTheClock = false;

  for(var i = 0; i < employees.length; i++) {
    if(employees[i].id === employee.id) {
      employees[i] = employee;
    }
  }
  localStorage.setItem('thisEmployee', JSON.stringify(employee));
  localStorage.setItem('employees', JSON.stringify(employees));
}

var hamburgerNav = document.getElementById('hamburger-nav');
var hamburgerIcon = document.getElementById('hamburger-icon');

hamburgerIcon.addEventListener('click', function(){
  if(hamburgerNav.className == 'hamburger-nav hidden'){
    hamburgerNav.className = 'hamburger-nav';
  } else{
    hamburgerNav.className = 'hamburger-nav hidden';
  }
});

var image = document.getElementById('img');
var employee = JSON.parse(localStorage.getItem('thisEmployee'));
image.setAttribute('src', employee.profilePic);

var phoneNumber = document.getElementById('phoneNumber');
var email = document.getElementById('email');

phoneNumber.textContent = employee.phoneNumber;
email.textContent = employee.email;

var logOutButton = document.getElementById('logOut');
logOutButton.addEventListener('click', logOut);

function logOut() {
  localStorage.setItem('thisEmployee', '');
  document.location.href = 'index.html';
}


function updateScheduleArrays() {
  if(!JSON.parse(localStorage.getItem('scheduleArray'))) {
    Monday = [];
    Tuesday = [];
    Wednesday = [];
    Thursday = [];
    Friday = [];
    scheduleArray = [Monday, Tuesday, Wednesday, Thursday, Friday];
    localStorage.setItem('scheduleArray', JSON.stringify(scheduleArray));
  } else {
    scheduleArray = JSON.parse(localStorage.getItem('scheduleArray'));
    Monday = scheduleArray[0];
    Tuesday = scheduleArray[1];
    Wednesday = scheduleArray[2];
    Thursday = scheduleArray[3];
    Friday = scheduleArray[4];
  }
}

function storeScheduleArray() {
  localStorage.setItem('scheduleArray', JSON.stringify(scheduleArray));
}

updateScheduleArrays();




function displaySchedule(){
  var scheduleTable = document.getElementById('scheduledisplay');
  var tableRow = document.createElement('tr');
  var tableHead = document.createElement('th');
  for (var i = 0; i < days.length; i++){
    tableHead = document.createElement('th');
    tableHead.textContent = days[i];
    tableRow.appendChild(tableHead);
  }
  scheduleTable.appendChild(tableRow);
  tableRow = document.createElement('tr');
  var ul, li;
  for (var j = 0; j < days.length; j++){
    var tableData = document.createElement('td');
    ul = document.createElement('ul');
    for (var k = 0; k < window[days[j]].length; k++){
      li = document.createElement('li');
      li.textContent = window[days[j]][k];
      ul.appendChild(li);
    }
    tableData.appendChild(ul);
    tableRow.appendChild(tableData);
  }
  storeScheduleArray();
  scheduleTable.appendChild(tableRow);
}

displaySchedule();
