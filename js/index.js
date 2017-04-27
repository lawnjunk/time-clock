'use strict';

var form = document.getElementById('loginform');
var wrong = document.getElementById('wronginput');

form.addEventListener('submit', check);

employees = (JSON.parse(localStorage.getItem('employees')));

function Employee(name, id) {
  this.name = name;
  this.id = id;
  this.onTheClock = false;
  this.profilePic = '';
  this.phoneNumber = '';
  this.email = '';
}

if(document.getElementById('loginform')) {
  if(!localStorage.getItem('employees') || localStorage.getItem('employees').length === 0) { // if localstorage employees doesnt exist, or it is length 0, add the admin account at id 1000
    var admin = new Employee('admin', 1000);
    var employees = [];
    getAndSetLocalStorage(employees, admin);
  }
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

function check(event){
  event.preventDefault();
  localStorage.thisEmployee = '';
  var employee = '';
  for(var i = 0; i < employees.length; i++) {
    if(employees[i].name === event.target.userid.value && employees[i].id == event.target.pswrd.value) {
      employee = employees[i];
    }
  }
  if(employee === ''){
    wrong.innerHTML = 'Not a valid username and/or password.';
  } else if (employee.id === 1000) {
    localStorage.thisEmployee = (JSON.stringify(employee));
    document.location.href='admin.html';
  }
  else {
    localStorage.thisEmployee = (JSON.stringify(employee));
    document.location.href='employee.html';
  }
}
