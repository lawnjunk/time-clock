'use strict';

var x = 0;
var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
var tableDiv = document.getElementById('display-employees');
var addEmployeeForm = document.getElementById('add-employee-form');
var schedule = new Schedule();
addEmployeeForm.addEventListener('submit', addEmployee);

var Monday;
var Tuesday;
var Wednesday;
var Thursday;
var Friday;
var employeeRow;
var employeeData;
var scheduleArray;
var employees;
var table;
var tableRow;
var tableData;
var tableHead;
var titleRow;
var titleData;
var employeeList = (JSON.parse(localStorage.getItem('employees')));
var employeeSelector = document.getElementById('remove-employee');
var employeeCounter; // if no employee counter is set, set to 1000. otherwise fetch from localstorage
var scheduleTable = document.getElementById('schedule-display');

function Employee(name, id) {
  this.name = name;
  this.id = id;
  this.onTheClock = false;
  this.profilePic = '';
  this.phoneNumber = '';
  this.email = '';
}

function Schedule() {
  this.monday = [];
  this.tuesday = [];
  this.wednesday = [];
  this.thursday = [];
  this.friday = [];
}

Schedule.prototype.getTable = function (){
  table = document.getElementById('table');
  tableRow = document.createElement('tr');
  tableData = document.createElement('td');
  for (var i = 0; i < days.length; i++){
    tableData = document.createElement('td');
    tableData.appendChild(getEmployeeSelect());
    tableRow.appendChild(tableData);
  }
  table.appendChild(tableRow);
};

Schedule.prototype.getTableHeader = function(){
  table = document.getElementById('table');
  tableRow = document.createElement('tr');
  tableHead = document.createElement('th');
  for (var i = 0; i < days.length;i++){
    tableHead = document.createElement('th');
    tableHead.textContent = days[i];
    tableRow.appendChild(tableHead);
  }
  table.appendChild(tableRow);
};

removeEmployee();
updateScheduleArrays();
displaySchedule();
makeTable();
schedule.getTableHeader();
schedule.getTable();

try {
  employeeCounter = 1000;
  if(localStorage.getItem('employeeCounter')) {
    employeeCounter = localStorage.getItem('employeeCounter');
  }

  localStorage.setItem('employeeCounter', employeeCounter);
} catch(error) {
  console.log(error);
}

if(document.getElementById('display-employees')) {

  if(!localStorage.getItem('employees') || localStorage.getItem('employees').length === 0) { // if localstorage employees doesnt exist, or it is length 0, add the admin account at id 1000
    var admin = new Employee('admin', employeeCounter);
    employees = [];
    getAndSetLocalStorage(employees, admin);
  }
  displayEmployees();
}

if(document.getElementById('employees-today')) {
  displayTodayEmployees();
}

var logOutButton = document.getElementById('logOut');
logOutButton.addEventListener('click', logOut);

function logOut() {
  localStorage.setItem('thisEmployee', '');
  document.location.href = 'index.html';
}


function getAndSetLocalStorage(array, newData) { // updates the local 'array' by adding 'newData'
  try {
    if(localStorage.getItem('employees')) {
      array = JSON.parse(localStorage.getItem('employees'));
    } else {
      array = [];
    }
    array.push(newData);
    localStorage.setItem('employees', JSON.stringify(array));
  } catch(error) {
    console.log(error);
  }
}

function addEmployee(event) {
  event.preventDefault();
  x = 0;
  if(event.target.employeeName.value === '') { // if they didnt enter a name
    return;
  }

  var name = event.target.employeeName.value;

  var id = parseInt(localStorage.getItem('employeeCounter')); // increment employee id and then put the new one back in local
  id++;
  localStorage.setItem('employeeCounter', id);

  var newEmployee = new Employee(name, id);
  employees = [];
  getAndSetLocalStorage(employees, newEmployee);

  addEmployeeForm.reset();
  tableDiv.innerHTML = '';
  table = document.getElementById('table');
  table.innerHTML = '';
  displayEmployees();
  displayTodayEmployees();
  schedule.getTableHeader();
  schedule.getTable();
  employeeSelector.innerHTML = '';
  employeeList = JSON.parse(localStorage.getItem('employees'));
  removeEmployee();
}

function removeEmployee(){
  var removeOption;
  employeeList;
  var firedButton = document.createElement('input');
  firedButton.setAttribute('type', 'submit');
  firedButton.setAttribute('value', 'Fired');
  var selectRemove = document.createElement('select');
  employeeSelector.appendChild(selectRemove);
  selectRemove.setAttribute('id', 'removeSelector');
  employeeSelector.appendChild(firedButton);
  for(var i = 0; i < employeeList.length; i++) {
    removeOption = document.createElement('option');
    removeOption.setAttribute('value', employeeList[i].name);
    removeOption.textContent = employeeList[i].name;
    selectRemove.appendChild(removeOption);
  }
  employeeSelector.addEventListener('submit', terminatedWithPrejudice);
}

