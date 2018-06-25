var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });


/* Player variables*/
var player;
var playerFlying = false;

/* game groups*/
var platforms;
var zombies;

/* Other relevant variables*/
var cursors;

function preload() {
    game.load.image("sky", "assets/sky.png");
    game.load.image("ground", "assets/platform.png");
    game.load.image("star", "assets/star.png");
    game.load.spritesheet("player", "assets/baddie.png", 32, 32);
    game.load.spritesheet("zombie", "assets/zobbie.png", 32, 32);
}

function create() {
    
    /* enableing arrow keys*/
    cursors = game.input.keyboard.createCursorKeys();

    /* Start physics engine*/
    game.physics.startSystem(Phaser.Physics.ARCADE);

    /* Settin up gloabal gravity*/
    game.physics.arcade.gravity.y = 250;

    /* Setting a background*/
    game.add.sprite(0,0, 'sky');

    /* Configuring player*/
    playerConfig();

    /* Preparing level*/
    levelSetup();
}

function update() {
    /* Enable player and enviroment colision*/
    game.physics.arcade.collide(player, platforms);

    /* keep player controlls in check*/
    playerMove();
    playerHealth();
}

function render(){
    //debug stuff
    //game.debug.text("Time : " + game.time.now, 32, 32);
}





