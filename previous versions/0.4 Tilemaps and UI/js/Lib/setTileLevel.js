
/* Containers for mapdata and layers*/
var map;
var level, deco;

function createTileMap() {

    /* Settin up gloabal gravity for the level*/
    game.physics.arcade.gravity.y = 250;

    /* Setting background Color for level*/
    game.stage.backgroundColor = '#787878';

    /* Specifying the mapdata for the current level & linking the correct image*/
    map = game.add.tilemap('testLevel');
    map.addTilesetImage('smallSheet', 'tileSheet');
    
    /* Setting up layers*/
    deco = map.createLayer('Decorations');
    level = map.createLayer('Map');

    /* Enableing map collision*/
    map.setCollisionByExclusion([1] ,true , level);

    /* Debug stuff*/
    level.debug = true;

    /* Spawning 3 zombies, starting at 350px into the map, in steps of 50px*/
    zombieConfig(3, 350, 250, 50);
}