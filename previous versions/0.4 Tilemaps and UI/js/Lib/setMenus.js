/* Creating and styling different menus*/
/* For now, just the main menu         */
var mainMenu; //Group

/* Buttons*/
var button1;
var button2;
var button3;


function setMainMenu(){

    //Maybe add more visuals to main menu

    /* create buttons & anchor them correctly*/
    button1 = game.add.button(game.world.centerX -200, game.world.centerY, "buttons",  start, this, 4, 5, 4, 5);
    button1.anchor.setTo(0.5, 0.5);
    button2 = game.add.button(game.world.centerX, game.world.centerY, "buttons", start, this ,3 ,0 ,3,0);
    button2.anchor.setTo(0.5, 0.5);
    button3 = game.add.button(game.world.centerX +200, game.world.centerY, "buttons", start, this ,5 ,4 ,5 ,4);
    button3.anchor.setTo(0.5, 0.5);
    
}

function start(){
    game.state.start("play");
}
