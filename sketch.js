var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running,boy_collide ;
var ground, invisibleground, groundImage;
var monster, monsterImage;

var score=0;

var gameOver, restart;


function preload(){
 groundImage = loadImage("ground3.jpg");

  boy_running =   loadAnimation("boy1.png","boy2.png","boy3.png");
  boy_collide = loadAnimation()
  
  
  monsterImage = loadImage("monster.png");

  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1000, 400);
  ground = createSprite(500,200,800,20);
  ground.addImage("ground",groundImage);
  ground.velocityX = -4;
  
  boy = createSprite(70,300,20,50);
  
  boy.addAnimation("running", boy_running);
  boy.scale = 0.5;
  
 
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  
  
  
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  
  drawSprites();
  textSize(25);
  stroke("black");
  text("Score: "+ score, 800,50);
  edges=createEdgeSprites();
  boy.collide(edges);
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
    //change the trex animation
    
    
    if(keyDown("space")) {
      boy.velocityY = -12;
    }
  
    boy.velocityY = boy.velocityY + 0.8
  
    if (ground.x < 370){
      ground.x = ground.width/2
    }
  
    
    spawnMonster();
  
    //if(monster.isTouching(boy)){
      //  gameState = END;
  //  }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    boy.velocityY = 0;
    
  
    
    //change the trex animation

    
    //set lifetime of the game objects so that they are never destroyed
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  
  score = 0;
}

function spawnMonster() {
  if(frameCount % 100 === 0) {
    var monster = createSprite(1000,300,10,40);
    //obstacle.debug = true;
    monster.velocityX = -5;
    
monster.addImage(monsterImage);
    
    //assign scale and lifetime to the obstacle           
    monster.scale = 0.1;
    monster.lifetime = 300;
    //add each obstacle to the group
    
  }
}

