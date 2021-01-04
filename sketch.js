var PLAY=1;
var END =0;
var gameState=1;
var backgroundI,backgroundS;
var fruits,Enemy,monsterImage,enemyGroup;
var sword,swordImage,swordSound;
var fruit1,fruit1Image,fruitGroup;
var fruit2Image;
var fruit3Image;
var fruit4Image;
var score=0,gameover;


function preload(){
 
  swordImage = loadImage ("sword.png");
  
  backgroundI = loadImage ("NF.png");
  
  swordSound = loadSound ("knifeSwooshSound.mp3")
  
  fruit1Image = loadImage ("fruit1.png");
  
  fruit2Image = loadImage ("fruit2.png");
  
  fruit3Image = loadImage ("fruit3.png");
  
  fruit4Image = loadImage ("fruit4.png");
  
  monsterImage = loadAnimation ("alien1.png","alien2.png");
  
  gameover = loadImage ("gameover.png");
}

function setup() {
  createCanvas(600, 600);
  
  backgroundS = createSprite(300,300);
  backgroundS.addImage(backgroundI);
  backgroundS.scale=1.0;
  
  sword = createSprite(300,300);
  sword.addImage(swordImage);
  
  fruitGroup = new Group();
  enemyGroup = new Group();
  
  //sword.debug=true;
  
  score = 0;
}

function draw(){
  background(180);
  
  var fruits = Math.round(random(1,4));
  
  
  if (gameState === PLAY){
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
    if (fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score+2;
      swordSound.play();
    }
    
    fruit1();
    Enemy();
    
    if (enemyGroup.isTouching(sword)){
       enemyGroup.destroyEach();
       fruitGroup.destroyEach();
       fruitGroup.setVelocityXEach(0);
       enemyGroup.setVelocityXEach(0);
       gameState = END;
  }
  }
  else if (gameState === END){
    sword.addImage(gameover);
    sword.x=300;
    sword.y=300;
  }
  
  drawSprites();
  text("Score: "+ score, 500,50);
}

function fruit1 (){
  if (frameCount % 80 === 0){
    var fruit1 =   createSprite(600,Math.round(random(50,340)),10,40);
    var rand = Math.round(random(1,4))
    if (rand === 1){
     fruit1.addImage(fruit1Image); 
    }
    else if (rand === 2){
      fruit1.addImage(fruit2Image);
    }
    else if (rand === 3){
      fruit1.addImage(fruit3Image);
    }
    else {
      fruit1.addImage(fruit4Image);
    }
    fruit1.velocityX= -6;
    fruit1.scale=0.3;
    fruitGroup.add(fruit1);
    fruit1.lifetime=200;
  }
}

function Enemy (){

  if(World.frameCount % 200===0){ 
    monster=createSprite(600,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    enemyGroup.add(monster);
  }
}