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


window.onload = start;

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

function showImages(){
 img.on("value",function(snapshot){
    var datos = snapshot.val();
    for(var key in datos){
     var dataUrl = datos[key].url;

     // var result = "<img width='200px'  + datos[key].url />";
   };
    result.innerHTML = "<img width='200px' src = '"+ dataUrl +"' />"


    // document.getElementById('uploadPhoto').innerHTML = result;
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
 console.log(downloadURL);
 // Crear nodo en base de datos firebaseio
 alert('foto subida con exito');
 crearNodoEnBDfirebase(imagenASubir.name, downloadURL);
 // document.getElementById('progress').className = hide;
});
};

function crearNodoEnBDfirebase(uploadTask, downloadURL){
 imagenes.push({ nombre:uploadTask, url:downloadURL})
};

};
