'use strict';

var tableDiv = document.getElementById('display-employees');

function Employee(name) {
  this.name = name;
}

function Schedule() {
  this.monday = [];
  this.tuesday = [];
  this.wednesday = [];
  this.thursday = [];
  this.friday = [];
}

var addEmployeeForm = document.getElementById('add-employee-form');
addEmployeeForm.addEventListener('submit', addEmployee);

function addEmployee(event) {
  event.preventDefault();

  var name = event.target.employeeName.value;

  var newEmployee = new Employee(name);
  var employees = [];
  try {
    if(localStorage.getItem('employees')) {
      employees = JSON.parse(localStorage.getItem('employees'));
    } else {
      employees = [];
    }
    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(employees));
  } catch(error) {
    console.log(error);
  }

  tableDiv.innerHTML = '';
  displayEmployees();
}

function displayEmployees() {
  var employees;
  try {
    employees = JSON.parse(localStorage.getItem('employees'));
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

displayEmployees();
