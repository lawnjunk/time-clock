'use strict';
var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
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
}

function Schedule() {
  this.monday = [];
  this.tuesday = [];
  this.wednesday = [];
  this.thursday = [];
  this.friday = [];
}

function makeTable(){
  var main = getElementById('main');
  var table = document.createElement('table');
  table.setAttribute('id', 'table');
  main.appendChild(table);
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
  titleData.textContent = 'Employee Name';
  titleRow.appendChild(titleData);
  table.appendChild(titleRow);

  var employeeRow, employeeData;
  for(var i = 0; i < employees.length; i++) {
    employeeRow = document.createElement('tr'), employeeData;
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

if(document.getElementById('display-employees')) {
  if(!localStorage.getItem('employees') || localStorage.getItem('employees').length === 0) { // if localstorage employees doesnt exist, or it is length 0, add the admin account at id 1000
    var admin = new Employee('admin', 1000);
    var employees = [];
    getAndSetLocalStorage(employees, admin);
  }

  displayEmployees();
}
