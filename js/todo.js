const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    delAll = document.querySelector(".js-removeToDo");

const TODOS_LS = 'toDos';

let toDos = [];

function removeShowing(){
    delAll.classList.remove(SHOWING_CN);
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    //모든 아이템을 가지고 함수를 실행시키고, true인 것만 가지고 배열을 만듦
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
    if(toDos.length === 0 ){
        removeShowing();
    }
}

//로컬스토리지에는 자바스크립트의 데이터를 넣을 수 없음. 로컬스토리지는 String만 저장되기때문
//obj를 스트링으로 만들어야함. JSON.stringify은 자바스크립트의 모든 데이터를 스트링으로 만들어줌
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

let idNum = 1;

function removeAllToDo(){
    toDos = [];
    saveToDos();
    removeShowing();
    toDoList.innerText = "";
}

function paintTodo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNum;
    idNum += 1;

    delBtn.addEventListener("click", deleteToDo);

    delAll.classList.add(SHOWING_CN);
    delAll.addEventListener("click", removeAllToDo);

    delBtn.innerText = "❌";
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text : text,
        id : newId
    }

    toDos.push(toDoObj);
    saveToDos();
}

function handleToDoSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value = "";
}

function paintEachToDo(toDo){
    paintTodo(toDo.text);
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        //JSON = javascript object notation. 자바스크립트가 다룰 수 있도록 object로 바꿔주는 기능
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(paintEachToDo);
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleToDoSubmit);
}

init();