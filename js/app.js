'use strict';

var tableDiv = document.getElementById('display-employees');
var addEmployeeForm = document.getElementById('add-employee-form');
addEmployeeForm.addEventListener('submit', addEmployee);

var employeeCounter;
try {
  if(localStorage.getItem('employeeCounter')) {
    employeeCounter = localStorage.getItem('employeeCounter');
  }
  employeeCounter = 1000;
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

function addEmployee(event) {
  event.preventDefault();

  var name = event.target.employeeName.value;

  var id = parseInt(localStorage.getItem('employeeCounter'));
  id++;
  localStorage.setItem('employeeCounter', id);

  var newEmployee = new Employee(name, id);
  var employees = [];
  getAndSetLocalStorage(employees, newEmployee);

  addEmployeeForm.reset();
  tableDiv.innerHTML = '';
  displayEmployees();
}

function getAndSetLocalStorage(array, newData) {
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
    if(JSON.parse(localStorage.getItem('employees'))) {
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
    table.appendChild(employeeRow);
  }

  tableDiv.appendChild(table);
}

if(document.getElementById('display-employees')) {
  if(!localStorage.getItem('employees') || localStorage.getItem('employees').length === 0) {
    var admin = new Employee('admin', 1000);
    var employees = [];
    getAndSetLocalStorage(employees, admin);
  }

  displayEmployees();
}
