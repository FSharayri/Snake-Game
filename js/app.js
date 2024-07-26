// creating a board with dynamic length 
let boardlength = 20
let boardWidthCss= 100/boardlength
let boardSize = boardlength**2
// setting a css variable to the specified length 
let r = document.querySelector(':root');
let rs = getComputedStyle(r);
r.style.setProperty('--boardWidth', `${boardWidthCss}%`);
/*------------------------ Cached Element References ------------------------*/
// creating board squares
const boardEl = document.querySelector('#board')
for(let i =0; i<boardSize;i++){
    let div= document.createElement(`div`)
    div.className = "sqr"
    div.id = `${i}`
    boardEl.appendChild(div)
}
const scoreEl = document.querySelector('#current-score')
const textEl = document.querySelector('#message')
const sqrEls = document.querySelectorAll('.sqr')
const bodyEl = document.querySelector('body')
const restartEl = document.querySelector('#restart')
const levelUpMessageEl = document.querySelector('#level-up-message')
let snakeInitialPos = Math.round(boardSize/2 -boardlength*0.25)

/*-------------------------------- Constants --------------------------------*/

const initialPosition = [snakeInitialPos,snakeInitialPos+1,snakeInitialPos+2,snakeInitialPos+3]
// sound effects 
const gameOverSound = new Audio('./assets/sounds/game over.wav')
const eatSound = new Audio('./assets/sounds/eat.wav')
const startGameSound = new Audio('./assets/sounds/start game.ogg')
const levelUpSound = new Audio('./assets/sounds/level up.wav')


/*---------------------------- Variables (state) ----------------------------*/

let playerScore 
let speed
let timeInterval 

let walls =[]
let appleOnBoard = false
let snakeEatsApple = false
let lost = false

for (let index = 0; index < boardlength; index++) {
    walls.push(index)
    walls.push(index+boardSize-boardlength)
}
for (let index = 0; index <= boardSize; index+=boardlength) {
    walls.push(index,index+boardlength-1)   
}
let appleLocation
let timer = 0
const snake = {
    headPosition :initialPosition[0],  // starting square for the snakes head
     // starting position of snakes body
    tailPosition : initialPosition.slice(1),
    //bodyLength : 1 +this.tailPosition.length, // property to keep track of snakes length as it grows
    direction : 'l', //this is the direction the snake will be moving initialized to left
    // this grow function will be called whenever the snake eats a piece, and it depends on the direction element in the snake object, which will be manipulated later
    grow(){
        this.tailPosition.push(this.tailPosition.at(-1))
        eatSound.play()
    },
    move(){
        if (this.direction ==='l'){
            if (walls.includes(this.headPosition-1) || this.tailPosition.includes(this.headPosition-1)) {   
                lose() 
            }
            else {
                this.tailPosition.unshift(this.headPosition)
                sqrEls[this.tailPosition.at(-1)].style.transform = 'rotate(0deg)'
                sqrEls[this.tailPosition.pop()].style.backgroundImage=''
                this.headPosition-- 
            }
        }
        if (this.direction ==='r') {
            if (walls.includes(this.headPosition+1) || this.tailPosition.includes(this.headPosition+1)) {   
                lose()  
            }
            else {
                this.tailPosition.unshift(this.headPosition)
                sqrEls[this.tailPosition.at(-1)].style.transform = 'rotate(0deg)'
                sqrEls[this.tailPosition.pop()].style.backgroundImage=''
                this.headPosition++
            }
        }
        if (this.direction ==='u'){
            if (walls.includes(this.headPosition-boardlength) || this.tailPosition.includes(this.headPosition-boardlength)) {   
                lose() 
            }
            else {
                this.tailPosition.unshift(this.headPosition)
                sqrEls[this.tailPosition.at(-1)].style.transform = 'rotate(0deg)'
                sqrEls[this.tailPosition.pop()].style.backgroundImage=''
                this.headPosition-=boardlength
            }
        }
        if (this.direction ==='d'){
            if (walls.includes(this.headPosition+boardlength) || this.tailPosition.includes(this.headPosition+boardlength)) {   
                lose() 
            }
            else {
                this.tailPosition.unshift(this.headPosition)
                sqrEls[this.tailPosition.at(-1)].style.transform = 'rotate(0deg)'
                sqrEls[this.tailPosition.pop()].style.backgroundImage=''
                this.headPosition+=boardlength
            }
        }
    }
}

/*-------------------------------- Functions --------------------------------*/

