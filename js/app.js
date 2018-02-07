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
      guardaDatos(usuario);

      window.location(profile.html)


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
  $("#root").append("<img width='100px' src='"+user.foto+"' />");
});
