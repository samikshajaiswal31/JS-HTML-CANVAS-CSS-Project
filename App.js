var canvas = document.getElementById("snake");
ctx = canvas.getContext("2d");
//console.log(canvas);

const grid = 32;

// load image of gird
var g = document.getElementById("img");

// load img by using img constructor
const beerImg = new Image();
beerImg.src = "food.png";

//snake is nothing but array
let snake = [];
snake[0] = {
        x : 9 * grid,
        y : 10 * grid
    };

// generate the beer randomly
let beer = {
        x : Math.floor(Math.random()*17+1) * grid,
        y : Math.floor(Math.random()*15+1) * grid, 
    }

//keyboard listener
let d;
document.addEventListener("keydown",(e)=>{
    let k = e.keyCode;                        // k is nothing but key
    if( k == 37 && d !="right")
    {              
      d="left"
    }
    else if(k == 38 && d != "down")
    {
      d="up"
    }
    else if(k == 39 && d != "left")
    {   
        d ="right";      
    }else if(k == 40 && d != "up")
    {
      d="down"
    }
    console.log(d);
})


function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}


//--------MAIN FUNCTION-----------------
function draw(){
    ctx.drawImage(g,0,0);
    
    for(let i = 0; i < snake.length ; i++)                 // snake length is one right now
    {
        ctx.fillStyle = ( i == 0 )? "red" : "black";      // ternary operator
        ctx.fillRect(snake[i].x,snake[i].y,grid,grid);    
        ctx.strokeStyle = "white";
        ctx.strokeRect(snake[i].x,snake[i].y,grid,grid);
    }
    
    ctx.drawImage(beerImg,beer.x,beer.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

     if(d=="left") 
        snakeX -= grid;
     if(d=="up") snakeY -= grid;
     if(d=="right") snakeX += grid;
     if(d=="down") snakeY += grid;

     
    if(snakeX == beer.x && snakeY == beer.y){
        beer = {
            x : Math.floor(Math.random()*17+1) * grid,
            y : Math.floor(Math.random()*15+1) * grid, 
        }
    }
    else
    {
        snake.pop();           // last ele is remove
    }

    let newpos = {           
        x : snakeX,
        y : snakeY
    }


    if(snakeX < grid || snakeX > 17 * grid || snakeY < grid || snakeY > 15*grid|| collision(newpos,snake) ){
        clearInterval(game);
    }
   
    snake.unshift(newpos);    // new ele is add

}
var ctx;
var game=setInterval(draw,100);
