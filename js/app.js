'use strict';
var x = 0;
var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
var tableDiv = document.getElementById('display-employees');
var addEmployeeForm = document.getElementById('add-employee-form');
var schedule = new Schedule();
addEmployeeForm.addEventListener('submit', addEmployee);

var Monday = [];
var Tuesday = [];
var Wednesday = [];
var Thursday = [];
var Friday = [];







var employeeCounter; // if no employee counter is set, set to 1000. otherwise fetch from localstorage
try {
  employeeCounter = 1000;
  if(localStorage.getItem('employeeCounter')) {
    employeeCounter = localStorage.getItem('employeeCounter');
  }

  localStorage.setItem('employeeCounter', employeeCounter);
} catch(error) {
  console.log(error);
}

function Employee(name, id) {
  this.name = name;
  this.id = id;
  this.onTheClock = false;
}

function Schedule() {
  this.monday = [];
  this.tuesday = [];
  this.wednesday = [];
  this.thursday = [];
  this.friday = [];
}

function makeTable(){
  var main = document.getElementById('main');
  var table = document.createElement('table');
  table.setAttribute('id', 'table');
  main.appendChild(table);
}


Schedule.prototype.getTable = function (){
  var table = document.getElementById('table');
  var tableRow = document.createElement('tr');
  var tableData = document.createElement('td');
  for (var i = 0; i < days.length; i++){
    tableData = document.createElement('td');
    tableData.appendChild(getEmployeeSelect());
    tableRow.appendChild(tableData);
  }
  table.appendChild(tableRow);
};

Schedule.prototype.getTableHeader = function(){
  var table = document.getElementById('table');
  var tableRow = document.createElement('tr');
  var tableHead = document.createElement('th');
  for (var i = 0; i < days.length; i++){
    tableHead = document.createElement('th');
    tableHead.textContent = days[i];
    tableRow.appendChild(tableHead);
  }
  table.appendChild(tableRow);
};

function addEmployee(event) {
  event.preventDefault();

  if(event.target.employeeName.value === '') { // if they didnt enter a name
    return;
  }

  var name = event.target.employeeName.value;

  var id = parseInt(localStorage.getItem('employeeCounter')); // increment employee id and then put the new one back in local
  id++;
  localStorage.setItem('employeeCounter', id);

  var newEmployee = new Employee(name, id);
  var employees = [];
  getAndSetLocalStorage(employees, newEmployee);

  addEmployeeForm.reset();
  tableDiv.innerHTML = '';
  var table = document.getElementById('table');
  table.innerHTML = '';
  makeTable();
  displayEmployees();
  displayTodayEmployees();
  schedule.getTableHeader();
  schedule.getTable();
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

function displayEmployees() {
  var employees;

  try {
    if(JSON.parse(localStorage.getItem('employees'))) { // grab employees array or create a blank one if it doesnt exist locally
      employees = JSON.parse(localStorage.getItem('employees'));
    } else {
      employees = [];
    }
  } catch(error) {
    employees = 'No Employees';
  }
  var table = document.createElement('table');
  var titleRow = document.createElement('tr');
  var titleData = document.createElement('th');
  titleData.textContent = 'All Employees';
  titleRow.appendChild(titleData);
  table.appendChild(titleRow);

  var employeeRow, employeeData;
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
  var employees;

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

  var table = document.createElement('table');
  var titleRow = document.createElement('tr');
  var titleData = document.createElement('th');
  titleData.textContent = 'Employees On The Clock';
  titleRow.appendChild(titleData);
  table.appendChild(titleRow);

  var employeeRow, employeeData;
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

function dailyPush(event){
  event.preventDefault();

  var employee = event.target.id;
  console.log(employee);
  window[employee].push(event.target.selector.value);
  scheduleTable.innerHTML = '';
  displaySchedule();
}



function getEmployeeSelect() {
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
  var employees;

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
    option.setAttribute('value', employees[i].id);
    option.textContent = employees[i].name;
    select.appendChild(option);
  }
  return submitForm;
}


var scheduleTable = document.getElementById('schedule-display');


function displaySchedule(){
  var tableRow = document.createElement('tr');
  var tableHead = document.createElement('th');
  for (var i = 0; i < days.length; i++){
    tableHead = document.createElement('th');
    tableHead.textContent = days[i];
    tableRow.appendChild(tableHead);
  } scheduleTable.appendChild(tableRow);
  tableRow = document.createElement('tr');
  for (var j = 0; j < days.length; j++){
    var tableData = document.createElement('td');
    console.log(x, days[x]);
    for (var k = 0; k < window[days[j]].length; k++){
      tableData.textContent = window[days[j]][k];
    }
    tableRow.appendChild(tableData);
  }
  scheduleTable.appendChild(tableRow);
}

displaySchedule();


if(document.getElementById('display-employees')) {
  if(!localStorage.getItem('employees') || localStorage.getItem('employees').length === 0) { // if localstorage employees doesnt exist, or it is length 0, add the admin account at id 1000
    var admin = new Employee('admin', 1000);
    var employees = [];
    getAndSetLocalStorage(employees, admin);
  }

  displayEmployees();
}

if(document.getElementById('employees-today')) {
  displayTodayEmployees();
}
makeTable();
schedule.getTableHeader();
schedule.getTable();
