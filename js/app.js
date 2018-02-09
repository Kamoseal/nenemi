var provider = new firebase.auth.GoogleAuthProvider();
//login
$("#login").click(function() {
 firebase.auth()
   .signInWithPopup(provider)
   .then(function(result){
     var token = result.credential.accesToken;
     var usuario = result.user;
     console.log(result);
     console.log(usuario);
     // var foto = $("#photo").append("<img src='"+result.user.photoURL+"' />")
     guardaDatos(usuario);

     localStorage.setItem('usuario', JSON.stringify(usuario))
     window.location.href = '../views/profile.html';


   }).catch(function(error){
     console.log(error);
     var errorCode = error.code;
      console.log(errorCode);
      var errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      var email = error.email;
      console.log(email);
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(credential);
   });

});

//Guardar datos automaticamente
function guardaDatos (user){
 var usuario = {
   uid:user.uid,
   nombre:user.displayName,
   email:user.email,
   foto:user.photoURL
 };
 firebase.database().ref("nenemi/" + user.uid)
 .set(usuario)
};


//leyendo de la base de guardaDatos
firebase.database().ref("nenemi")
.on("child_added", function(s){
 var user = s.val();

});

var photo = document.getElementById('upload');
var storageRef;
var img;
var result = document.getElementById('uploadPhoto');


function start() {
photo.addEventListener('change', uploadimg, false);
 // referencia a la raiz de storage
 storageRef = firebase.storage().ref();
 // referecia a la base de datos
 img = firebase.database().ref().child("images");
 showImages();
};
start();

function showImages(){
 img.on("value",function(snapshot){
    var datos = snapshot.val();
    for(var key in datos){
     var dataUrl = datos[key].url;
   };
    result.innerHTML = "<img width='200px' src = '"+ dataUrl +"' />"
 });
};

function uploadimg() {
 var imgUp = photo.files[0];
 var uploadTask = storageRef.child('images/' + imgUp.name).put(imgUp);
 // document.getElementById('progress').className = ' ';
 uploadTask.on('state_changed', function(snapshot){
 // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
 // se necesita id de la barra de progreso
 // document.getElementById('id').style.width = progress + "%";
}, function(error) {
 // Gestionar el error
  alert('error');
}, function() {
 // Cuando se hasubido exitosamente
 var downloadURL = uploadTask.snapshot.downloadURL;
 // Crear nodo en base de datos firebaseio
 alert('foto subida con exito');
 crearNodoEnBDfirebase(imgUp.name, downloadURL);
 // document.getElementById('progress').className = hide;
});
};

function crearNodoEnBDfirebase(uploadTask, downloadURL){
 img.push({ nombre:uploadTask, url:downloadURL})
};

// Hacer posts
var $textarea = $('#textarea1');
var $btn = $("#addPublish");

$(document).ready(function() {
  $btn.click(publish);
});

var publish = function(e) {
  e.preventDefault();
  var $text = $('#textarea1').val();
  paintPublish($text);
};

var paintPublish = function($text) {
  var $container = $('<div class="row"> </div>');
  var $div = $('<div class="col s4 col m6 col l12 center published"></div>');
  var $p = $("<p id='text'></p>");

  $p.text($text);
  $container.append($div);
  $container.append($p);
  $("#print").prepend($container);

  $("#textarea1").val('');
};


  var divMapa = document.getElementById("map");
navigator.geolocation.getCurrentPosition(fn_ok, fn_mal);
function fn_mal( ) { }
function fn_ok (rta){
  var lat = rta.coords.latitude;
  var lon = rta.coords.longitude;

  var gLatLon = new google.maps.LatLng(lat, lon);
  var objConfig = {
    zoom:18,
    center: gLatLon
    }

  var gMapa = new google.maps.Map(divMapa, objConfig);
  var objConfigMarker = {
    position: gLatLon,
    map: gMapa
  }
  var gMarker = new google.maps.Marker(objConfigMarker);
}

$(function() {
/*Define some constants */
const ARTICLE_TITLE =  document.title;
const ARTICLE_URL = encodeURIComponent(window.location.href);
const MAIN_IMAGE_URL = encodeURIComponent($('meta[property="og:image"]').attr('content'));

$('.share-twitter').click(function(){
  open_window('http://twitter.com/share?url='+ARTICLE_URL, 'twitter_share');
});

$('.share-google-plus').click(function(){
  open_window('https://plus.google.com/share?url='+ARTICLE_URL, 'google_share');
});

function open_window(url, name){
  window.open(url, name, 'height=320, width=640, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, directories=no, status=no');
}
});
