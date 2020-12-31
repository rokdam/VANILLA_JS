const body = document.querySelector("body"),
    imageForm = document.querySelector(".js-image"),
    imageInput = imageForm.querySelector("input");

const IMG_NUMBERS = 3;

function changeBg(event){
    event.preventDefault();
    const changedSrc = imageInput.value;
    localStorage.setItem("bgItem", changedSrc);
    imageInput.value = "";
    document.querySelector(".bgImage").remove();
    paintImage(changedSrc);
}

function paintImage(src){
    const img = new Image();
    img.src = src;
    img.classList.add("bgImage");
    body.prepend(img);
}

//math란 모듈로 간단히 랜덤숫자를 생성할 수 있음 Math.random();
//Math.random()*5; 로 1~5까지의 랜덤숫자 생성가능
//Math.floor()은 버림. Math.ceil()은 올림
function getRandom(){
    const number = Math.floor(Math.random()*IMG_NUMBERS);
    return number;
}

function init(){
    const randomNumber = getRandom();
    let imgSrc = `images/landscape${randomNumber + 1}.jpg`;

    imageForm.addEventListener("submit", changeBg);

    const savedImg = localStorage.getItem("bgItem");
    if(savedImg !== null){
        imgSrc = savedImg;
    }
    
    paintImage(imgSrc);
}

init();