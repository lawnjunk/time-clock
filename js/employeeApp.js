'use strict';

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
