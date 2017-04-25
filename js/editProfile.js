'use strict';

var form = document.getElementById('profile-form');
form.addEventListener('submit', updateProfile);

function populateTextBoxes() {
  try {
    var employee = JSON.parse(localStorage.getItem('thisEmployee'));

    var profilePicText = document.getElementById('profilePic');
    var phoneNumberText = document.getElementById('phoneNumber');
    var emailText = document.getElementById('email');

    profilePicText.textContent = employee.profilePic;
    phoneNumberText.textContent = employee.phoneNumber;
    emailText.textContent = employee.email;
  } catch(error) {
    console.log(error);
  }
}

function updateProfile(event) {
  event.preventDefault();

  var phoneNumber = event.target.phoneNumber.value;
  var email = event.target.email.value;

  try {
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
    form.clear();
    alert('Your information has been saved.');
    document.location.href = 'employee.html';
  } catch(error) {
    console.log(error);
  }
}

if(form) {
  populateTextBoxes();
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
