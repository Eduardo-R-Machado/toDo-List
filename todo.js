function openModal(){
    let modal = document.getElementById('modalContent').cloneNode(true);
    document.querySelector('.modalInsert').appendChild(modal);

}

function closeModal(){
    document.querySelector('.modalInsert').innerHTML = '';
}


firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "index.html";
    }
  }
);













