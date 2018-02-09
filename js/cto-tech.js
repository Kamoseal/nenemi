// Se necesita un checkbox con el id

// Se crea un html que luego tienen que borar solo para basarme como se debe dar check

// Se comienza funcionalidad junto con el cofigo de la api que Karla me paso ayer

//  Variables globales para reutilizar en las funciones

// variable para hacer check in en checkbox
var checkIn = document.getElementById('test2');
// Se agrega imagen insignia laboratoria con un hide desde html se  cambia el atributo en este js y se pinta en el profile html
// var prize = document.getElementById("lab");
// console.log(prize);
// variable declarada por karla para mostrar el mapa
var output = document.getElementById("map");

// Funcion de karla de api que le agrega evento o funcionalidad con un onclick desde el html para indicar esta funcion findMe()
function findMe(){
  //Verificar si soporta geolocalizacion
  if (navigator.geolocation){
    alert('Tu navegador soporta Geolocalización');
  }else{
    alert('Tu navegador no soporta Geolocalización');
  };
  //Obtener Latitud y Longitud
  function location (position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    // SE INDICA LA FUNCION PARA HACER DEMO CHECK IN EN LABORATORIA
    checkLab(latitude);

    // PRUEBAS
    // museums(latitude, longitude);
    // place(latitude);
 };

// DEMO LABORATORIA
function checkLab(latitude) {
   if (latitude <= 19.420459 || latitude <= 19.420773) {
     alert("correcto");
     checkIn.click();
     award();
   } else {
     alert('incorrecto');
     checkIn.disabled = true;
     output.style.display = 'none';
     alert('Este no es lugar del circuito')
   };
 };

// PRUEBAS
 // function place(latitude) {
 //
 //    if (latitude >= 19.475975 || latitude <= 19.474958) {
 //      alert("correcto");
 //      checkIn.click();
 //      award();
 //    } else {
 //      alert('incorrecto');
 //      checkIn.disabled = true;
 //      output.style.display = 'none';
 //      alert('Este no es lugar del circuito')
 //    };
 //  };

// PRUEBAS
// function museums(latitude, longitude) {
//     if (latitude >= 19.425518 && longitude <= -99.188489) {
//     alert("correcto");
//     checkIn.click();
//     award();
//   } else {
//     alert('incorecto');
//     checkIn.disabled = true;
//     output.style.display = 'none';
//     alert('Este no es lugar del circuito')
//   };
// };

function award() {
  alert('Ganaste una insignia');

  var firstAward = document.getElementById('prizeLab');

  if (prizeLab.classList.contains("hide")) {
    prizeLab.classList.remove("hide");
    prizeLab.classList.add("show");
  } else {
    prizeLab.classList.remove("show");
    prizeLab.classList.add("hide");
  };
};

function error() {
    output.innerHTML="<p>No se pudo obtener tu ubicación</p>";
  };
  navigator.geolocation.getCurrentPosition(location, error);
};
