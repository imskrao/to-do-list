let listArray = ['Drink cup of herbal tea','Meet up with friends', 'Watch Netflix ', 'Get in bed'];
const list = document.querySelector('#list');
const addListBtn = document.querySelector('.add-list');
const msg = document.querySelector('#msg');
const msgCloseBtn = document.querySelector('#close-btn');

// function for updating list
const updateList = () => {
    let listHTML = '';
    listArray.map((item, i) => {
        listHTML += `<div class="item item-${i+1} d-flex justify-content-between align-items-center bg-dark p-2 my-2 text-white rounded">
            <p class="info m-0"> ${item} </p>
            <div class="action">
                <button class="btn btn-warning edit-todo"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button class="btn btn-danger delete-todo"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
            </div>
        </div>`;
    });
    list.innerHTML = listHTML;

    // delete item
    document.querySelectorAll('.delete-todo').forEach((element, i) => {
        element.addEventListener('click', () => {
            listArray.splice(i, 1);
            updateList();
        });
    });

    // Edit Item
    document.querySelectorAll('.edit-todo').forEach((element, i) => {
        element.addEventListener('click', ()=> {
            document.querySelector('#InputTodo').value = listArray[i];
            listArray.splice(i, 1);
            addListBtn.innerHTML = "Update";
        })
    })
}
updateList();

// show Error at adding to do list
const showError = status => {
    msg.classList.add('m-3')
    msgCloseBtn.classList.remove('d-none');
    switch(status) {
        case 'empty':
            msg.innerHTML = "Input box is empty!";
        break;
        case 'exist':
            msg.innerHTML = "Already Exist!";
        break;
    }
}

msgCloseBtn.addEventListener('click', () => {
    msg.innerHTML = '';
    msg.classList.remove('m-3')
    msgCloseBtn.classList.add('d-none');
})

addListBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let inputTodo = document.querySelector('#InputTodo').value;
    if(inputTodo.trim() === '') {
        showError('empty');
    } else if (listArray.includes(inputTodo)) {
        showError('exist');
    } else {
        listArray.push(inputTodo);
        updateList();
        addListBtn.innerHTML = 'Update' ? addListBtn.innerHTML = 'Add' : null;
    }
});