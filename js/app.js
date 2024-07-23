
//initial boilerplate for the game, this will be modified as the game is being built.
//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player pressing a button with a `buttonPressHandle` function.

//7) Create Reset functionality.


/*------------------------ Cached Element References ------------------------*/


const boardEl = document.querySelector('#board')

let r = document.querySelector(':root');
let rs = getComputedStyle(r);

let boardlength = 20
let boardWidthCss= 100/boardlength
r.style.setProperty('--boardWidth', `${boardWidthCss}%`);
let boardSize = boardlength**2
for(let i =0; i<boardSize;i++){
let div= document.createElement(`div`)
div.className = "sqr"
div.id = `${i}`
boardEl.appendChild(div)
}

const textEl = document.querySelector('h2')
const sqrEls = document.querySelectorAll('.sqr')
const bodyEl = document.querySelector('body')
let snakeInitialPos = Math.round(boardSize/2 -boardlength*0.25)



/*-------------------------------- Constants --------------------------------*/

const initialPosition = [snakeInitialPos,snakeInitialPos+1,snakeInitialPos+2,snakeInitialPos+3]

/*---------------------------- Variables (state) ----------------------------*/
let speed = 400
let timeInterval = setInterval(startTime, 1000 - speed)
let walls =[]
for (let index = 0; index < boardlength; index++) {
    walls.push(index)
    walls.push(index+boardSize-boardlength)
}
for (let index = 0; index <= boardSize; index+=boardlength) {
    walls.push(index,index+boardlength-1)
    
}

let score = 0 
let timer = 0

const snake = {
    headPosition :initialPosition[0],  // starting square for the snakes head
     // starting position of snakes body
    tailPosition : initialPosition.splice(1),
    //bodyLength : 1 +this.tailPosition.length, // property to keep track of snakes length as it grows
    direction : 'l', //this is the direction the snake will be moving initialized to left
    // this grow function will be called whenever the snake eats a piece, and it depends on the direction element in the snake object, which will be manipulated later
    grow : function(){
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

function startTime(){
    snake.move()
    // console.log('first')
    renderSnake()
}

function renderSnake(){
    sqrEls.forEach((sqrEl) => {
        sqrEl.textContent=''
        snake.tailPosition.forEach(piece=>{if (piece ===parseInt(sqrEl.id)) sqrEl.style.backgroundImage= "url('../assets/images/skin.png')"})
            if (parseInt(sqrEl.id) === snake.headPosition){sqrEl.style.backgroundImage= "url('../assets/images/snakeHeadMoving.png')"}
    })
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
    textEl.textContent = 'lost hehexd'
}
function renderApple(){

}

/*----------------------------- Event Listeners -----------------------------*/

sqrEls.forEach(sqr => {if(walls.includes(parseInt(sqr.id))) sqr.style.backgroundColor='black'})

bodyEl.addEventListener('keydown', handleKeyDown)
// for (let i =0;i<20;i++) snake.grow()