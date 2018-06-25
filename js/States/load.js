/* Input variables*/
var cursors;
var spaceKey, escKey, cKey, xKey, vKey, bKey;

/* Audio container for reused sounds*/
var menuMusic, flap, hit, zombieHit, gameOver;

/* Setting up scores in load due to local storage use (keep loading times where they belong*/
var localBest = 0;
//var globalBest = 0;

/* initializing loading state*/
var loadState = {

    /* Preloading assets & implying load screen*/
    preload: function () {

        /* Loading screen*/
        var loadingLabel = game.add.text(80, 150, "loading...", {
            font: "30px Agency FB",
            fill: "#ffffff"
        });
        var loadingBar = game.add.sprite(game.world.centerX, game.world.centerY, "zombieload");
        loadingBar.anchor.setTo(0.5);
        loadingBar.scale.setTo(0.25, 0.25);
        this.load.setPreloadSprite(loadingBar, 1);

        /* enableing input keys*/
        cursors = game.input.keyboard.createCursorKeys();

        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
        xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
        vKey = game.input.keyboard.addKey(Phaser.Keyboard.V);
        bKey = game.input.keyboard.addKey(Phaser.Keyboard.B);

        /* Preloading audio*/
        game.load.audio("modernMusic", "assets/audio/electroBackground.ogg", true);
        game.load.audio("classicMusic", "assets/audio/8bitBackground.ogg", true);
        game.load.audio("gameOver", "assets/audio/gameOver.ogg", true);
        game.load.audio("click", "assets/audio/click1.ogg", true);
        game.load.audio("hit", "assets/audio/hit.ogg", true);
        game.load.audio("flap", "assets/audio/wingFlap.ogg", true);
        game.load.audio("zombieHit", "assets/audio/zombieded.ogg", true);

        /* Preloading mapdata*/
        game.load.tilemap("testLevel", "assets/maps/testMap.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap("testLevel2", "assets/maps/testMap2.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap("testLevel3", "assets/maps/testMap3.json", null, Phaser.Tilemap.TILED_JSON);

        /* Preloading assets*/
        game.load.image("sky", "assets/enviorment/sky.png");
        game.load.image("menuBg", "assets/enviorment/menu_Bgx2.png");
        game.load.image("bg2", "assets/enviorment/set2_bg.png");
        game.load.image("bg3", "assets/enviorment/set3_bg.png");
        game.load.image("balloon", "assets/game-objects/balloon.png");
        game.load.image("tileSheet", "assets/enviorment/smallSheet.png");
        game.load.spritesheet("logoAnim", "assets/interface/logo_anim.png", 400, 200);
        game.load.spritesheet("testBtn", "assets/interface/testBtn1_400x50x4.png", 400, 50);
        game.load.spritesheet("btmBtn", "assets/interface/btmBtn1_400x50x4.png", 400, 50);
        game.load.spritesheet("cntBtn", "assets/interface/cntBtn1_400x50x4.png", 400, 50);
        game.load.spritesheet("srvBtn", "assets/interface/srvBtn1_400x50x4.png", 400, 50);
        game.load.spritesheet("player", "assets/game-objects/player.png", 32, 32);
        game.load.spritesheet("zombie", "assets/game-objects/zobbie_new.png", 32, 32);

        /* Preloading scripts*/
        game.load.script("setUpMenu", "js/Lib/setMenus.js");
        game.load.script("playerConfig", "js/Lib/playerConfig.js");
        game.load.script("playerControl", "js/Lib/playerControlls.js");
        game.load.script("setTileLevel", "js/Lib/setTileLevel.js");
        game.load.script("balloon", "js/Lib/balloon.js");
        game.load.script("zombieConfig", "js/Lib/zombie.js");
        game.load.script("generalFunc", "js/Lib/generalFunctions.js");
        game.load.script("setUI", "js/Lib/setUi.js");
    },


    create: function () {

        /* Setting the local highscore*/
        setLocalHighscore();

        /* Adding the soundtrack so it can play when needed*/
        menuMusic = game.add.audio("classicMusic", 0.6, true);
        click = game.add.audio("click", 0.8, false);
        flap = game.add.audio("flap", 0.8, false);
        hit = game.add.audio("hit", 0.8, false);
        zombieHit = game.add.audio("zombieHit", 0.8, false);
        gameOver = game.add.audio("gameOver", 0.8, false);

        /* Starting menu state*/
        game.state.start("menu");
    }


}