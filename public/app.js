var firebaseConfig = {
   apiKey: "AIzaSyAN0E4m3BnpLGkSmQTIewWL1ls4hL12xG0",
   authDomain: "todo-app-6ccde.firebaseapp.com",
   databaseURL: "https://todo-app-6ccde-default-rtdb.firebaseio.com",
   projectId: "todo-app-6ccde",
   storageBucket: "todo-app-6ccde.appspot.com",
   messagingSenderId: "250251729211",
   appId: "1:250251729211:web:c23e1cc5a0a14bbd843f1e"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

// =========Receiving Data From Database========
firebase.database().ref('todo-Items').on('child_added', function (data) {
   var liElement = document.createElement("li");
   var listText = document.createTextNode(data.val().value);
   liElement.appendChild(listText);
   liElement.setAttribute("class", "list")

   //    ======Delete Button======
   var delbtn = document.createElement("button");
   var delbtnText = document.createTextNode("Delete");
   delbtn.appendChild(delbtnText);
   // Get the unique ID from the Firebase data
   var firebaseId = data.key;
   delbtn.setAttribute("id", firebaseId);
   delbtn.setAttribute("onclick", "del(this)");
   delbtn.setAttribute("class", "btn3")
   liElement.appendChild(delbtn)

   //    =======Edit Button=======
   var editbtn = document.createElement("button");
   var editbtnText = document.createTextNode("Edit");
   editbtn.appendChild(editbtnText);
   editbtn.setAttribute("id", firebaseId);
   editbtn.setAttribute("onclick", "edit(this)");
   editbtn.setAttribute("class", "btn4")
   liElement.appendChild(editbtn);

   //    ======Generate the list on document======
   var ulList = document.getElementById("unorderList");
   ulList.appendChild(liElement);
   input.value = ""
})

// *******************TODO APP CODE*****************
function add() {
   var input = document.getElementById("input");

   //  =======Sending Input to Database======
   var todoObj = {
      value: input.value
   }

   var newItemRef = firebase.database().ref('todo-Items').push(todoObj);
   var firebaseId = newItemRef.key;
}

// ==========Function for Delete All===========
function deleteAll() {
   var ulList = document.getElementById("unorderList");
   firebase.database().ref('todo-Items').remove()
   ulList.innerHTML = ""
}

// ==========Function for Delete one List=========
function del(list) {
   // console.log(list.id);
   firebase.database().ref('todo-Items').child(list.id).remove()
   list.parentNode.remove()
}

// ========Function to Edit the List==========
function edit(Edit) {
   var userInput = prompt("Enter The Text you want to Edit.");
   var editObj = {
      value : userInput
   }
   firebase.database().ref('todo-Items').child(Edit.id).set(editObj)
   Edit.parentNode.firstChild.nodeValue = userInput   
}























