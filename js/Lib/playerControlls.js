/* Flight controlls & playing flying animations*/
function playerFly() {
    playerCheckBalloon();

    //console.log("whoop"); 
    flap.restart();

    player.animations.stop();
    playerMoveUp();

    /* in flight "hovering" controlls*/
    /* Player only "hovers in a direction and can only change directions or speed why flying up*/

    if (player.body.velocity.x < -5 && !cursors.right.isDown || cursors.left.isDown) {

        player.animations.play("flyLeft");
        if (cursors.left.isDown) {
            playerMoveLeft();
        }
    } else if (player.body.velocity.x > 5 && !cursors.left.isDown || cursors.right.isDown) {

        player.animations.play("flyRight");
        if (cursors.right.isDown) {

            playerMoveRight();
        }
    } else if (!cursors.left.isDown && !cursors.right.isDown) {
        //player.animations.stop();
        player.animations.play('flyUp');
    }

}

/* Player ground controlls*/
function playerMove() {

    /* Checking for wrapper*/
    wrappper(player.body, 16);

    /* collision handler*/
    playerCollide();

    /* checking balloons*/
    playerCheckBalloon();

    /* set player mode to walking*/
    if (player.body.onFloor() || player.y > game.world.bounds.bottom - 65 - player.height) {
        playerFlying = false;
    }

    /* Checking input & playing running animations*/
    if (cursors.right.isDown && playerFlying == false) {
        playerMoveRight();
        player.animations.play("right");
    } else if (cursors.left.isDown && playerFlying == false) {
        playerMoveLeft();
        player.animations.play("left");
    }
    //console.log(player.body.velocity.x);

    /* Player always slides a bit instead of fullstopping*/
    else if (playerFlying == false) {
        if (player.body.velocity.x > 5 || player.body.velocity.x < -5) {
            player.body.velocity.x = player.body.velocity.x * 0.95;
            if (player.body.velocity.x > 0) {
                player.animations.stop();
                player.frame = 6;
            } else if (player.body.velocity.x < 0) {
                player.animations.stop();
                player.frame = 4;
            }
        } else {
            player.animations.stop();
            player.body.velocity.x = 0;
            player.frame = 5; //idle frame
        }
    }

    playerAnimationHandler();

}

/* Player movement with slight "sliding" effect*/
function playerMoveRight() {
    if (player.body.velocity.x == 0 ||
        !playerFlying && player.body.velocity.x >= -1 && player.body.velocity.x < 1 ||
        playerFlying && player.body.velocity.x >= -12 && player.body.velocity.x < 1) {
        player.body.velocity.x = 12;
    } else if (player.body.velocity.x < 0) {
        playerTurn();
    } else if (player.body.velocity.x < 144) {
        playerAccelerate();
    }
}

/* Player movement with slight "sliding" effect*/
function playerMoveLeft() {
    if (player.body.velocity.x == 0 ||
        !playerFlying && player.body.velocity.x <= 1 && player.body.velocity.x > -1 ||
        playerFlying && player.body.velocity.x <= 12 && player.body.velocity.x > -1) {
        player.body.velocity.x = -12;
    } else if (player.body.velocity.x >= 1) {
        playerTurn();
    } else if (player.body.velocity.x > -144) {
        playerAccelerate();
    }
}

/* function to reduce speed in current direcetion when approaching other direction*/
function playerTurn() {
    player.animations.stop();
    if (playerFlying) {
        player.body.velocity.x = player.body.velocity.x * 0.45;
    } else {
        player.body.velocity.x = player.body.velocity.x * 0.85;
    }
}

/* function for ground and air acceleration controll*/
function playerAccelerate() {
    if (playerFlying) {
        player.body.velocity.x = player.body.velocity.x * 2;
    } else {
        player.body.velocity.x = player.body.velocity.x * 2;
    }
}

/* "flying" mechanic*/
function playerMoveUp() {
    if (!playerFlying) {
        player.body.velocity.y = -100;
        playerFlying = true;
    } else if (player.body.velocity.y > 80) {
        player.body.velocity.y =  player.body.velocity.y *(-0.1);
    } else if (player.body.velocity.y > 0) {
        player.body.velocity.y = player.body.velocity.y - 80;
    } else if (player.body.velocity.y > -100) {
        player.body.velocity.y = player.body.velocity.y * 2.5;
    }
}


function playerAnimationHandler() {
    if (!cursors.up.isDown && playerFlying) {
        if (cursors.right.isDown) {
            player.frame = 9;

        } else if (cursors.left.isDown) {
            player.frame = 1;
        }
    }
}