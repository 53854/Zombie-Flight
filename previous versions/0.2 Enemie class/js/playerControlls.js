/* Functions for the player*/
function playerHealth(){
    if (player.health <= 0){
        player.destroy();
        console.log("game over");
    }
}

/* Flight controlls & playing flying animations*/
function playerFly(){
    //console.log("whoop");   
    player.animations.stop();
    playerMoveUp();
    /* in flight "hovering" controlls*/
    /* Player only "hovers in a direction and can only change directions or speed why flying up*/
    if (cursors.left.isDown)
    {   
        playerMoveLeft();
        player.frame = 1; //fly left animation
    }
    else if (cursors.right.isDown)
    {
        playerMoveRight();
        player.frame = 2; //fly right animation
    }
    else{
        player.animations.stop();
        // insert idle fly frame
    }
}

/* Player ground controlls*/
function playerMove(){
    /* set player mode to walking*/
    if (player.body.touching.down && playerFlying == true){
        //console.log("hit ground");
        playerFlying = false;
    }

    /* Checking input & playing running animations*/
    if (cursors.right.isDown && playerFlying == false){
        playerMoveRight();
        player.animations.play("right");
    }
    else if (cursors.left.isDown && playerFlying == false){
        playerMoveLeft();
        player.animations.play("left");
    }
    //console.log(player.body.velocity.x);

    /* Player always slides a bit instead of fullstopping*/
    else if (playerFlying == false){
        if(player.body.velocity.x > 5 || player.body.velocity.x < -5){
            player.body.velocity.x = player.body.velocity.x * 0.95;
            if(player.body.velocity.x > 0){
                player.animations.stop(); 
                player.frame = 3; 
            }
            else if(player.body.velocity.x < 0){
                player.animations.stop(); 
                player.frame = 0;
            }
        }
        else {
            player.animations.stop();   
            player.body.velocity.x = 0;
            player.frame = 2; //idle frame
        }
    }
    /* Checking for wrapper*/
    horizontalWrap(player.body, 16);
}

/* Player movement with slight "sliding" effect*/
function playerMoveRight(){
    if( player.body.velocity.x == 0 ||
        !playerFlying && player.body.velocity.x >= -1 && player.body.velocity.x < 1 ||
        playerFlying && player.body.velocity.x >= -12 && player.body.velocity.x < 1){
        player.body.velocity.x = 12;
    }
    else if (player.body.velocity.x < 0){
        playerTurn();
    }
    else if (player.body.velocity.x < 144){
        playerAccelerate();    
    }
}

/* Player movement with slight "sliding" effect*/
function playerMoveLeft(){
    if( player.body.velocity.x == 0 ||
        !playerFlying && player.body.velocity.x <= 1 && player.body.velocity.x > -1 ||
        playerFlying && player.body.velocity.x <= 12 && player.body.velocity.x > -1){
        player.body.velocity.x = -12;
    }
    else if (player.body.velocity.x >= 1){
        playerTurn();
    }
    else if (player.body.velocity.x > -144){
        playerAccelerate();      
    }
}

/* function to reduce speed in current direcetion when approaching other direction*/
function playerTurn(){
    if (playerFlying){
        player.body.velocity.x = player.body.velocity.x * 0.5;
    }
    else {
        player.body.velocity.x = player.body.velocity.x * 0.9;
    }
}

/* function for ground and air acceleration controll*/
function playerAccelerate(){
    if (playerFlying){
        player.body.velocity.x = player.body.velocity.x *2;
    }
    else {
        player.body.velocity.x = player.body.velocity.x *2;
    } 
}

/* "flying" mechanic*/
function playerMoveUp(){
    if(!playerFlying){
        player.body.velocity.y = -100;
        playerFlying = true;
    }
    else if (player.body.velocity.y > 80){
        player.body.velocity.y = 0;
    }
    else if (player.body.velocity.y > 0){
        player.body.velocity.y = player.body.velocity.y -80;
    }
    else if (player.body.velocity.y > -100){
        player.body.velocity.y = player.body.velocity.y *2.5;
    }
    //console.log(player.body.velocity.y);
}