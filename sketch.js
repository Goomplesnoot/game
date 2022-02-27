var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player,playerimg
var ground, invisibleGround, groundImage;

var cloudGroup, cloudimg, cloudimg2,cloudimg3;
let cloud, stone, crystal, sign
let obstacleGroup, obstacle

var gameOver, restart;



let back_ground,back_groundimg
let ground1






function preload(){
  playerimg = loadAnimation("skiing/skiing_down_hill.png")
  cloudimg = loadImage("skiing/cloud1.png");
  cloudimg2=loadImage("skiing/cloud2.png")
  cloudimg3=loadImage("skiing/cloud3.png")
 
  back_groundimg=loadImage("BG.png")
  stone = loadImage("skiing/Stone.png")
  crystal = loadImage("skiing/Crystal.png")
  sign = loadImage("skiing/Sign_2.png")
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  

  back_ground=createSprite(displayWidth/2,displayHeight/3.25,displayWidth*2,displayHeight)
  back_ground.addImage(back_groundimg)
  back_ground.velocityX=-12
  back_ground.scale=1.7
  
  ground=createSprite(displayWidth/2,displayHeight/2+230,displayWidth,10)
  ground.visible=false
  ground1=createSprite(displayWidth/2,displayHeight/2+250,displayWidth,80)
  ground1.shapeColor="#36569b"

  player=createSprite(displayWidth/2-500,displayHeight/2+150, 50, 50);
  player.addAnimation('skiing',playerimg)
  player.debug=true
  player.setCollider("rectangle",0,0,150,100)
  player.rotation-=10
  gameOver = createSprite(displayWidth/2,displayHeight/2-200);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(displayWidth/2,displayHeight/2-100);
  restart.addImage(restartImg);

  
  /*gameOver.scale = 0.5;
  restart.scale = 0.5;*/

  gameOver.visible = false;
  restart.visible = false;
  cloudGroup = new Group();
  obstaclesGroup = new Group();

}

function draw() {
  background(255);

  
  if (gameState===PLAY){
    back_ground.velocityX = -12
    
    
    if(keyDown("space") && player.y>=displayHeight/2+120) {
      player.velocityY = -20;
      /*if(player.y<displayHeight/2+155 && player.y<displayHeight/2+135){
        
        
      }*/
    }
  
    player.velocityY += 1
  
    if(back_ground.x<0){
      back_ground.x=displayWidth/2
    }
  
    player.collide(ground);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    back_ground.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(displayWidth-100,displayHeight/2-200,30,10)
    cloud.y = Math.round(random(displayHeight/2-100,displayHeight/2-500))
    cloud.scale = 0.69;
    cloud.velocityX= -12
    
    cloud.lifetime = 200;
    
    cloud.depth = player.depth;
    player.depth +=1;
    
    var counter = Math.round(random(1,3))
    switch(counter){
     case 1: cloud.addImage(cloudimg)
     break;
     case 2: cloud.addImage(cloudimg2)
     break;
     case 3: cloud.addImage(cloudimg3)
     break;
    

    }
    gameOver.depth=cloud.depth
    gameOver.depth+=1
    restart.depth=cloud.depth
    restart.depth+=1
  cloudGroup.add(cloud)

  }
}

function spawnObstacles(){
  if(frameCount % 130 === 0){
      obstacle =createSprite(displayWidth-100,displayHeight/2+200,10,40)
      obstacle.scale=0.75
      obstacle.velocityX = -12
      var count = Math.round(random(1,3))
      switch(count){
        case 1: obstacle.addImage(stone)
        break;
        case 2: obstacle.addImage(crystal)
        break;
        case 3: obstacle.addImage(sign)
        break;
      }
      
    obstacle.debug=true
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}


    
  
 

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudGroup.destroyEach();
}