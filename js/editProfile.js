'use strict';

var form = document.getElementById('profile-form');
form.addEventListener('submit', updateProfile);

function updateProfile(event) {
  event.preventDefault();

  var phoneNumber = event.target.phoneNumber.value;
  var email = event.target.email.value;

  var employee = JSON.parse(localStorage.getItem('thisEmployee'));
  var employees = JSON.parse(localStorage.getItem('employees'));

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

var pic = document.getElementById('image-form');
pic.addEventListener('submit', changeImage);
// localStorage.setItem('thisEmployee', JSON.stringify({profilePic:'dfsfs'}));
console.log(pic);
function changeImage(event){
  event.preventDefault();

  var profilePic = event.target.profilePic.value;
  console.log(profilePic);

  var employees = JSON.parse(localStorage.getItem('employees'));
  var employee = JSON.parse(localStorage.getItem('thisEmployee'));

  employee.profilePic = profilePic;

  var image = document.getElementById('img');
  image.setAttribute('src', employee.profilePic);

  for(var i = 0; i < employees.length; i++) {
    if(employees[i].id === employee.id) {
      employees[i] = employee;
    }
  }
  localStorage.setItem('thisEmployee', JSON.stringify(employee));
  localStorage.setItem('employees', JSON.stringify(employees));

}
