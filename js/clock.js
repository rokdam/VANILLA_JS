const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1"); 

const LESS_THAN_NUM = 10;

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    
    clockTitle.innerText = `${hours < LESS_THAN_NUM ? `0${hours}`: hours }:${
        minutes < LESS_THAN_NUM ? `0${minutes}` : minutes
    }:${seconds < LESS_THAN_NUM ? `0${seconds}`:seconds }`;
}

function init(){
    getTime();
    setInterval(getTime, 1000);
}

init();