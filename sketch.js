var PLAY = 1;
var END = 0;
var gameState = PLAY;

var man, manRun;

var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3;

var score;
var gameOverImg,restartImg;
var jumpSound, dieSound;




function preload(){
  manRun = loadAnimation("running1.png","runing1.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  groundImage = loadImage("ground2.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");

  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
}

function setup() {
  createCanvas(600,250);

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  man = createSprite(50,140,20,50);
  man.addAnimation("running", manRun);
  man.frameDelay = 10
   //edges = createEdgeSprites();

  man.scale = 0.3;
  man.x = 50

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  obstaclesGroup = createGroup();
  
  man.setCollider("rectangle",0,0,man.width,man.height);
  man.debug = true
  
  score = 0;
}

function draw() {

  background("lightblue");

  text("Score: "+ score, 500,50);

  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
        
    ground.velocityX = -(4 + 3* score/100)

    score = score + Math.round(getFrameRate()/60);
      
      
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(keyDown("space")&& man.y >= 135) {
      console.log("space")
      man.velocityY = -12;
      jumpSound.play();
    }

    man.velocityY = man.velocityY + 0.8

    spawnObstacles();
    
    if(obstaclesGroup.isTouching(man)){
      gameState = END;
      dieSound.play()
    }

  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
  
    ground.velocityX = 0;
    man.velocityY = 0
      
    obstaclesGroup.setLifetimeEach(-1);
    
    obstaclesGroup.setVelocityXEach(0);   

    if(mousePressedOver(restart)) {
      reset(); 
    }
  }
  
  man.collide(invisibleGround);
  
  drawSprites();
}
    
function reset(){
  gameState = PLAY 
  obstaclesGroup.destroyEach();
  score = 0
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + score/100);
  
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
      obstacle.scale = 0.3;
              break;
      case 2: obstacle.addImage(obstacle2);
      obstacle.scale = 0.5;
              break;
      case 3: obstacle.addImage(obstacle3);
      obstacle.scale = 0.2;
              break;
      default: break;
    }
        
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle)
  }

}