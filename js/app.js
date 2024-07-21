
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

let score = 0 
let lose = false
let timer = 0

let snake = {
    headPosition :100,  // starting square for the snakes head
    tailPosition : [101,102,103], // starting position of snakes body
    //bodyLength : 1 +this.tailPosition.length, // property to keep track of snakes length as it grows
    direction : 'l', //this is the direction the snake will be moving initialized to left
    // this grow function will be called whenever the snake eats a piece, and it depends on the direction element in the snake object, which will be manipulated later
    grow : function(){
        
        if (this.direction ==='l')
            //if snake is moving to the left, the tail will have to 
            //grow in the array to the right of the body, which is +1 
            //for the index of the new piece of body
            this.tailPosition.push(   1 + this.tailPosition.at(-1))
        if (this.direction ==='r') 
            //the same is happening here but we push the new piece of 
            //body to the left (-1) of the end of the tail
            this.tailPosition.push(  -1 + this.tailPosition.at(-1))
        if (this.direction ==='u')
            /* for the snake to get a new piece of body under it on the
            board it will be in the row below in the array, and since
            its a 1D array it will be the length of that row which 
            I initially planned to be 15 but if we change it later 
            it can be extracted from the nature of the array we create. */
            this.tailPosition.push(  15 + this.tailPosition.at(-1))
        if (this.direction ==='d')
            // same process here but for going down 
            this.tailPosition.push( -15 + this.tailPosition.at(-1))
        },
    
}
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

sqrEls.forEach((sqrEl) => {

    snake.tailPosition.forEach(piece=>{if (piece ===parseInt(sqrEl.id)) sqrEl.style.backgroundColor= 'red'})
        if (parseInt(sqrEl.id) === snake.headPosition){sqrEl.style.backgroundColor= 'darkred'}
});


/*----------------------------- Event Listeners -----------------------------*/



