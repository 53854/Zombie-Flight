/* Creating and styling different menus*/
/* For now, just the main menu         */
var mainMenu; //Group
var pauseMenuItems; //Pause menu group

/* Buttons*/
var button1;
var button2;
var button3;

function setMainMenu() {

    /* Setting background image for game*/
    background = game.add.image(0,0, 'menuBg');
    background.scale.setTo(0.5, 0.5);

    /* Animated game logo*/
    var logo = game.add.sprite(game.world.centerX, game.world.centerY - 100, "logoAnim");
    logo.anchor.setTo(0.5, 0.5);
    logo.animations.add("float", [0, 1, 2, 1], 1, true);
    logo.animations.play("float");


    /* create buttons & anchor them correctly*/
    button1 = game.add.button(game.world.centerX, game.world.centerY + 50, "testBtn", startGame, this, 1, 0, 2, 3);
    button1.anchor.setTo(0.5, 0.5);
    button1.setOverSound(click);
    button2 = game.add.button(game.world.centerX, game.world.centerY + 120, "srvBtn", startHighScore, this, 1, 0, 2, 3);
    button2.anchor.setTo(0.5, 0.5);
    button2.setOverSound(click);
    button3 = game.add.button(game.world.centerX, game.world.centerY + 190, "cntBtn", continueGame, this, 1, 0, 2, 3);
    button3.anchor.setTo(0.5, 0.5);
    button3.setOverSound(click);

}

function setPauseMenu() {
    

    pauseMenuItems = game.add.group();


    /* Animated game logo*/
    var pauseLogo = game.add.sprite(game.world.centerX, game.world.centerY - 100, "logoAnim");
    pauseLogo.anchor.setTo(0.5, 0.5);
    pauseLogo.animations.add("float", [0, 1, 2, 1], 1, true);
    pauseLogo.animations.play("float");

    pauseMenuItems.add(pauseLogo);

    /* create buttons & anchor them correctly*/
    /* create buttons & anchor them correctly*/
    pauseBtn1 = game.add.button(game.world.centerX, game.world.centerY + 50, "cntBtn", pauseGame, this, 1, 0, 2, 3);
    pauseBtn1.setOverSound(click);
    pauseBtn1.anchor.setTo(0.5, 0.5);
    pauseMenuItems.add(pauseBtn1);
    pauseBtn2 = game.add.button(game.world.centerX, game.world.centerY + 120, "btmBtn", backToMenu, this, 1, 0, 2, 3);
    pauseBtn2.anchor.setTo(0.5, 0.5);
    pauseMenuItems.add(pauseBtn2);
    pauseBtn2.setOverSound(click);
    pauseBtn3 = game.add.button(game.world.centerX, game.world.centerY + 190, "cntBtn", pauseGame, this, 1, 0, 2, 3);
    pauseBtn3.anchor.setTo(0.5, 0.5);
    pauseMenuItems.add(pauseBtn3);
    pauseBtn3.setOverSound(click);

}

function startGame() {

    /* Turning up volume for -action- */
    menuMusic.volume = 0.1;

    /* And starting the game*/
    game.state.start("testLevel1");
}

function startHighScore() {
    /* Turning up volume for -action- */
    menuMusic.volume = 0.1;

    /* And starting the game*/
    game.state.start("highScoreMode");
}

function continueGame() {
    /* Turning up volume for -action- */
    menuMusic.volume = 0.1;

    /* And starting the game*/
    game.state.start("testLevel3");
}

/* Pause function*/
function pauseGame() {

    if (!game.paused) {
        game.paused = true;
        setPauseMenu();
    } else {
        pauseMenuItems.destroy();
        game.paused = false;
    }

}

function backToMenu() {
    if(game.paused){game.paused = false;}
    p1Score = 0;
    game.state.start("menu");
}