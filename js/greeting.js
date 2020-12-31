//querySelectorAll은 array로 전 요소를 가져옴. querySelector은 첫번째 요소를 가져옴
// 로컬스토리지 : 작은 정보를 컴퓨터에 저장하는 방법임
// 검증화면에 Application 탭에 LocalStorage에 무언가 저장되어 있는 것을 확인할 수 있음
// 자바스크립트 정보들을 저장하는것 -> 사람이름을 저장할거임
// 로컬스토리지에 저장된것은 리프레시 해도 사라지지 않음

const form = document.querySelector(".js-form"),
    nameInput = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings"),
    greetingDisplay = document.querySelector(".greeting-display"),
    changeBtn = document.querySelector(".js-changeName");

const USER_LS = "currentUser",
    SHOWING_CN = "showing",
    SHOW_FLEX_CN = "show-flex";

function handleSubmit(event){
    event.preventDefault();
    console.log("aa");
    const greetingUserName = nameInput.value;
    paintGreeting(greetingUserName);
    saveNames(greetingUserName);
}

function saveNames(userName){
    localStorage.setItem(USER_LS, userName);
}

function removeName(event){
    localStorage.removeItem(USER_LS);
    changeBtn.classList.remove(SHOWING_CN);
    greeting.innerHTML = "";
    loadName();
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greetingDisplay.classList.add(SHOW_FLEX_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Hello ${text}`;
    changeBtn.classList.add(SHOWING_CN);
    changeBtn.addEventListener("click", removeName);
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);

    if(currentUser === null){
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();