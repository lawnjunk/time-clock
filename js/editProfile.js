'use strict';

var form = document.getElementById('profile-form');
form.addEventListener('submit', updateProfile);
var pic = document.getElementById('image-form');
pic.addEventListener('submit', changeImage);

var employees;
var employee = JSON.parse(localStorage.getItem('thisEmployee'));
var currentPic = employee.profilePic;

if(currentPic === '') {
  currentPic = 'img/profile.png';
}

if(form) {
  populateTextBoxes();
}

function populateTextBoxes() {
  try {
    var profilePicText = document.getElementById('profilePic');
    var phoneNumberText = document.getElementById('phoneNumber');
    var emailText = document.getElementById('email');
    var profileImage = document.getElementById('profile-img');
    profileImage.setAttribute('src', currentPic);
    profilePicText.value = employee.profilePic;
    phoneNumberText.value = employee.phoneNumber;
    emailText.value = employee.email;
  } catch(error) {
    console.log(error);
  }
}

function updateProfile(event) {
  event.preventDefault();

  var phoneNumber = event.target.phoneNumber.value;
  var email = event.target.email.value;

  try {
    employee = JSON.parse(localStorage.getItem('thisEmployee'));
    employees = JSON.parse(localStorage.getItem('employees'));

    employee.phoneNumber = phoneNumber;
    employee.email = email;

    for(var i = 0; i < employees.length; i++) {
      if(employees[i].id === employee.id) {
        employees[i] = employee;
      }
    }

    localStorage.setItem('thisEmployee', JSON.stringify(employee));
    localStorage.setItem('employees', JSON.stringify(employees));
    form.reset();
    alert('Your information has been saved.');
    document.location.href = 'employee.html';
  } catch(error) {
    console.log(error);
  }
}

function changeImage(event){
  event.preventDefault();

  var profilePic = event.target.profilePic.value;
  if(profilePic === null || profilePic === '') {
    profilePic = 'img/profile.png';
    event.target.profilePic.value = profilePic;
  }

  employees = JSON.parse(localStorage.getItem('employees'));
  employee = JSON.parse(localStorage.getItem('thisEmployee'));

  employee.profilePic = profilePic;

  var image = document.getElementById('profile-img');
  image.setAttribute('src', employee.profilePic);

  for(var i = 0; i < employees.length; i++) {
    if(employees[i].id === employee.id) {
      employees[i] = employee;
    }
  }
  localStorage.setItem('thisEmployee', JSON.stringify(employee));
  localStorage.setItem('employees', JSON.stringify(employees));
}
