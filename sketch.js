var play=1;
var end=0;
var gameState=play;

//CREATE GLOBAL VARIABLES
var monkey,monkeyRunning;
var obstacle,obstacleGroup;
var banana,bananaGroup;
var survivalTime=0;
var gameOver,restart;
var gameOverImg,restartImg;
var ground,groundImg;
var jungle;

function preload(){
  
  monkeyRunning=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  groundImage=loadImage("ground2.png");
  
  bananaImage=loadImage("banana.png");
  
  obstacleImage=loadImage("stone.png");
  
  gameOverImg=loadImage("gameOver.png");
  
  restartImg=loadImage("restart.png");
  
  jungleImage=loadImage("jungle.png");
  
}

function setup(){
  
  createCanvas(600,300);
  jungle=createSprite(200,280);
  jungle.scale =3;
  jungle.addImage("jungle",jungleImage);
  //jungle.x= jungle.width/2;
 jungle.velocityX=-4;
  
  monkey=createSprite(50,180);
  monkey.addAnimation("running",monkeyRunning);
  monkey.scale=0.1;
  
  ground=createSprite(200,280);
  ground.addAnimation("ground",groundImage);
  ground.visible=true;
  
 
  
  gameOver=createSprite(300,100);
  gameOver.addImage("gameover",gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;
    
  restart=createSprite(300,140);
  restart.addImage("restart",restartImg);
  restart.scale=0.5;
  restart.visible=false;
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
  
  survivalTime=0;
  
}

function draw(){
 background("jungle.png");
  
  
  // if -else loop for game states play & end
    if (gameState===play) {
      monkey.scale=0.1;
       //bavkground velocity&infinte moving
      jungle.velocityX=-(6+2*survivalTime/200);
       
      if(jungle.x<0){
      jungle.x=200;
     }
      
      // add velocity to ground
      ground.velocityX=-(6+2*survivalTime/200);
      
      //infinite ground
     if(ground.x<0){
      ground.x=ground.width/2;
     }
     console.log(monkey.y);
     //jump when space is pressed
     if(keyDown("space")&&monkey.y>=239){
       monkey.velocityY=-15;
     }
     
     //add gravity to monkey
     monkey.velocityY=monkey.velocityY+0.8;
     
     //function call -banana
     spawnBanana();
     
     //function call-obstacles
     spawnObstacles();
     
     //add score+20 when monkey touch banana
     if(monkey.isTouching(bananaGroup)){
       survivalTime=survivalTime+2;
       bananaGroup.destroyEach();
      
       switch(survivalTime){
         case 10:monkey.scale=0.12;
           break;
           
         case 20:monkey.scale=0.14;
          break; 
          
         case 40:monkey.scale=0.15;
           break;
           
         case 70:monkey.scale=0.18; 
          break;
              
              default:break;
              }
     }
     
     //monkey touch stone then game state change to end
     if(monkey.isTouching(obstacleGroup)){
       monkey.scale=0.05;
       gameState=end;
     }
     
    
    
     
  } else if(gameState===end){
    
    gameOver.visible = true;
    restart.visible = true; 
    
    //set velocity as 0 for all objects
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    ground.velocityX=0;
    monkey.velocityY=0;
    jungle.velocityX=0;
   obstacleGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
       
    if(mousePressedOver(restart)) {
          reset();  
       
     }
  
  }
  monkey.collide(ground);
  drawSprites();
  
  
  //score
  text("survivalTime:"+survivalTime,300,100);
  stroke("white");
  textSize(20);
  fill("white");
  
  }

function reset(){
 gameState=play;
  survivalTime=0;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  gameOver.visible = false;
    restart.visible = false; 
}

function spawnBanana(){
  if(frameCount%60===0){
    var banana=createSprite(600,280);
    banana.addImage("banana",bananaImage);
    banana.scale=0.05;
    banana.velocityX=-4;
    banana.y=Math.round(random(160,180));
    banana.lifetime=150;
    bananaGroup.add(banana);
      }
  }

function spawnObstacles(){
 if(frameCount%80===0){
  var obstacle=createSprite(600,280);
  obstacle.addImage("obstacle",obstacleImage);
   obstacle.scale=0.15;
   obstacle.velocityX=-4;
   obstacle.lifetime=155;
   obstacleGroup.add(obstacle);
 }
  }





