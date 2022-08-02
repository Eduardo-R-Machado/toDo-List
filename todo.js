
function openModal(){
    openModal2();
    setTimeout(() => {
        document.querySelector('.wrp-modal').style.opacity = '1';
    }, 200);
}

function openModal2(){
    let modal = document.getElementById('modalContent').cloneNode(true);
    document.querySelector('.modalInsert').appendChild(modal);
}

function closeModal(){
    document.querySelector('.wrp-modal').style.opacity = '0';
setTimeout(() => {
    document.querySelector('.wrp-modal').remove();
}, 200);
}

firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "index.html";
    }
  }
);

function findTodos(){
    firebase.firestore()
        .collection('Todos')
        .get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                console.log(doc.data());
            }   )
        }   )
}

findTodos();












