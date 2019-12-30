var myPlayer;
var myFood;
var score;
var food;


document.onkeydown = pressKey;

function startGame(){
  gameArea.start();
  myPlayer = new snake(10,10,10,10);
  myFood = new food(this.x,this.y,10,10);
  score = new score();
  move = new move(0,0);
}

function pressKey(e){

  if(e.keyCode == '87' && move.newY !=10){
    console.log('up');
    move.newX =0;
    if(move.newY>-10)
      move.newY -=10;
  }
  if (e.keyCode =='65' && move.newX !=10){
    console.log('left')
    move.newY =0;
    if(move.newX > -10)
      move.newX -= 10;
  }
  if(e.keyCode =='83' && move.newY != -10){
    console.log('down');
    move.newX = 0;
    if(move.newY<10)
      move.newY  +=  10;
  }
  if(e.keyCode == '68' && move.newX != -10){
    console.log('right');
    move.newY = 0;
    if(move.newX<10)
      move.newX += 10;
  }
}


var gameArea = {
  start : function(){
      this.canvas =  document.getElementById("canvas");
      this.canvasx = this.canvas.getContext('2d');
      this.interval = setInterval(updateGameArea,1000/12);
  },
  clear : function() {
        this.canvasx.clearRect(0, 0, this.canvas.width,this.canvas.height);
        this.canvasx.fillStyle='gray';
        this.canvasx.fillRect(0,0,this.canvas.width,this.canvas.height);
  }
}

function snake(width,height,x,y){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.total=4;
  this.tail = [];
  this.update = function(){
    ctx = gameArea.canvasx;
    ctx.fillStyle = "yellow";
    for(let i=0;i<this.tail.length;i++){
      ctx.strokeStyle="gray";
      ctx.strokeRect(myPlayer.tail[i].x, myPlayer.tail[i].y, 10,10);
      ctx.fillRect(this.tail[i].x,this.tail[i].y,this.width,this.height);
      }
    }
  }

  /*function iA(){
      if(myPlayer.x < myFood.x && myPlayer.newX !=-10){
        myPlayer.x +=10;
        for(let i=0;i<myPlayer.tail.length-1;i++){
          if(myPlayer.tail[0].x - myplayer.tail[i+1] == 10)
            console.log('carpmak uzere');
        }
      }

      if(myPlayer.y < myFood.y && myPlayer.newY !=-10){
        myPlayer.y +=10;
        for(let i=0;i<myPlayer.tail.length-1;i++){
          if(myPlayer.tail[0].y - myplayer.tail[i+1].y == 10)
            console.log('carpmak uzere');
        }
      }

      if(myPlayer.x > myFood.x && myPlayer.newX !=+10){
        myPlayer.x -=10;
        for(let i=0;i<myPlayer.tail.length-1;i++){
          if(myPlayer.tail[0].x - myplayer.tail[i+1].x == -10)
            console.log('carpmak uzere');
        }
      }

      if(myPlayer.y > myFood.y && myPlayer.newY !=+10){
        myPlayer.y -=10;
        for(let i=0;i<myPlayer.tail.length-1;i++){
          if(myPlayer.tail[0].y - myplayer.tail[i+1].y == -10)
            console.log('carpmak uzere');
        }
      }
    }*/



  function snakeParts(){
    for(let i=0;i<myPlayer.tail.length-1;i++){
      myPlayer.tail[i] = myPlayer.tail[i+1];
    }
    myPlayer.tail[myPlayer.total-1] = {x:myPlayer.x, y:myPlayer.y};
  }
  function crashParts(){
    for(let i=3;i<myPlayer.tail.length-1;i++){
      if(myPlayer.tail[0].x == myPlayer.tail[i+1].x && myPlayer.tail[0].y == myPlayer.tail[i+1].y){
        console.log('crash');
        location.reload();
      }
    }
  }


function food(x,y,width,height){
  for(var i=0;i<1;i++){
    randx = Math.floor(Math.random()* 400);
    randy = Math.floor(Math.random()*400);
    if(randx % 10 != 0 || randy % 10 != 0)
      i--;
  }
  this.width = width;
  this.height = height;
  this.x = randx;
  this.y = randy;
  this.update = function(){
    ctf = gameArea.canvasx;
    ctf.fillStyle="pink";
    ctf.fillRect(this.x,this.y,this.width,this.height);
  }
}
function eat(){
    if(myPlayer.x == myFood.x && myPlayer.y == myFood.y){
       myFood = new food(myPlayer.x,myPlayer.y,10,10);
       score.score++;
       myPlayer.total++;
    }
}
function score(){
  this.score=0;
  this.update = function(){
  ctscore = gameArea.canvasx;
  ctscore.fillStyle="white";
  ctscore.font="20px Arial";
  ctscore.fillText("Score: "+this.score,10,380);
  }
}
function move(x,y){
  this.newX=x;
  this.newY=y;

  this.newPos = function(){
    myPlayer.x += this.newX;
    myPlayer.y += this.newY;
  }
  this.wrongPos = function(){
  if(myPlayer.x>395)
      myPlayer.x=0;
  if(myPlayer.y>395)
    myPlayer.y=0;
  if(myPlayer.x<-5)
    myPlayer.x=400;
  if(myPlayer.y<-5)
    myPlayer.y=400;
  }
}


function updateGameArea(){
  console.log(myPlayer.tail.length)
  gameArea.clear();
  snakeParts();
  myPlayer.update();
  myFood.update();
  crashParts();
  move.newPos();
  move.wrongPos();
  eat();
  score.update();
  //iA();
}
