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

user_name = localStorage.getItem("user_name")
document.getElementById("user_name").innerHTML = "Welcome  " + user_name + " ! ";

function addRoom()
  {
    room_name = document.getElementById("room_name").value;
  
    firebase.database().ref("/").child(room_name).update({
      purpose : "adding room name"
    });
  
      localStorage.setItem("room_name", room_name);
      
      window.location = "chat_page.html";
  } 

function getData() {firebase.database().ref("/").on('value', 
function(snapshot) {document.getElementById("output").innerHTML = "";
snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
Room_names = childKey;

console.log("Room Name - " + Room_names);
row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
document.getElementById("output").innerHTML += row;

});});}
getData();

function redirectToRoomName(name)
  {
    console.log(name);
    localStorage.setItem("room_name", name);
      window.location = "chat_page.html";
  }

  function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}