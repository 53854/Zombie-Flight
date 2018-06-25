/* Config functions*/
function playerConfig(){
    /* Configuring the player*/
    player = game.add.sprite(game.world.centerX, 400, 'player')
    game.physics.arcade.enable(player); //Enableing physics for the player
    player.body.minVelocity = -150; //Setting some gravity rules for the player
    player.body.maxVelocity = 500;
    player.body.collideWorldBounds = false; //Making sure the player can wrap around the world

    /* health and name*/
    player.name = "notZombie";
    player.health = 2;

    /*  Adding player animations*/
    player.animations.add('left', [0, 1], 10, true);
    player.animations.add('right', [2, 3], 10, true);
    

    /* Adding player flight function & wrapper*/
    cursors.up.onDown.add(playerFly, this);

    /* Makin dat boi bouncy*/
    player.body.bounce.x = 0.5;
}