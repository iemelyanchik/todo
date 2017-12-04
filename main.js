let todos = [];

function Todo(name) {
    this.name = name;
    this.completed = false;
}

function addNewTodo(name) {
    let t = new Todo(name);
    todos.push(t);
    saveTodos();
}

function removeTodo(index) {
    todos.splice(index, 1);
    saveTodos();
}

function getTodoAtIndex(index) {
    return todos[index];
}

function saveTodos() {
    let str = JSON.stringify(todos);
    localStorage.setItem("todos", str);
}

function getTodos() {
    let str = localStorage.getItem("todos");
    todos = JSON.parse(str);
    todos.sort(function(a, b) {
        return a.completed - b.completed;
    });
    if(!todos){
        todos = [];
    }
}


getTodos();
listTodos();


function listTodos() {
    let html = "";
    for(let i in todos){
        let todo = todos[i];
        let name = todo.name;
        let completed = todo.completed;
        html+='<li class ='+(completed?"done":"")+  '><div contenteditable="true">' + name + '</div><div><span>'+ (completed?"Done":"WillBeDone") + '</span></div></li>';
    }
    $('#list-todos').html(html);
}

$("#addTodoform").submit(function (e) {
    e.preventDefault();
    name = $('#todoName').val();
    addNewTodo(name);
    getTodos();
    listTodos();
});

function rmvTodo(e) {
    e.stopPropagation();
    let currName = $(this).find('div:first-child').text();
    for(let i=0; i<todos.length; i++){
        if(todos[i].name===currName){
            removeTodo(i);
            $(this).fadeOut(300);
        }
    }
}

function editTodo(e) {
    currName = $(this).text();
    console.log(currName);
    $(this).blur(function (e) {
        nextName = $(this).text();
        for(let i=0; i<todos.length; i++){
            if(todos[i].name===currName){
                todos[i].name = nextName;
                saveTodos();
            }
        }

    });
}

function todoDone(e) {
    e.stopPropagation();
    let currName = $(this).parent('li').find('div:first-child').text();
    for(let i=0; i<todos.length; i++){
        if(todos[i].name===currName){
            todos[i].completed = !todos[i].completed;
            $(this).parent('li').toggleClass("done");
            $(this).parent('li').find('span').text(todos[i].completed?"Done":"WillBeDone");
            saveTodos();
        }
    }
}

$("ul").on('dblclick', 'li', rmvTodo);

$("li").on('focus', 'div:first-child', editTodo);

$("li").on('click', 'div:last-child', todoDone);

















