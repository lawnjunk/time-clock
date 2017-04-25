'use strict';

var form = document.getElementById('profile-form');
form.addEventListener('submit', updateProfile);

function updateProfile(event) {
  event.preventDefault();

  var profilePic = event.target.profilePic.value;
  var phoneNumber = event.target.phoneNumber.value;
  var email = event.target.email.value;

  var employee = JSON.parse(localStorage.getItem('thisEmployee'));
  var employees = JSON.parse(localStorage.getItem('employees'));

  employee.profilePic = profilePic;
  employee.phoneNumber = phoneNumber;
  employee.email = email;

  for(var i = 0; i < employees.length; i++) {
    if(employees[i].id === employee.id) {
      employees[i] = employee;
    }
  }

  localStorage.setItem('thisEmployee', JSON.stringify(employee));
  localStorage.setItem('employees', JSON.stringify(employees));
}
