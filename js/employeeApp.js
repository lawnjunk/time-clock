'use strict';

var employee;
var employees;
var clockInForm = document.getElementById('clock-in');
var clockOutForm = document.getElementById('clock-out');
var hamburgerNav = document.getElementById('hamburger-nav');
var hamburgerIcon = document.getElementById('hamburger-icon');

clockInForm.addEventListener('submit', clockIn);
clockOutForm.addEventListener('submit', clockOut);
hamburgerIcon.addEventListener('click', function(){
  if(hamburgerNav.className == 'hamburger-nav hidden'){
    hamburgerNav.className = 'hamburger-nav';
  } else{
    hamburgerNav.className = 'hamburger-nav hidden';
  }
});

var image = document.getElementById('img');
employee = JSON.parse(localStorage.getItem('thisEmployee'));
image.setAttribute('src', employee.profilePic);

var phoneNumber = document.getElementById('phoneNumber');
var email = document.getElementById('email');

phoneNumber.textContent = employee.phoneNumber;
email.textContent = employee.email;

var logOutButton = document.getElementById('logOut');
logOutButton.addEventListener('click', logOut);


function clockIn(event) {
  event.preventDefault();

  employee = JSON.parse(localStorage.getItem('thisEmployee'));
  employees = JSON.parse(localStorage.getItem('employees'));
  employee.onTheClock = true;
  for(var i = 0; i < employees.length; i++) {
    if(employees[i].id === employee.id) {
      employees[i] = employee;
    }
  }
  localStorage.setItem('thisEmployee', JSON.stringify(employee));
  localStorage.setItem('employees', JSON.stringify(employees));
}

function clockOut(event) {
  event.preventDefault();

  employee = JSON.parse(localStorage.getItem('thisEmployee'));
  employees = JSON.parse(localStorage.getItem('employees'));

  employee.onTheClock = false;

  for(var i = 0; i < employees.length; i++) {
    if(employees[i].id === employee.id) {
      employees[i] = employee;
    }
  }
  localStorage.setItem('thisEmployee', JSON.stringify(employee));
  localStorage.setItem('employees', JSON.stringify(employees));
}

function logOut() {
  localStorage.setItem('thisEmployee', '');
  document.location.href = 'index.html';
}
