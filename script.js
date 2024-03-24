const container = document.querySelector("#container");
let groundSize = 12;
let intervalId;
let spawnCard;
let score = 100;
const scoreDisplay = document.querySelector('#result');
const timeDisplay = document.querySelector('#seconds');
const startEpoch = new Date().getTime();
const endEpoch = startEpoch+60000;
let currentEpoch;

container.addEventListener('click',()=>{
    if(score>0){
        score-=2;
        scoreDisplay.textContent = score;
    }
    else{
        postGameConfig();
    }
});

function initializePlayground(){
    for(let i=0;i<groundSize;i++)
    {
        const card = document.createElement('img');
        card.setAttribute('src','images/white.png');
        card.setAttribute('data-id',i);
        container.appendChild(card);
    }
    intervalId = setInterval(spawnMonster, 1000);
}

function spawnMonster(){
    score--;
    scoreDisplay.textContent = score;
    currentEpoch = new Date().getTime();
    let timeLeft = Math.round((endEpoch - currentEpoch)/1000)
    if(timeLeft<=0)
    {
        postGameConfig();
    }
    timeDisplay.textContent = timeLeft;
    randomIndex = Math.floor(Math.random()*groundSize);
    spawnCard = document.querySelector(`[data-id="${randomIndex}"]`);
    spawnCard.setAttribute('src','images/monster.png');
    spawnCard.addEventListener('click',caught);
    setTimeout(()=>{
        spawnCard.removeEventListener('click',caught);
        spawnCard.setAttribute('src','images/white.png');
    },500);
}

function caught(){
    clearInterval(intervalId);
    setTimeout(printAlert, 500); 
}

function printAlert(){
    spawnCard.setAttribute('src','images/giphy.gif');
    window.alert("Wohoo you have won the game!");
}

function postGameConfig(){
    clearInterval(intervalId);
    window.alert(":( you have lost the game!");
    container.removeEventListener('click');
}

initializePlayground();