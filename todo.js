firebase.auth().onAuthStateChanged(user => {
        if (user) {
            findTodos(user);

        } else {
            window.location.href = "index.html";
        }
    }
);


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



//function que  faz um forEach nos todos e use o form-group para criar os todos

function findTodos(user){
    firebase.firestore()
        .collection('Todos')
        .where('user.uid', '==', user.uid)
        .orderBy('checked')
        .get()
        .then(snapshot => {
                const todos = snapshot.docs.map(doc => doc.data());
                addTodosToScreen(todos);
            })
        .catch(error => {
            console.log(error);
            alert('Erro ao buscar todos');
        });
}

function addTodosToScreen(todos){
    const orderedList = document.querySelector('.wrp-list-todos');

    todos.forEach(todo => {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';

        const label = document.createElement('label');
        label.innerText = todo.todo;
        label.className = 'label';
        label.setAttribute('for', todo.id);
        formGroup.appendChild(checkbox);
        formGroup.appendChild(label);

        orderedList.appendChild(formGroup);

        formGroup.addEventListener('click', () => {
            findTodosByUid(todo.id);
        } );
    });
}

//criando função que salva os todos no firebase
function saveTodo(){
    const todo = createTodo();
        save(todo);
}

function createTodo(){
    return {
        todo: document.querySelector('#novaTarefa').value,
        checked: false,
        indexTodo: indexTodo(index),
        user: {
            uid: firebase.auth().currentUser.uid,
        }
    }
}

function save(todo) {
    firebase.firestore()
        .collection('Todos')
        .add(todo)
        .then(() => {
            alert('Tarefa salva com sucesso');
            closeModal();
            reloadTodos();
        })
        .catch(error => {

            console.log(error);
            alert('Erro ao salvar tarefa');
        }   );
}

function update(todo) {
    firebase.firestore()
        .collection('Todos')
        .doc(getTodoUid())
        .update(todo)
        .then(() => {
            alert('Tarefa atualizada com sucesso');
            closeModal();
            reloadTodos();
        }).catch(error => {
            console.log(error);
            alert('Erro ao atualizar tarefa');
        }   );
}

function reloadTodos() {
    const orderedList = document.querySelector('.wrp-list-todos');
    orderedList.innerHTML = '';
    document.querySelector('#novaTarefa').value = '';
    findTodos(firebase.auth().currentUser);
}

function indexTodo() {
    firebase.firestore()
        .collection('Todos')
        .get()
        .then(snapshot => {
            const todos = snapshot.docs.map(doc => doc.data());
            let index = todos.length;
        } )
}