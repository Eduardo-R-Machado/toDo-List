function activeForm(login, register) {
    login = document.querySelector('.wrp-login');
    register = document.querySelector('.wrp-register');
    if(login.style.display == 'none') {
        login.style.display = 'flex';
        register.style.display = 'none';
    } else {
        login.style.display = 'none';
        register.style.display = 'flex';
    }
}


function login() {
    const emailLogin = document.querySelector('#emailLogin').value;
    const passwordLogin = document.querySelector('#passwordLogin').value;
    firebase.auth().signInWithEmailAndPassword(
        emailLogin, passwordLogin
    ).then(() => {
        window.location.href = "todo.html";
    }).catch(error => {
        alert(error.message);
    });
}

function register() {
    const email = document.querySelector('#emailCadastro').value;
    const password = document.querySelector('#passwordCadastro').value;
    if(password !== '') {
        firebase.auth().createUserWithEmailAndPassword(
            email, password
        ).then(() => {
            window.location.href = "todo.html";
        }).catch(error => {

            alert(error.message);
        })
        }
}