/* Player & player properties contaiers*/
var player;
var playerBalloons

/* Config variables*/
var highscoreMode;
var playerFlying = false;
var p1Score;

/* Keeping spawnLocation containers for respawn events*/
var playerX, playerY;

function playerConfig(spawnX, spawnY, amountBalloons, lives) {
    /* Configuring the player*/
    player = game.add.sprite(spawnX, spawnY, "player");
    game.physics.arcade.enable(player); //Enableing physics for the player
    player.body.maxVelocity.setTo(250, 250);
    player.body.collideWorldBounds = false; //Making sure the player can wrap around the world

    /* Logging global respawn values*/
    playerX = spawnX;
    playerY = spawnY;

    /* resetting Info*/
    highscoreMode = false;

    /* Preventing errors for starting in different levels*/
    if (lives == undefined) {
        lives = 2;
    }

    /* health and name*/
    player.name = "notZombie";
    player.health = lives;
    playerLives = player.health;

    /* Handeling balloons*/
    player.hasBalloon = false;
    playerBalloons = amountBalloons;
    playerGetBalloons(amountBalloons);

    /*  Adding player animations*/
    player.animations.add("left", [3, 4], 10, true);
    player.animations.add("right", [6, 7], 10, true);

    player.animations.add("flyUp", [0, 5], 10, false);
    player.animations.add("flyLeft", [2, 1], 10, false);
    player.animations.add("flyRight", [8, 9], 10, false);


    /* Adding player flight function */
    cursors.up.onDown.add(playerFly, this);

    /* Makin dat boi slightly bouncy*/
    player.body.bounce.setTo(0.8, 0);
}

/* Checks for balloon, then checks ballon collision, rsresets balloon to self & then checks for balloon pop trigger*/
function playerCheckBalloon() {
    for (var i = 0; i < player.children.length; i++) { //checks all existing player balloons
        player.getChildAt(i).balloonCollision(); //balloon collision checks
    }
    if (player.children.length <= 0) {
        palyerHurt()
    } // if player is out of balloons, he's hurt :c
}


/* Functions for the player*/
function palyerHurt() {
    player.health --;
    playerLives = player.health;
    if (player.health > 0) {
        game.camera.flash(0x990000, 200, true, 0.7);
        playerRespawn();
    } else {
        menuMusic.stop();
        gameOver.play("", 0, 0.8, false);
        player.pendingDestroy = true;
        if (!highscoreMode) {
            /* Starting endgame state*/
            game.state.start("gameOver");
        }
        else{
            game.state.start("highScoreEnd");
        }
    }
}

function playerRespawn() {
    playerLivesUI.getTop().destroy();
    player.kill();
    player.reset(playerX, playerY, playerLives);
    playerGetBalloons(playerBalloons);
}

/* Not currently in use*/
function SpawnPlayer() {
    player.reset(spawnX, spawnY, lives);
    playerGetBalloons(playerBalloons);
}

/* Giving the player some (amountBalloons) ballons*/
function playerGetBalloons(amountBalloons) {
    for (var i = 0; i < amountBalloons; i++) {
        var playerBal = new balloon(game, i * 24, 0 - player.height / 1.5, "balloon", false);
        player.addChild(playerBal);
        player.hasBalloon = true;
    }
}

/* Enable player and enviroment colision*/
function playerCollide() {
    game.physics.arcade.collide(player, collisionLayer);

}