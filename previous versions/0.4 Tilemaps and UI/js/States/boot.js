
/* Initializing boot state*/
var bootState = {

    /* Preload asset to use as loading screen*/
    preload: function(){
        game.load.image("loading", "assets/interface/bongSquirr.png");
    },

    create: function() {

        /* Booting up physics engine*/
        game.physics.startSystem(Phaser.Physics.ARCADE);

        /* Starting load state*/   
        game.state.start("load");
    }
}