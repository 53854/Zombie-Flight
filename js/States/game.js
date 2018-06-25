
/* Creating phaser game window*/
var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game');

/* Adding different game states*/
game.state.add("boot", bootState);
game.state.add("load", loadState);
game.state.add("menu", menuState);
game.state.add("testLevel1", level1State);
game.state.add("testLevel2", level2State);
game.state.add("testLevel3", level3State);
game.state.add("highScoreMode", infinitState);
game.state.add("win", winState);
game.state.add("highScoreEnd", highScoreEndState)
game.state.add("gameOver", gameOverState);

/* Startomg boot state*/
game.state.start("boot");

/*  
    The browser console will throw notifications about sound sources already existing,
    however, in level 1 you can see with  "game.debug.sound()" in render, that there
    is at any time allways only the intended amout of sounds in the loader
*/

