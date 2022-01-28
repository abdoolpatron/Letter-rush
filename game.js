let upperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let lowerCase = [];
let captionList = ['AWESOME', 'GREAT', 'FANTASTIC', 'COOL'];
let captionColour = ['aqua', 'lime', 'orange', 'gold', 'magenta'];
let progressScore = 0;  
let index = 4;

for (i = 0; i < upperCase.length; i++) {
    let low = upperCase[i].toLowerCase();
    lowerCase.push(low);
}

const keyCode = document.getElementById('key-code');
const keyDisplay = document.getElementById('key-display');
const testbutton = document.getElementById('test');
const caption = document.getElementById('caption');
const mainMenu = document.getElementById('main-menu')
const gameArea = document.getElementById('game-area');
const progressBar = document.getElementById('pbar');
const timeBar = document.getElementById('tbar');
const message = document.getElementById('message');
const score = document.getElementById('success-fail');
const replay = document.getElementById('replay'); 
const goToMenu = document.getElementById('menu');
const highScore = document.getElementById('highscore');
const newBest = document.getElementById('new');
var assign = localStorage.getItem('high score ' +(sessionStorage.getItem('id')));
var time;
var game;

//Set high score
sessionStorage.setItem('score', 0)
localStorage.setItem('high score ' +(sessionStorage.getItem('id')), assign++);
caption.style.display = 'none';




// time up function with dificulty number set as duration

function timeUp() {
    time = setInterval(function() {
        failure();
    }, sessionStorage.getItem('speed'));
}


function displayLetter() {
    keyDisplay.style.display = 'block';
    let digitLetter = Math.floor(Math.random()* 25);
    keyCode.textContent = lowerCase[digitLetter];
    caption.textContent = '';
    caption.style.display = 'block';
    timeBar.style.display = 'block';
    timeBar.style.animation = 'time ' + (sessionStorage.getItem('speed') / 1000) + 's';
    timeUp();
}

// change letters randomly
function changeCaption() {
    let digitCaption = Math.floor(Math.random() * 4);
    let digitColor = Math.floor(Math.random() * 5);
    caption.textContent = captionList[digitCaption];
    caption.style.color = captionColour[digitColor];
}


function failure() {
        keyDisplay.style.backgroundColor = 'red';
        message.style.display = 'block';
        gameArea.style.animation = 'failure 1s';
        score.textContent = sessionStorage.getItem('score');
        highScore.textContent = localStorage.getItem('high score ' +(sessionStorage.getItem('id')));
        replay.textContent = 'Try again';
        clearInterval(game);
        index = 4;
}

// gameplay
const power = () => document.addEventListener('keyup', e => {
    if (e.key === keyCode.textContent && keyDisplay.style.backgroundColor != 'red' && keyDisplay.style.display == 'block') {
        changeCaption();
        keyDisplay.style.display = 'none';
        score.textContent = progressScore+=1;
        sessionStorage.setItem('score', score.textContent);
        timeBar.style.display = 'none';
        clearInterval(time);

        if (sessionStorage.getItem('score') > assign) {
            localStorage.setItem('high score ' +(sessionStorage.getItem('id')), assign+=1);
            newBest.style.display = 'inline';
        }
        if (sessionStorage.getItem('score') == assign) {
            localStorage.setItem('high score ' +(sessionStorage.getItem('id')), JSON.parse(assign));
            newBest.style.display = 'inline';
        }
    }

    else if (e.key === keyCode.textContent && keyDisplay.style.display == 'none') {
        return false;
    }

    else {
        failure();
        return false;
    }
})




// countdown before game starts
function countDown() {
    caption.textContent = index-=1;
    caption.style.display = 'block';
    if (caption.textContent === '0') {
        caption.textContent = 'GO!';
        clearInterval(count);
        game = setInterval(displayLetter, sessionStorage.getItem('speed'));
        power();
    }
}

var count;

count = setInterval(countDown, 900);

replay.addEventListener('click', function() {
  location.reload();
})


goToMenu.addEventListener('click', function() {
    window.open('index.html');
    window.close('game.html');
})