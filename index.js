var btnAddTodo = document.getElementById("btn-add-todo");
var todoInput = document.getElementById("todo-input");
var todoList = document.getElementById("todo-list");

function initializeTodoList() {

    var storedList = localStorage.getItem("todoList");
    if (storedList === null) {
        localStorage.setItem("todoList", JSON.stringify([]));
     } 
    else {
      storedList = JSON.parse(storedList);
        for (var i = 0; i < storedList.length; i++) {
            todoList.appendChild(createTodoCard(storedList[i].id, storedList[i].message))
        }
    }
}

initializeTodoList();


function createTodoCard(id, enteredText) {
    // <div class="todo-card">
    //     <i class="fas fa-check"></i>
    //     <p>Todo Item 1</p>
    //     <i class="far fa-trash-alt"></i>
    // </div>
    var mainCard = document.createElement("div");
    mainCard.classList.add("todo-card");
    mainCard.id = "todo" + id;

    var checkBox = document.createElement("i");
    checkBox.classList.add("fas", "fa-check");
    checkBox.id = "checkid" + id;
    mainCard.appendChild(checkBox);

    var todoInfo = document.createElement("p");
    todoInfo.id = "todoText" + id;
    var todoText = document.createTextNode(enteredText);


    var binBox = document.createElement("i");
    binBox.classList.add("far", "fa-trash-alt");
    todoInfo.appendChild(todoText);
    mainCard.appendChild(todoInfo);
    mainCard.appendChild(binBox);

    checkBox.addEventListener("click", function() {
        var currentText = document.getElementById(todoInfo.id);
        var currentCheck = document.getElementById(checkBox.id);

        // var storedList = JSON.parse(localStorage.getItem("todoList"))
        // var checkBoxBoolean = currentCheck.classList.contains("strike")
        // for(var i=0; i<storedList.length; i++){
        //     if(storedList[i].id === checkBox.id){
        //         if(storedList[i].checked === false){
        //             storedList[i].checked = true
        //         }
        //         else{

        //         }
        //         break;
        //     }
        // }

        currentText.classList.toggle("strike");
        currentCheck.classList.toggle("strike");

    });

    binBox.addEventListener("click", function() {
        var currentCard = document.getElementById(mainCard.id);

        var storedList = JSON.parse(localStorage.getItem("todoList"))
        
        var removeAtPos = -1;
        for(var i=0; i<storedList.length; i++){
            if(storedList[i].id === mainCard.id){
                removeAtPos = i;
                break;
            }
        }
        storedList.splice(removeAtPos, 1)
        localStorage.setItem("todoList", JSON.stringify(storedList));
        currentCard.remove();

    });

    return mainCard;
}

function handleTODOCreation() {
    var enteredText = todoInput.value;
    if (enteredText !== "" && enteredText !== null) {
        var todoCard = createTodoCard(new Date().getTime(), todoInput.value)
        todoList.appendChild(todoCard)

        var todoData = {
            id: todoCard.id,
            message: todoInput.value,
            checked: false
        };

        var storedList = JSON.parse(localStorage.getItem("todoList")) //parsing the stored Array
        storedList.push(todoData) //adding new object to stored array
        //console.log(storedList)
        localStorage.setItem("todoList", JSON.stringify(storedList));
        //console.log(localStorage)
        todoInput.value = "";
    } else {
        alert("Please enter a valid TODO item!!");
    }
}

btnAddTodo.addEventListener("click", function() {
    handleTODOCreation();
});

todoInput.addEventListener("keyup", function(e) {
    if (e.which === 13) {
        handleTODOCreation();
    }
});