function terminatedWithPrejudice(event){
  event.preventDefault();
  x = 0;
  var firedEmployee, terminated = event.target.removeSelector.value;

  for(var i = 0; i < employeeList.length; i++){
    if(employeeList[i].name === terminated) {
      firedEmployee = employeeList.splice(i, 1);
    }
  }

  for(var dayArr = 0; dayArr < scheduleArray.length; dayArr++) {
    for(var worker = 0; worker < window[days[dayArr]].length; worker++) {
      if(window[days[dayArr]][worker] === firedEmployee[0].name) {
        window[days[dayArr]].splice(worker, 1);
      }
    }
  }

  localStorage.setItem('scheduleArray', JSON.stringify(scheduleArray));

  localStorage.setItem('employees', JSON.stringify(employeeList));
  employeeList = JSON.parse(localStorage.getItem('employees'));
  tableDiv.innerHTML = '';
  table = document.getElementById('table');
  table.innerHTML = '';
  makeTable();
  displayEmployees();
  displayTodayEmployees();
  schedule.getTableHeader();
  schedule.getTable();
  scheduleTable.innerHTML = '';
  displaySchedule();
  employeeSelector.innerHTML = '';
  removeEmployee();
}

function makeTable(){
  var main = document.getElementById('main');
  table = document.createElement('table');
  table.setAttribute('id', 'table');
  main.appendChild(table);
}

function displayEmployees() {
  employees;

  try {
    if(JSON.parse(localStorage.getItem('employees'))) { // grab employees array or create a blank one if it doesnt exist locally
      employees = JSON.parse(localStorage.getItem('employees'));
    } else {
      employees = [];
    }
  } catch(error) {
    employees = 'No Employees';
  }
  table = document.createElement('table');
  titleRow = document.createElement('tr');
  titleData = document.createElement('th');
  titleData.textContent = 'All Employees';
  titleRow.appendChild(titleData);
  table.appendChild(titleRow);

  employeeRow;
  employeeData;
  for(var i = 0; i < employees.length; i++) {
    employeeRow = document.createElement('tr');
    employeeData = document.createElement('td');
    employeeData.textContent = employees[i].name;
    employeeRow.appendChild(employeeData);
    employeeData = document.createElement('td');
    employeeData.textContent = employees[i].id;
    employeeRow.appendChild(employeeData);
    table.appendChild(employeeRow);
  }

  tableDiv.appendChild(table);
}

function displayTodayEmployees() {
  employees;

  try {
    if(JSON.parse(localStorage.getItem('employees'))) { // grab employees array or create a blank one if it doesnt exist locally
      employees = JSON.parse(localStorage.getItem('employees'));
    } else {
      employees = [];
    }
  } catch(error) {
    employees = 'No Employees';
  }
  var employeesToday = [];
  for(var i = 0; i < employees.length; i++) {
    if(employees[i].onTheClock) {
      employeesToday.push(employees[i]);
    }
  }

  table = document.createElement('table');
  titleRow = document.createElement('tr');
  titleData = document.createElement('th');
  titleData.textContent = 'Employees On The Clock';
  titleRow.appendChild(titleData);
  table.appendChild(titleRow);

  employeeRow;
  employeeData;
  for(i = 0; i < employeesToday.length; i++) {
    employeeRow = document.createElement('tr');
    employeeData = document.createElement('td');
    employeeData.textContent = employeesToday[i].name;
    employeeRow.appendChild(employeeData);
    employeeData = document.createElement('td');
    employeeData.textContent = employeesToday[i].id;
    employeeRow.appendChild(employeeData);
    table.appendChild(employeeRow);
  }
  tableDiv.appendChild(table);
}

function getEmployeeSelect() {
  employees;
  var submitForm = document.createElement('form');
  submitForm.setAttribute('id', 'submissionForm');
  var submitButton = document.createElement('input');
  submitButton.setAttribute('type', 'submit');
  var select = document.createElement('select');
  submitForm.setAttribute('id', days[x]);
  select.setAttribute('id', 'selector');
  x++;
  submitForm.appendChild(select);
  submitForm.appendChild(submitButton);


  submitForm.addEventListener('submit', dailyPush);

  try {
    if(JSON.parse(localStorage.getItem('employees'))) { // grab employees array or create a blank one if it doesnt exist locally
      employees = JSON.parse(localStorage.getItem('employees'));
    } else {
      employees = [];
    }
  } catch(error) {
    employees = 'No Employees';
  }
  var option;
  for(var i = 0; i < employees.length; i++) {
    option = document.createElement('option');
    option.setAttribute('value', employees[i].name);
    option.textContent = employees[i].name;
    select.appendChild(option);
  }
  return submitForm;
}

function dailyPush(event){
  event.preventDefault();

  var employee = event.target.id;
  window[employee].push(event.target.selector.value);
  storeScheduleArray();
  scheduleTable.innerHTML = '';
  displaySchedule();
}

function displaySchedule(){
  tableRow = document.createElement('tr');
  tableHead = document.createElement('th');
  for (var i = 0; i < days.length; i++){
    tableHead = document.createElement('th');
    tableHead.textContent = days[i];
    tableRow.appendChild(tableHead);
  }
  scheduleTable.appendChild(tableRow);
  tableRow = document.createElement('tr');
  var ul, li;
  for (var j = 0; j < days.length; j++){
    tableData = document.createElement('td');
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