function renderApple(){
    appleLocation = parseInt(Math.random()*400)
    while(walls.includes(appleLocation) || snake.headPosition ===appleLocation || snake.tailPosition.includes(appleLocation)){
        appleLocation = parseInt(Math.random()*400)
    }
    appleOnBoard = true 
}

function levelUp(){
    if (playerScore >34) {
        speed= 940
        clearInterval(timeInterval)
        timeInterval = setInterval(startTime, 1000 - speed)
    }
    else if (playerScore >24) {
        speed= 900
        clearInterval(timeInterval)
        timeInterval = setInterval(startTime, 1000 - speed)
    }
    else if (playerScore >14) {
        speed= 800
        clearInterval(timeInterval)
        timeInterval = setInterval(startTime, 1000 - speed)
    }
    else if (playerScore >6) {
        speed= 650
        clearInterval(timeInterval)
        timeInterval = setInterval(startTime, 1000 - speed)

    }
    
    
}
function checkforEat(){ 
    if (snake.headPosition === appleLocation){
        playerScore++
        sqrEls[appleLocation].style.backgroundColor = ''     
        sqrEls[appleLocation].className = 'sqr'       
        appleOnBoard = false
        snake.grow()
        snake.grow() 
        if (playerScore ===7 ||playerScore ===15||playerScore ===25||playerScore ===35) {
            confetti.start(200)
            levelUpSound.play()
            levelUpMessageEl.style.display = ''
            setTimeout(()=>{levelUpMessageEl.style.display = 'none'},2500)
        }   
    }
}

function updateScore(){
    scoreEl.textContent = `Score: ${playerScore}`
    
}

function startTime(){
    levelUp()
    if (! appleOnBoard) renderApple() 
    snake.move()
    renderSnakeApple()
    checkforEat()
    updateScore()
}

function renderSnakeApple(){
    sqrEls[appleLocation].className ='sqr animate__animated animate__fadeIn'
    sqrEls[appleLocation].style.backgroundImage="url('./assets/images/apple.png')"
    snake.tailPosition.forEach(piece=> sqrEls[piece].style.backgroundImage= "url('./assets/images/skin.png')")
    lost? sqrEls[snake.headPosition].style.backgroundImage="url('./assets/images/lose concept.png')":sqrEls[snake.headPosition].style.backgroundImage="url('./assets/images/head.png')"
    rotateHead(snake.direction)
}

function handleKeyDown(key){
    if (key.key ==='ArrowUp' && snake.direction!=='d' ){
        snake.direction='u'
    }
    if (key.key ==='ArrowDown' && snake.direction!=='u'){
        snake.direction='d'
    }
    if (key.key ==='ArrowLeft' && snake.direction!=='r'){
        snake.direction='l'
    }
    if (key.key ==='ArrowRight' && snake.direction!=='l'){
        snake.direction='r'  
    }
}

function lose(){
    sqrEls[snake.headPosition].className = 'sqr animate__animated animate__flash'
    clearInterval(timeInterval)
    textEl.textContent = 'GAME OVER'
    textEl.className ='animate__animated animate__bounce' 
    gameOverSound.play()
    lost = true
    
}

function rotateHead(dir){
    if (dir === 'u') sqrEls[snake.headPosition].style.transform = 'rotate(0deg)'
    else if (dir === 'd') sqrEls[snake.headPosition].style.transform = 'rotate(180deg)'
    else if (dir === 'l') sqrEls[snake.headPosition].style.transform = 'rotate(-90deg)'
    else if (dir === 'r') sqrEls[snake.headPosition].style.transform = 'rotate(90deg)'
}

function init(){     
    sqrEls.forEach(sqr=> {
        sqr.style.backgroundImage=''
        sqr.className = 'sqr'
        sqr.style.transform = 'rotate(0deg)'
    })
    clearInterval(timeInterval)
    renderApple()
    playerScore = 0 
    lost = false 
    speed = 500
    textEl.textContent ='Eat the Apples'
    startGameSound.play()
    textEl.className='animate__animated animate__flash'
    snake.direction = 'l'
    snake.headPosition = initialPosition[0]
    snake.tailPosition = initialPosition.slice(1)
    timeInterval = setInterval(startTime, 1000 - speed)
    restartEl.textContent = 'Restart'
}

/*----------------------------- Event Listeners -----------------------------*/

sqrEls.forEach(sqr => {if(walls.includes(parseInt(sqr.id))) sqr.style.backgroundColor='black'})
restartEl.addEventListener('click', init)
bodyEl.addEventListener('keydown', handleKeyDown)