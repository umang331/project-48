var pc,npc,deadman,backGround,edges,bullet,zom;
var back,player;//obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacle7,obstacle8;
var obs4,obs4_1,obs4_2,obs4_3,edge1,edge2,edge3,edge4;
var zomb = [];
var zomb1 = [];
var zomb2 = [];
var zomb3 = [];
var zomb4 = [];
var score = 0;
var scoreDisplay;
var date,startTime,currentTime;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  pc = loadImage("gunman2.png");
  npc = loadImage("gunman1.png");
  deadManimg = loadImage("npc.png");
  backGround = loadImage("background.png");
  bulleti = loadImage("bullet.png");
  bulletGroup = new Group();
  
}

function setup() {
  createCanvas(1730,1200);
 back =  createSprite(865,600,20,20);
 back.addImage(backGround);
 back.scale = 0.5;

 player = createSprite(1900,600,20,20);
 player.addImage(pc)
 player.scale = 0.4;
 
 edge1 =  createSprite(850,-252,2500,20);
 edge1.visible = false;
 edge2 =  createSprite(850,1452,2500,20);
 edge2.visible = false;
 edge3 =  createSprite(-374,600,20,1700);
 edge3.visible = false;
 edge4 =  createSprite(2090,600,20,1700);
 edge4.visible = false;

 player.debug = true;

createZombie(1400,0,-200);
date = new Date();
startTime = date.getMinutes();

}
function draw() {
  background(backGround)
   console.log("start"+startTime)

    player.setCollider("rectangle",0,0,240,170)

    camera.position.x =player.x;
    camera.position.y =player.y;

    cdate = new Date();
    
    player.collide(edge1);
    player.collide(edge2)
    player.collide(edge3)
    player.collide(edge4)

    if(gameState === PLAY){

      currentTime = cdate.getMinutes();

      console.log(gameState)

      for(var i = 0;i<zomb.length;i++){
        if(zomb[i].isTouching(bulletGroup)){
          zomb[i].destroy();
          bulletGroup.destroyEach();
          score++;
          }
        }

      if(keyWentDown(LEFT_ARROW)){
        player.velocityX = -6
      }

      if(keyWentDown(RIGHT_ARROW)){
        player.velocityX = 6
      }

      if(keyWentUp(LEFT_ARROW)){
        player.velocityX = 0
      }

      if(keyWentUp(RIGHT_ARROW)){
        player.velocityX = 0
      }

      if(keyWentDown(UP_ARROW)){
        player.velocityY = -6
      }

      if(keyWentDown(DOWN_ARROW)){
        player.velocityY = 6
      }

      if(keyWentUp(UP_ARROW)){
        player.velocityY = 0
      }

      if(keyWentUp(DOWN_ARROW)){
        player.velocityY = 0
      }

      if(keyWentDown("space")){
        createBullet();
      }

      if(currentTime === startTime+2){
        gameState = END;
      }
    }

      
    
    if(gameState===END){
        console.log(END);
        player.visible = false;
        for(var u = 0;u<zomb.length;u++){
          zomb.pop();
          
        }
        var textt = createElement('h1');
        textt.html("your score is: "+score +" .refresh to play again")
        textt.position(50,-3)
      }
    
    
  drawSprites();
textSize(24);
  fill("yellow");
text("use arrow key and space key,kill as many as zombie possible",1900,400);  
  
  
}
function createBullet() {
  bullet= createSprite(100, 100, 60, 10);
  bullet.setCollider("rectangle",0,0,220,100 );
  bullet.velocityX = -4;
  bullet.addImage(bulleti);
  bullet.x = player.x-44;
  bullet.y=player.y - 24;
  bullet.lifetime = 150;
  bullet.scale = 0.07;
  bulletGroup.add(bullet);
  return bullet;
   
}
function createZombie(no,a,b){
  for(var i = a;i<no;i+=70){
    for(var j = b;j<no;j+=70){
      zombie = createSprite(i,j,10,10);
      zombie.addImage(deadManimg);
      zombie.scale = 0.2
      
      zomb.push(zombie);
    }
  }
}
