<<<<<<< HEAD
'use strict';


function Images (name, filename){
  this.name = name;
  this.src = filename;
}

var Aaron = new Image('Aaron', 'img/Aaron.png');
var Alexis = new Image('Alexis', 'img/Alexis.png');
var Ben = new Image('Ben', 'img/Ben.png');
var Derek = new Image('Derek', 'img/Derek.png');
var Brandy = new Image('Brandy', 'img/Brandy.png');
var Dustin = new Image('Dustin', 'img/Dustin.png');

var imageGroup = [Aaron, Alexis, Ben, Derek, Brandy, Dustin];

function displayImage (){
  for (var i = 0; i < imageGroup.length; i++){
    var imageZero = document.getElementById('photoZero');
    var zero = document.createElement('img');
    zero.setAttribute('src', imageGroup[i].filename);
    photoZero.appendChild(zero);
  }
}
=======
var employeeList = (JSON.parse(localStorage.getItem('employees')));

function removeEmployee(){
  var employeeSelector = document.getElementById('remove-employee');
  var firedButton = document.createElement('input');
  firedButton.setAttribute('type', 'submit');
  firedButton.setAttribute('value', 'Fired');
  var selectRemove = document.createElement('select');
  employeeSelector.appendChild(selectRemove);
  selectRemove.setAttribute('id', 'removeSelector');
  employeeSelector.appendChild(firedButton);
  for(var i = 0; i < employeeList.length; i++) {
    var removeOption = document.createElement('option');
    removeOption.setAttribute('value', employeeList[i].name);
    removeOption.textContent = employeeList[i].name;
    selectRemove.appendChild(removeOption);
  }
  employeeSelector.addEventListener('submit', terminatedWithPrejudice);
}


function terminatedWithPrejudice(event){
  event.preventDefault();

  var terminated = event.target.removeSelector.value;

  for(var i = 0; i < employeeList.length; i++){
    if(employeeList[i].name === terminated) {
      employeeList = employeeList.splice(i, 1);
    }
  }
}

removeEmployee();


if employee list I matches terminated then fire/splice his ass
>>>>>>> ccdc017d7a4a3445eefd3d3f70aa4152da815e86
