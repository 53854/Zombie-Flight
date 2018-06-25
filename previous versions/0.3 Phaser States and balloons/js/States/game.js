
/* Creating phaser game window*/
var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game');

/* Adding different game states*/
game.state.add("boot", bootState);
game.state.add("load", loadState);
game.state.add("menu", menuState);
game.state.add("play", playState);
game.state.add("end", endState);

/* Startomg boot state*/
game.state.start("boot");

