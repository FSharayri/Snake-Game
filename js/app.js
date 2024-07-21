
//initial boilerplate for the game, this will be modified as the game is being built.
//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player pressing a button with a `buttonPressHandle` function.

//7) Create Reset functionality.

/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let walls =[]
for (let index = 0; index < 15; index++) {
    walls.push(index)
    walls.push(index+210)
}
for (let index = 0; index <= 210; index+=15) {
    walls.push(index,index+14)
    
}
console.log(walls)
let score = 0 
let lose = false
let timer = 0

let snake = {
    headPosition :100,  // starting square for the snakes head
     // starting position of snakes body
    tailPosition : [101,102,103],
    //bodyLength : 1 +this.tailPosition.length, // property to keep track of snakes length as it grows
    direction : 'l', //this is the direction the snake will be moving initialized to left
    // this grow function will be called whenever the snake eats a piece, and it depends on the direction element in the snake object, which will be manipulated later
    grow : function(){
        this.tailPosition.push(this.tailPosition.at(-1))
    },
    move(){
        console.log(snake.headPosition)
        if (this.direction ==='l'){
            this.tailPosition.unshift(this.headPosition)
            // this.tailPosition.pop()
            sqrEls[this.tailPosition.pop()].style.backgroundColor=''
            this.headPosition-- 
           
            // if (walls.includes(this.headPosition)) lose() 
        }
        if (this.direction ==='r') {
            this.tailPosition.unshift(this.headPosition)
            this.tailPosition.pop()
            this.headPosition++
        }
        if (this.direction ==='u'){
            this.tailPosition.unshift(this.headPosition)
            this.tailPosition.pop()
            this.headPosition-=15
        }
        if (this.direction ==='d'){
            this.tailPosition.unshift(this.headPosition)
            this.tailPosition.pop()
            this.headPosition+=15
        }
        }
    }


let timeInterval 

const startTime = function(){
    snake.move()
    console.log('first')
    renderSnake()
}
timeInterval = setInterval(startTime, 1000)

// console.log(snake.tailPosition.length)
// snake.grow()
// snake.grow()
// console.dir(snake)
// console.log(snake.tailPosition.length)
// snake.direction = 'r'
// snake.grow()
// snake.grow()
// console.log(snake.tailPosition)
// snake.direction = 'u'
// snake.grow()
// console.log(snake.tailPosition)


/*------------------------ Cached Element References ------------------------*/
// const boardEl = document.querySelector('#board')
// let innerHtml=''
// for(let i =0; i<225;i++){
// innerHtml+= `<div class = "sqr" id="${i}"> ${i}</div>`

// }
// boardEl.innerHTML=innerHtml
const sqrEls = document.querySelectorAll('.sqr')


/*-------------------------------- Functions --------------------------------*/


// snake.grow()
// snake.move()
// snake.grow()
// snake.move()
// snake.move()
// snake.move()
// snake.move()
// snake.move()
renderSnake = function(){
sqrEls.forEach((sqrEl) => {

    snake.tailPosition.forEach(piece=>{if (piece ===parseInt(sqrEl.id)) sqrEl.style.backgroundColor= 'red'})
        if (parseInt(sqrEl.id) === snake.headPosition){sqrEl.style.backgroundColor= 'darkred'}
});}


/*----------------------------- Event Listeners -----------------------------*/



