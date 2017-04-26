'use strict';
var login = document.getElementById('login');

var button = document.getElementById('button');

var username = document.getElementById('userid');
var password = document.getElementById('pswrd');
var form = document.getElementById('loginform');
var employees = (JSON.parse(localStorage.getItem('employees')));
var wrong = document.getElementById('wronginput');

function check(event){
  event.preventDefault();
  localStorage.thisEmployee = '';
  var employee = '';
  for(var i = 0; i < employees.length; i++) {

    if(employees[i].name === event.target.userid.value && employees[i].id == event.target.pswrd.value) {
      employee = employees[i];
    }
    console.log(event.target.pswrd.value)
  }
  if(employee === ''){
    wrong.innerHTML = 'Not a valid username and/or password.'
  }
  else {
    localStorage.thisEmployee = (JSON.stringify(employee));
    document.location.href='employee.html'
  }

}
form.addEventListener('submit', check);
