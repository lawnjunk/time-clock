'use strict';

var clockInForm = document.getElementById('check-in');
var clockOutForm = document.getElementsById('check-out');

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
  employee.onTheClock = false;
  localStorage.setItem('thisEmployee', JSON.stringify(employee));
}
