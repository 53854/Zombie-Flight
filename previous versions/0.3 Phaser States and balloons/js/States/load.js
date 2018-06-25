/* Input variables*/
var cursors;

/* Setting up scores in load due to local storage use (keep loading times where they belong*/
var localBest = 0;
var globalBest = 0;

/* initializing loading state*/
var loadState = {

    /* Preloading assets & implying load screen*/
    preload: function() {

        /* Loading screen*/
        var loadingLabel = game.add.text(80, 150, "loading...", {font: "30px Courier", fill: "#ffffff"});
        var loadingBar = game.add.sprite(game.world.centerX, game.world.centerY , "loading");
        loadingBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(loadingBar, 1);

        /* enableing arrow keys*/
        cursors = game.input.keyboard.createCursorKeys();

        /* Preloading assets*/
        game.load.image(      "sky",           "assets/sky.png");
        game.load.image(      "ground",        "assets/platform.png");
        game.load.image(      "star",          "assets/star.png");
        game.load.spritesheet("buttons",       "assets/number-buttons.png", 160, 160);
        game.load.spritesheet("player",        "assets/baddie.png", 32, 32);
        game.load.spritesheet("zombie",        "assets/zobbie.png", 32, 32);

        /* Preloading scripts*/
        game.load.script(     "setUpMenu",     "js/Lib/setMenus.js");
        game.load.script(     "playerConfig",  "js/Lib/playerConfig.js");
        game.load.script(     "playerControl", "js/Lib/playerControlls.js");
        game.load.script(     "setLevel",     "js/Lib/setLevel.js");
        game.load.script(     "balloon",       "js/Lib/balloon.js");
        game.load.script(     "zombieConfig",  "js/Lib/zombie.js");
        game.load.script(     "generalFunc",   "js/Lib/generalFunctions.js");
        game.load.script(     "setUI",         "js/Lib/setUi.js");
    },


    create: function(){

        /* Setting the local highscore*/
        setLocalHighscore();

        /* Starting menu state*/
        game.state.start("play");
    }


}