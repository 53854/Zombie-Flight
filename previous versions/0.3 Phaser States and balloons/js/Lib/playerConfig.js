/* Player group for eventual multiplayer*/
var player;

/* Config variables*/
var playerFlying = false;
var p1Score = 0;


function playerConfig(amountBalloons, lifes){
    /* Configuring the player*/
    player = game.add.sprite(game.world.centerX, 400, "player");
    game.physics.arcade.enable(player); //Enableing physics for the player
    player.body.maxVelocity.setTo(250, 250);
    player.body.collideWorldBounds = false; //Making sure the player can wrap around the world

    /* health and name*/
    player.name = "notZombie";
    player.health = lifes;

    player.hasBalloon = false;

    /*  Adding player animations*/
    player.animations.add('left', [0, 1], 10, true);
    player.animations.add('right', [2, 3], 10, true);
    

    /* Adding player flight function & wrapper*/
    cursors.up.onDown.add(playerFly, this);

    /* Makin dat boi slightly bouncy*/
    player.body.bounce.setTo(0.8, 0);

    playerGetBalloons(amountBalloons);
}

/* Checks for balloon, then checks ballon collision, rsresets balloon to self & then checks for balloon pop trigger*/
function playerCheckBalloon(){
    for (var i = 0; i < player.children.length; i++){ //checks all existing player balloons
        player.getChildAt(i).balloonCollision(); //balloon collision checks
    }
    if (player.children.length <= 0){palyerHurt()} // if player is out of balloons, he's hurt :c
}


/* Functions for the player*/
function palyerHurt(){
    player.health -= 1;
    if (player.health > 0){
    playerRespawn();
    }
    else{
        player.pendingDestroy = true;
        /* Starting endgame state*/
        updateLocalHighscores();
        game.state.start("end");
    }
}

function playerRespawn(){
    playerLifes.getTop().destroy();
    player.kill();
    player.reset(game.world.centerX, 400);
    playerGetBalloons(2);
}

/* Giving the player some (amountBalloons) ballons*/
function playerGetBalloons(amountBalloons){
    for (var i = 0; i < amountBalloons; i++){
        var playerBal = new balloon(game, i *30, 0 - player.height/1.5, "star", false);
        player.addChild(playerBal);
        player.hasBalloon = true;
    }
}