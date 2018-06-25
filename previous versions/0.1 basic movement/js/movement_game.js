var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

var player;
var playerVelocityX = 0;
var playerVelocityY = 0;
var cursors;

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('player', 'assets/baddie.png', 32, 32);
}

function create() {
    
    /* enableing arrow keys*/
    cursors = game.input.keyboard.createCursorKeys();

    /* Start physics engine*/
    game.physics.startSystem(Phaser.Physics.ARCADE);

    /* Setting a background*/
    game.add.sprite(0,0, 'sky');

    /* Configuring the player*/
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player')
    game.physics.arcade.enable(player); //Enableing physics for the player
    player.body.gravity.y = 300; //Setting gravity for the player
    player.body.collideWorldBounds = true; //Making sure the player stays in the world

    /*  Adding player animations*/
    player.animations.add('left', [0, 1], 10, true);
    player.animations.add('right', [2, 3], 10, true);
    

    /* Adding player controlls*/
    cursors.up.onDown.add(fly, this); 
    
    



}

function update() {
    /* Lowering Y velocity while not flying up*/
    if (!cursors.up.isDown) {
        playerVelocityY = playerVelocityY * 0.9;
    }

}

/* Functions for the game*/

/* fly function*/
function fly(){
    console.log("whoop");

    if (playerVelocityY > -50){
        playerVelocityY = playerVelocityY -50;
    }
    player.body.velocity.y = playerVelocityY * 3;
    console.log("y is: " + playerVelocityY);


    if (cursors.left.isDown)
    {   
        //  increase player movement to the left while flying
        if (playerVelocityX >= -100){
            playerVelocityX = playerVelocityX - 100;       
        }
        player.body.velocity.x = playerVelocityX;
        console.log("x is:" + playerVelocityX);
        player.frame = 1;
    }
    else if (cursors.right.isDown)
    {
        //  increase player movement to the right while flying
        if (playerVelocityX <= 100){
            playerVelocityX = playerVelocityX + 100;       
        }
        player.body.velocity.x = playerVelocityX;
        console.log("x is: " + playerVelocityX);
        player.frame = 2;
    }
    else
    {
        console.log("still");
        //  Stand still
        player.animations.stop();
        player.frame = 2;
    }
}
