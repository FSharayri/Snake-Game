
//initial boilerplate for the game, this will be modified as the game is being built.
//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player pressing a button with a `buttonPressHandle` function.

//7) Create Reset functionality.



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
const textEl = document.querySelector('h2')
const sqrEls = document.querySelectorAll('.sqr')
const bodyEl = document.querySelector('body')
const restartEl = document.querySelector('#restart')
let snakeInitialPos = Math.round(boardSize/2 -boardlength*0.25)


/*-------------------------------- Constants --------------------------------*/

const initialPosition = [snakeInitialPos,snakeInitialPos+1,snakeInitialPos+2,snakeInitialPos+3]

/*---------------------------- Variables (state) ----------------------------*/
let playerScore = 0
let speed = 300
let timeInterval = setInterval(startTime, 1000 - speed)
let walls =[]
let appleOnBoard = false
let snakeEatsApple = false
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
    },
    move(){
        // console.log(snake.headPosition)
        if (this.direction ==='l'){
            if (walls.includes(this.headPosition-1) || this.tailPosition.includes(this.headPosition-1)) {   
                lose() 
            }
            else {
                this.tailPosition.unshift(this.headPosition)
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

function startTime(){
    if (! appleOnBoard) renderApple() 
    snake.move()
    renderSnake()
    snakeEatsApple = snake.headPosition === appleLocation
    if (snakeEatsApple){
        playerScore++
        sqrEls[appleLocation].style.backgroundColor = ''
        appleOnBoard = false
        snake.grow()
        snake.grow()
    }

    scoreEl.textContent = `Score: ${playerScore}`
}

function renderSnake(){
    sqrEls[appleLocation].style.backgroundImage="url('../assets/images/apple.png')"
    snake.tailPosition.forEach(piece=> sqrEls[piece].style.backgroundImage= "url('../assets/images/skin.png')")
    sqrEls[snake.headPosition].style.backgroundImage="url('../assets/images/snake head.png')"
    rotateHead(snake.direction)
}

function handleKeyDown(key){
    if (key.key ==='ArrowUp' && snake.direction!=='d' )
        snake.direction='u'
    if (key.key ==='ArrowDown' && snake.direction!=='u')
        snake.direction='d'
    if (key.key ==='ArrowLeft' && snake.direction!=='r')
        snake.direction='l'
    if (key.key ==='ArrowRight' && snake.direction!=='l')
        snake.direction='r'  
}

function lose(){
    clearInterval(timeInterval)
    textEl.textContent = 'GAME OVER'
    textEl.className ='animate__animated animate__bounce'
    sqrEls.forEach(sqrEl=>{if (parseInt(sqrEl.id)=== snake.headPosition) sqrEl.style.backgroundImage= "url('../assets/images/snakeHeadLost.png')"})
}

function rotateHead(dir){
    if (dir === 'u') sqrEls[snake.headPosition].style.transform = 'rotate(0deg)'
    if (dir === 'd') sqrEls[snake.headPosition].style.transform = 'rotate(180deg)'
    if (dir === 'l') sqrEls[snake.headPosition].style.transform = 'rotate(-90deg)'
    if (dir === 'r') sqrEls[snake.headPosition].style.transform = 'rotate(90deg)'
}

function init(){
    clearInterval(timeInterval)
    renderApple()
    playerScore = 0
    textEl.textContent ='How Do you Like Them Apples'
    snake.direction = 'l'
    snake.headPosition = initialPosition[0]
    snake.tailPosition = initialPosition.slice(1)
    timeInterval = setInterval(startTime, 1000 - speed)
    console.log(initialPosition)

}
/*----------------------------- Event Listeners -----------------------------*/

sqrEls.forEach(sqr => {if(walls.includes(parseInt(sqr.id))) sqr.style.backgroundColor='black'})
restartEl.addEventListener('click', init)
bodyEl.addEventListener('keydown', handleKeyDown)

