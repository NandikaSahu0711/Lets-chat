// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAroCHYnLpPyJ8FO6oyPKgDUP3obSOEZU0",
    authDomain: "let-s-chat-a8bbe.firebaseapp.com",
    databaseURL: "https://let-s-chat-a8bbe-default-rtdb.firebaseio.com",
    projectId: "let-s-chat-a8bbe",
    storageBucket: "let-s-chat-a8bbe.appspot.com",
    messagingSenderId: "355461890291",
    appId: "1:355461890291:web:daeef3623703a3896ff786",
    measurementId: "G-ZZN65WRCQ9"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);

like = message_data['like'];
message = message_data['message'];
name = message_data['name'];

name_with_tag = "<h4>"+ name + "<img src='tick.png' class='user_tick'> </h4>";
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+like +"</span><button><hr>";

row = name_with_tag + message_with_tag + like_button + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
 } });  }); }
getData();

function updateLike(message_id){
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes =document.getElementById(button_id).value;
    update_likes = Number(likes) + 1;
    console.log(update_likes);
    
    firebase.database().ref(room_name).child(message_id).update({
          like : update_likes
    });
    }

function send(){
        msg = document.getElementById("message").value;
        firebase.database().ref(room_name).push({
              name:user_name,
              message:msg,
              like:0
        });
  
        document.getElementById("message").value = "";
  }

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}