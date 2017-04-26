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
