
/* Containers to identify the  different types of collision for the current map*/
var collisionLayer;
var spikes;

/* Containers for mapdata and layers*/
var testMap, testLevel, testDeco, testDeco2, testDeco3;
var background;

/* Setting up zombie group*/
var zombies;

function createTestLevel() {

    /* Settin up gloabal gravity for thetestLevel*/
    game.physics.arcade.gravity.y = 200;

    /* Setting background Color fortestLevel*/
    background = game.add.image(0,0, 'bg3');
    background.scale.setTo(2, 2);

    /* Specifying the mapdata for the currenttestLevel & linking the correct image*/
    map = game.add.tilemap('testLevel');
    map.addTilesetImage('smallSheet', 'tileSheet');
    
    /* Setting up layers*/
    testDeco = map.createLayer('Decorations');
    testLevel = map.createLayer('Map');

    /* Enableing map collision*/
    map.setCollisionByExclusion([1] ,true ,testLevel);

    collisionLayer = testLevel;

    /* Adding zombie group*/
    zombies = game.add.group();

    /* Spawning 3 zombies, starting at 350px into the map, in steps of 50px*/
    zombieConfig(3, game.world.left + 350, game.world.top + 250, 50);

    /* Debug option*/
    //testLevel.debug = true;
}


function createTestLevel2() {

    /* Settin up gloabal gravity for thetestLevel*/
    game.physics.arcade.gravity.y = 200;

    /* Setting background Color fortestLevel*/
    background = game.add.image(0,0, 'bg3');
    background.scale.setTo(2, 2);


    /* Specifying the mapdata for the currenttestLevel & linking the correct image*/
    map = game.add.tilemap('testLevel2');
    map.addTilesetImage('smallSheet', 'tileSheet');
    
    /* Setting up layers*/
    testDeco = map.createLayer('decorations');
    testLevel = map.createLayer('map');
    testDeco2 = map.createLayer('decorations2');

    /* Enableing map collision*/
    map.setCollisionByExclusion([1] ,true ,testLevel);

    collisionLayer = testLevel;

    /* Adding zombie group*/
    zombies = game.add.group();

    /* Spawning 2 zombies on each plato*/
    zombieConfig(2, game.world.left + 100, game.world.top + 100, 50);
    zombieConfig(2, game.width - 200, game.world.top + 100, 50);

    /* Debug option*/
    //testLevel.debug = true;
}

function createTestLevel3() {

    /* Settin up gloabal gravity for thetestLevel*/
    game.physics.arcade.gravity.y = 200;

    /* Setting background Color fortestLevel*/
    background = game.add.image(0,0, 'bg3');
    background.scale.setTo(2, 2);


    /* Specifying the mapdata for the currenttestLevel & linking the correct image*/
    map = game.add.tilemap('testLevel3');
    map.addTilesetImage('smallSheet', 'tileSheet');
    
    /* Setting up layers*/
    testDeco1 = map.createLayer('botDeco');
    testLevel = map.createLayer('map');
    testDeco2 = map.createLayer('topDeco');
    spikeLayer = map.createLayer('spikes');

    /* Enableing map collision*/
    map.setCollisionByExclusion([531] ,true ,testLevel);
    map.setCollisionByExclusion([531] ,true ,spikeLayer);

    /*Defining gloabal collision layers*/
    collisionLayer = testLevel;
    spikes = spikeLayer;

    /* Adding zombie group*/
    zombies = game.add.group();

    /* Spawning 2 zombies on each plato*/
    zombieConfig(2, game.world.left + 100, game.world.top + 100, 50);
    zombieConfig(2, game.width - 200, game.world.top + 100, 50);

    /* Debug option*/
    //spikeLayer.debug = true;
    //testLevel.debug = true;
}

function createHighScoreLevel() {

    /* Settin up gloabal gravity for thetestLevel*/
    game.physics.arcade.gravity.y = 200;

    /* Setting background Color fortestLevel*/
    background = game.add.image(0,0, 'bg3');
    background.scale.setTo(2, 2);


    /* Specifying the mapdata for the currenttestLevel & linking the correct image*/
    map = game.add.tilemap('testLevel3');
    map.addTilesetImage('smallSheet', 'tileSheet');
    
    /* Setting up layers*/
    testDeco1 = map.createLayer('botDeco');
    testLevel = map.createLayer('map');
    testDeco2 = map.createLayer('topDeco');
    spikeLayer = map.createLayer('spikes');

    /* Enableing map collision*/
    map.setCollisionByExclusion([531] ,true ,testLevel);
    map.setCollisionByExclusion([531] ,true ,spikeLayer);

    /*Defining gloabal collision layers*/
    collisionLayer = testLevel;
    spikes = spikeLayer;

    /* Adding zombie group*/
    zombies = game.add.group();

    /* Spawning 2 zombies on each plato*/
    zombieConfig(2, game.world.left + 100, game.world.top + 100, 50);
    zombieConfig(2, game.width - 200, game.world.top + 100, 50);

    /* Debug option*/
    //spikeLayer.debug = true;
    //testLevel.debug = true;
}