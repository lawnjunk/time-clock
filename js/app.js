'use strict';

var tableDiv = document.getElementById('display-employees');
var addEmployeeForm = document.getElementById('add-employee-form');
addEmployeeForm.addEventListener('submit', addEmployee);

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
  displayEmployees();
  displayTodayEmployees();
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
  var employees = getLocalEmployees();
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

function displayTodayEmployees() { // same as displayEmployees but it filters by who is on the clock. refactor?
  var employees = getLocalEmployees();
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

function getEmployeeSelect() { // select bar with all the current employees as options. value = their id
  var select = document.createElement('select');
  var employees = getLocalEmployees();
  var option;
  for(var i = 0; i < employees.length; i++) {
    option = document.createElement('option');
    option.setAttribute('value', employees[i].id);
    option.textContent = employees[i].name;
    select.appendChild(option);
  }
  return select;
}

function getLocalEmployees() {
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
  return employees;
}

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
